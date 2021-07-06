import React, { useState } from 'react';
import './flowApp.scss';

// antd
import { Popover, Select, Space, Form, Button } from 'antd';
import Input from 'antd/lib/input';

// assets
import blankAppImage from '../../assets/blank-app.png';
import locationAppImage from '../../assets/location-app.png';
import weatherAppImage from '../../assets/weather-app.png';

// helper
import JsPlumb from '../../helper/jsplumb';

// sub components
import GeoLocatorInputs from './geoLocator/GeoLocatorContainer';
import OpenWeatherInputs from './openWeather/OpenWeatherContainer';

const appImages = {
  '60e45ea77d7c08c83a79f65e': { imageSrc: locationAppImage },
  '60e459dbf66e1733407259cb': { imageSrc: weatherAppImage },
};

// const availableMethodsData = {
//   geolocation: { data: ['Get Location Details'], imageSrc: locationAppImage },
//   open_weather: {
//     data: ['Get By City', 'Get By City ID', 'Get By Coordinates'],
//     imageSrc: weatherAppImage,
//   },
// };

const jsPlumb = new JsPlumb('diagram');

const FlowApp = ({ onOpenWeatherScrape, loading, supportedApps }) => {
  const [methodsAvailable, setMethodsAvailable] = useState([]);
  const [triggerData, setTriggerData] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState();

  console.log(supportedApps);

  const [firstAppForm] = Form.useForm();
  const [secondAppForm] = Form.useForm();

  const handleSelectAppChange = (value, formReference) => {
    console.log(value);
    // const getAppMethods = availableMethodsData[value];
    // setMethodsAvailable(getAppMethods.data);
    const selectedMethod = supportedApps.filter((s) => s._id === value)[0].methods;
    setMethodsAvailable(selectedMethod);
    console.log(appImages[value], 'asdsa');
    if (formReference === firstAppForm) {
      document.getElementById('firstAppImage').setAttribute('src', appImages[value].imageSrc);
      //adding endpoint for jsplumb
      addJsPlumbEndPoint('endpoint1', 'Right', true);
    } else if (formReference === secondAppForm) {
      document.getElementById('secondAppImage').setAttribute('src', appImages[value].imageSrc);

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
    console.log(selectedMethod);

    const reference = () => {
      if (formReference === firstAppForm) {
      }
    };

    return (
      <div className="endpoint_container" style={{ minWidth: '250px', width: '250px' }}>
        <Form form={formReference} layout="vertical">
          <Space direction="vertical" style={{ width: 'calc(100%)' }}>
            <Form.Item label="Select App" name="appSelected">
              <Select onChange={(value) => handleSelectAppChange(value, formReference)}>
                {supportedApps.map(({ _id, name }) => (
                  <Select.Option key={_id}>{name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Select Method" name="methodSelected">
              <Select onChange={(value) => setSelectedMethod(value)}>
                {methodsAvailable.map((value, i) => (
                  <Select.Option key={i} value={value.title}>
                    {value.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {selectedMethod === 'By IP Address' ? (
              <GeoLocatorInputs setTriggerData={setTriggerData} />
            ) : (
              <OpenWeatherInputs selectedMethod={selectedMethod} methodsAvailable={methodsAvailable} />
            )}
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
      // const getAppMethods = availableMethodsData[currentAppSelected];
      // setMethodsAvailable(getAppMethods.data);

      const selectedMethod = supportedApps.filter((s) => s._id === currentAppSelected)[0].methods;
      setMethodsAvailable(selectedMethod);
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

      <Button onClick={onOpenWeatherScrape} loading={loading}>
        Scrape Weather API
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
