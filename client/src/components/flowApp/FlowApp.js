import React, { useState } from 'react';
import './flowApp.scss';

// antd
import { Popover, Select, Space, Form, Button, Tooltip, Input, Divider } from 'antd';
import { StopOutlined, PlayCircleOutlined } from '@ant-design/icons';

// assets
import blankAppImage from '../../assets/blank-app.png';
import locationAppImage from '../../assets/location-app.png';
import weatherAppImage from '../../assets/weather-app.png';
import startImage from '../../assets/start.png';

// helper
import JsPlumb from '../../helper/jsplumb';

// settings
import settings from '../../settings';

// sub components
import GeoLocatorInputs from './geoLocator/GeoLocatorContainer';
import OpenWeatherInputs from './openWeather/OpenWeatherContainer';

const appImages = {
  '60e45ea77d7c08c83a79f65e': { imageSrc: locationAppImage },
  '60e459dbf66e1733407259cb': { imageSrc: weatherAppImage },
};

const jsPlumb = new JsPlumb('diagram');

const FlowApp = (props) => {
  //props
  const {
    onOpenWeatherScrape,
    loading,
    supportedApps,
    saveAutomation,
    handleStartTask,
    handleStopTask,
    automationIds,
  } = props;

  const [sourceMethod, setSourceMethod] = useState([]);
  const [targetMethod, setTargetMethod] = useState([]);

  const [enableTargetAppSelection, setEnableTargetAppSelection] = useState(false);

  // const [selectedMethod, setSelectedMethod] = useState();
  const [selectedSourceMethod, setSelectedSourceMethod] = useState(null);
  const [selectedTargetMethod, setSelectedTargetMethod] = useState(null);
  const [triggerData, setTriggerData] = useState(null);

  const [selectedTask, setSelectedTask] = useState('');

  const [firstAppForm] = Form.useForm();
  const [secondAppForm] = Form.useForm();

  /**
   * on selecting app
   * @param {*} value
   * @param {*} formReference
   */
  const handleSelectAppChange = (value, formReference) => {
    const selectedMethod = supportedApps.filter((s) => s._id === value)[0].methods;

    formReference.setFieldsValue({ methodSelected: null });

    if (formReference === firstAppForm) {
      setSelectedSourceMethod('');
      setSourceMethod(selectedMethod);
      document.getElementById('firstAppImage').setAttribute('src', appImages[value].imageSrc);
      //adding endpoint for jsplumb
      addJsPlumbEndPoint('endpoint1', 'Right', true);
      setEnableTargetAppSelection(true);
    } else if (formReference === secondAppForm) {
      setSelectedTargetMethod('');
      setTargetMethod(selectedMethod);
      document.getElementById('secondAppImage').setAttribute('src', appImages[value].imageSrc);

      //adding endpoint for jsplumb
      addJsPlumbEndPoint('endpoint2', 'Left');

      jsPlumb.connectEndPoints('endpoint1', 'endpoint2');
      // const test = jsPlumb.connect('endpoint1', 'endpoint2', parameters);
    }
  };

  /**
   * on selecting method
   * @param {*} value
   * @param {*} formReference
   */
  const handleSelectMethod = (value, formReference) => {
    if (formReference === firstAppForm) {
      setSelectedSourceMethod(value);
      // addJsPlumbEndPoint('endpoint1', 'Right', true, triggerData && triggerData);
    } else if (formReference === secondAppForm) {
      setSelectedTargetMethod(value);
    }

    const methods = formReference === firstAppForm ? sourceMethod : targetMethod;
    const selectedMethod = methods.find((s) => s.title === value);
    // console.log(selectedMethod.endpoint);
    formReference.setFieldsValue({ methodEndpointSelected: selectedMethod?.endpoint });
    formReference.setFieldsValue({ requiredFields: selectedMethod?.required });
  };

  /**
   * creation of elements in an app details
   * @param {*} value
   * @param {*} formReference
   */
  const endPointContentOptions = (formReference) => {
    let methods = formReference === firstAppForm ? sourceMethod : targetMethod;

    return (
      <div className="endpoint_container" style={{ minWidth: '250px', width: '250px' }}>
        <Form
          form={formReference}
          initialValues={{
            endpoint: null,
          }}
          layout="vertical"
        >
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
                {methods.map((value) => (
                  <Select.Option key={value.title}>{value.title}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/*             
            <Form.Item label="Select Method" name="methodEndpointSelected" hidden={true}>
              <Input />
            </Form.Item>

            <Form.Item label="Select Method" name="requiredFields" hidden={true}>
              <Input />
            </Form.Item> 
            */}

            {/* for source app geolocation */}
            {formReference === firstAppForm && selectedSourceMethod && selectedSourceMethod === 'By IP Address' && (
              <GeoLocatorInputs setTriggerData={setTriggerData} formReference={formReference} />
            )}
            {/* for source not geolocation */}
            {formReference === firstAppForm && selectedSourceMethod && selectedSourceMethod !== 'By IP Address' && (
              <OpenWeatherInputs
                selectedMethod={formReference.getFieldValue('methodSelected')}
                methodsAvailable={methods}
              />
            )}
            {/* for target app geolocation */}
            {formReference === secondAppForm && selectedTargetMethod && selectedTargetMethod === 'By IP Address' && (
              <GeoLocatorInputs setTriggerData={setTriggerData} formReference={formReference} />
            )}
            {/* for target app not geolocation */}
            {formReference === secondAppForm && selectedTargetMethod && selectedTargetMethod !== 'By IP Address' && (
              <OpenWeatherInputs
                selectedMethod={formReference.getFieldValue('methodSelected')}
                methodsAvailable={methods}
                isSecondAppForm={true}
                triggerData={triggerData}
              />
            )}
          </Space>
        </Form>
      </div>
    );
  };

  /**
   * on click of the app, popover will show - handle current method
   * @param {*} value
   * @param {*} formReference
   */
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

  const handleTaskChange = (value) => {
    console.log(value);
    setSelectedTask(value);
  };

  /**
   * add endoint to jsplumb
   * @param {*} value
   * @param {*} formReference
   */
  const addJsPlumbEndPoint = (elementId, anchor, isSource = false, parameters = {}) => {
    jsPlumb.addEndPoint(elementId, {
      anchor: anchor,
    });
    //set draggable
    jsPlumb.setElementDraggable(elementId);
  };

  /**
   * on automation click get all data to save into database
   * @param {*} value
   * @param {*} formReference
   */
  const saveAutomationDetails = () => {
    const firstAppValues = firstAppForm.getFieldsValue();
    const secondAppValues = secondAppForm.getFieldsValue();
    const data = [firstAppValues, secondAppValues];
    console.log(data);
    saveAutomation(data);
  };

  return (
    <div className="flow_app">
      <div>
        <Space align={'center'} style={{ width: 'calc(100%)' }}>
          <Button type="dashed" onClick={handleSchedule} danger>
            Schedule Settings
          </Button>

          <Button type="primary" onClick={saveAutomationDetails}>
            Save Automation
          </Button>
          <Button onClick={onOpenWeatherScrape} loading={loading}>
            Scrape Weather API
          </Button>
          <Divider type="vertical" />
          <Select defaultValue={selectedTask} style={{ width: 280 }} onChange={handleTaskChange}>
            {/* <Select.Option value="jack">Jack</Select.Option> */}
            {automationIds.map((id) => (
              <Select.Option key={id} value={id}>{`Task [${id}]`}</Select.Option>
            ))}
          </Select>

          <Tooltip title="Start Current Task">
            <Button
              type="primary"
              shape="circle"
              icon={<PlayCircleOutlined />}
              onClick={() => handleStartTask(selectedTask)}
            />
          </Tooltip>

          <Tooltip title="Stop Current Task">
            <Button
              type="primary"
              shape="circle"
              icon={<StopOutlined />}
              onClick={() => handleStopTask(selectedTask)}
            />
          </Tooltip>
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
              <img className="startIndicatorImage" src={startImage} alt="Start" />
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
