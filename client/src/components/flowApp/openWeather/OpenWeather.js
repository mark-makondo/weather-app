import React from 'react';

//helper
import { capitalize } from 'helper/functions';

import { Form, Select, Typography } from 'antd';

// import Form from 'antd/lib/form';
// import Input from 'antd/lib/input';
// import Button from 'antd/lib/button';
// import Select from 'antd/lib/select';

const { Item } = Form;
const { Option } = Select;
const OpenWeather = ({ parameters, onReqChange, isSecondAppForm, triggerData }) => {
  // parameters && console.log(parameters.title.includes('city'), 'params');
  // parameters && console.log('parameters', parameters.endpoint);
  return (
    <>
      <Item label="Required Parameters" name="parameters">
        <Select mode="multiple" allowClear>
          {triggerData &&
            Object.entries(triggerData).map(([key, values]) => (
              <Option value={values} key={key}>{`${capitalize(key)} : ${values}`}</Option>
            ))}
        </Select>
      </Item>
      <Typography.Text className="ant-form-text" type="secondary">
        {parameters && parameters.required[0][2]}
      </Typography.Text>

      {/* {isSecondAppForm ? (
        <Item label="Required Parameters" name="parameter">
          <Select mode="multiple" allowClear>
            {triggerData &&
              Object.entries(triggerData).map(([key, values]) => (
                <Option value={values} key={key}>{`${capitalize(key)} : ${values}`}</Option>
              ))}
          </Select>
        </Item>
      ) : (
        parameters?.required
          .filter((data) => !data.includes('appid'))
          .map((req, i) => (
            <Input
              key={i}
              placeholder={`Enter ${req[0]}`}
              name={req[0] === 'lat, lon' ? 'geo' : req[0]}
              onChange={onReqChange}
            />
          ))
      )} */}
      {/* <Item label="Optional Parameters">
        {parameters?.optional.map((req, i) => (
          <Input key={i} placeholder={`Enter ${req[0]}`} />
        ))}
      </Item> */}
    </>
  );
};

export default OpenWeather;
