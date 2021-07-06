import React, { useState } from 'react';

import { Popover, Select, Space, Form, Button } from 'antd';

import './flowApp.scss';

// assets
import blankAppImage from '../../assets/blank-app.png';
import locationAppImage from '../../assets/location-app.png';
import weatherAppImage from '../../assets/weather-app.png';

import JsPlumb from '../../helper/jsplumb';

// settings
import settings from '../../settings';

const appImages = {
  '60e45ea77d7c08c83a79f65e': { imageSrc: locationAppImage },
  '60e459dbf66e1733407259cb': { imageSrc: weatherAppImage },
};

const jsPlumb = new JsPlumb('diagram');

const FlowApp = ({ onOpenWeatherScrape, loading, supportedApps }) => {
  const [sourceMethod, setSourceMethod] = useState([]);
  const [targetMethod, setTargetMethod] = useState([]);
  const [params, setParams] = useState({});
  const [enableTargetAppSelection, setEnableTargetAppSelection] = useState(false);

  const [firstAppForm] = Form.useForm();
  const [secondAppForm] = Form.useForm();

  const handleSelectAppChange = (value, formReference) => {
    const selectedMethod = supportedApps.filter((s) => s._id === value)[0].methods;

    if (formReference === firstAppForm) {
      setSourceMethod(selectedMethod);
      document.getElementById('firstAppImage').setAttribute('src', appImages[value].imageSrc);
      //adding endpoint for jsplumb
      addJsPlumbEndPoint('endpoint1', 'Right', true);
      setEnableTargetAppSelection(true);
    } else if (formReference === secondAppForm) {
      setTargetMethod(selectedMethod);
      document.getElementById('secondAppImage').setAttribute('src', appImages[value].imageSrc);
      //adding endpoint for jsplumb
      addJsPlumbEndPoint('endpoint2', 'Left');

      jsPlumb.connectEndPoints('endpoint1', 'endpoint2');
    }
  };

  const handleSelectMethod = (value, formReference) => {
    const methods = formReference === firstAppForm ? sourceMethod : targetMethod;
    const selected = methods[value];
    const apiUri = selected.api[0];
    const baseUri = `http://${apiUri.split('?')[0]}?`;
    for (const p of selected.required) {
      if (p[0] !== 'appid') console.log(p[0], p[2]);
      else
        setParams((oldState) => {
          return {
            ...oldState,
            appid: settings.weather.API_KEY,
          };
        });
    }
  };

  const endPointContentOptions = (formReference) => {
    let methods = formReference === firstAppForm ? sourceMethod : targetMethod;
    return (
      <div className="endpoint_container" style={{ minWidth: '250px', width: '250px' }}>
        <Form form={formReference} layout="vertical">
          <Space direction="vertical" style={{ width: 'calc(100%)' }}>
            <Form.Item label="Select App" name="appSelected">
              <Select
                onChange={(value) => handleSelectAppChange(value, formReference)}
                disabled={formReference === secondAppForm && !enableTargetAppSelection}
              >
                {supportedApps.map(({ _id, name }) => (
                  <Select.Option key={_id}>{name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Select Method" name="methodSelected">
              <Select onChange={(value) => handleSelectMethod(value, formReference)}>
                {methods.map((value, i) => (
                  <Select.Option key={i}>{value.title}</Select.Option>
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
      // const getAppMethods = availableMethodsData[currentAppSelected];
      // setMethodsAvailable(getAppMethods.data);
      //   const selectedMethod = supportedApps.filter((s) => s._id === currentAppSelected)[0].methods;
      //   setMethodsAvailable(selectedMethod);
    }
  };

  const handleSchedule = () => {};

  const addJsPlumbEndPoint = (elementId, anchor, isSource = false, parameters = {}) => {
    jsPlumb.addEndPoint(elementId, {
      anchor: anchor,
      //   endpoint: 'Dot',
      //   //   anchor: 'BottomCenter',
      //   //   isTarget: true,
      //   //   isSource: true,
      //   isSource: isSource,
      //   isTarget: !isSource,
      //   parameters: parameters,
      //   connectionType: 'connector-style',
    });
    //set draggable
    jsPlumb.setElementDraggable(elementId);
  };

  return (
    <div className="flow_app">
      <div>
        <Space align={'center'} style={{ width: 'calc(100%)' }}>
          <Button type="dashed" onClick={handleSchedule} danger>
            Schedule Settings
          </Button>
          <Button type="primary" onClick={getDetails}>
            Save Automation
          </Button>
          <Button onClick={onOpenWeatherScrape} loading={loading}>
            Scrape Weather API
          </Button>
        </Space>
      </div>
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
