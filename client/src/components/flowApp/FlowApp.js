import React, { useState } from 'react';

import { Popover, Select, Space, Form, Button } from 'antd';

import './flowApp.scss';
import blankAppImage from '../../assets/blank-app.png';
import locationAppImage from '../../assets/location-app.png';
import weatherAppImage from '../../assets/weather-app.png';

import JsPlumb from '../../helper/jsplumb';

const availableAppsData = [
  { key: 'geolocation', value: 'Geolocation' },
  { key: 'open_weather', value: 'Open Weather' },
];
const availableMethodsData = {
  geolocation: { data: ['Get Location Details'], imageSrc: locationAppImage },
  open_weather: {
    data: ['Get By City', 'Get By City ID', 'Get By Coordinates'],
    imageSrc: weatherAppImage,
  },
};

const jsPlumb = new JsPlumb('diagram');

const FlowApp = () => {
  //
  const [methodsAvailable, setMethodsAvailable] = useState([]);

  const [firstAppForm] = Form.useForm();
  const [secondAppForm] = Form.useForm();

  const handleSelectAppChange = (value, formReference) => {
    const getAppMethods = availableMethodsData[value];
    setMethodsAvailable(getAppMethods.data);
    if (formReference === firstAppForm) {
      document.getElementById('firstAppImage').setAttribute('src', getAppMethods.imageSrc);
      //adding endpoint for jsplumb
      addJsPlumbEndPoint('endpoint1', 'Right', true);
    } else if (formReference === secondAppForm) {
      document.getElementById('secondAppImage').setAttribute('src', getAppMethods.imageSrc);
      //adding endpoint for jsplumb
      addJsPlumbEndPoint('endpoint2', 'Left');
      jsPlumb.get('jsPlumbInstance').connect({
        source: 'endpoint1',
        target: 'endpoint2',
        anchors: ['Right', 'Left'],
        endpoint: ['Dot', { radius: 20 }],
        endpointStyle: { fill: 'gray' },
        paintStyle: { stroke: 'gray', strokeWidth: 10, dashstyle: '5 2' },
        hoverPaintStyle: { stroke: '#f44336', strokeWidth: 10 },
      });
    }

    // const imgElement =
    //   formReference === firstAppForm
    //     ? document.getElementById('firstAppImage')
    //     : document.getElementById('secondAppImage');
    // imgElement.setAttribute('src', getAppMethods.imageSrc);
  };

  const endPointContentOptions = (formReference) => {
    return (
      <div className="endpoint_container" style={{ minWidth: '250px', width: '250px' }}>
        <Form form={formReference} layout="vertical">
          <Space direction="vertical" style={{ width: 'calc(100%)' }}>
            <Form.Item label="Select App" name="appSelected">
              <Select onChange={(value) => handleSelectAppChange(value, formReference)}>
                {availableAppsData.map(({ key, value }) => (
                  <Select.Option key={key}>{value}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Select Method" name="methodSelected">
              <Select>
                {methodsAvailable.map((value) => (
                  <Select.Option key={value}>{value}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>
        </Form>
      </div>
    );
  };

  const getDetails = () => {
    const firstAppValues = firstAppForm.getFieldsValue();
    const secondAppValues = secondAppForm.getFieldsValue();
    console.log('firstAppValues', firstAppValues);
    console.log('secondAppValues', secondAppValues);
  };

  const handleLoadCurrentAppMethods = (formReference) => {
    const currentAppSelected =
      formReference === firstAppForm
        ? firstAppForm.getFieldValue('appSelected')
        : secondAppForm.getFieldValue('appSelected');

    if (currentAppSelected !== undefined) {
      const getAppMethods = availableMethodsData[currentAppSelected];
      setMethodsAvailable(getAppMethods.data);
    }
  };

  const addJsPlumbEndPoint = (elementId, anchor, isSource = false, parameters = {}) => {
    jsPlumb.addEndPoint(elementId, {
      endpoint: 'Dot',
      //   anchor: 'BottomCenter',
      //   isTarget: true,
      //   isSource: true,
      anchor: anchor,
      detachable: false,
      isSource: isSource,
      isTarget: !isSource,
      parameters: parameters,
      connectionType: 'connector-style',
    });
    //set draggable
    jsPlumb.setElementDraggable(elementId);
  };

  return (
    <div className="flow_app">
      <Button type="primary" onClick={getDetails}>
        Get App Details
      </Button>
      <div id="diagram">
        <div id="endpoint1" className="control">
          <Popover
            placement="right"
            trigger="click"
            content={() => endPointContentOptions(firstAppForm)}
            onClick={() => handleLoadCurrentAppMethods(firstAppForm)}
          >
            <div className="img_holder">
              <img id="firstAppImage" src={blankAppImage} alt="Endpoint 1" />
            </div>
          </Popover>
        </div>
        <div id="endpoint2" className="control">
          <Popover
            placement="right"
            trigger="click"
            content={() => endPointContentOptions(secondAppForm)}
            onClick={() => handleLoadCurrentAppMethods(secondAppForm)}
          >
            <div className="img_holder">
              <img id="secondAppImage" src={blankAppImage} alt="Endpoint 2" />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default FlowApp;
