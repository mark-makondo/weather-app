// model
const AutomationModel = require('../models/AutomationModel');
const ApiService = require('./apiService');

// const util = require('util');

// settings
const settings = require('../../settings');

class AutomationService {
  constructor() {
    this.model = AutomationModel;
  }

  apiService = new ApiService();

  async add(data) {
    try {
      //manipulate data and add endpoint

      for (let app of data) {
        //get baseendpoint
        // const { name: apiName, baseEndpoint } = await this.apiService.getApis(app.appSelected)[0];
        const selectedApi = await this.apiService.getAppById(app.appSelected);
        const { name: apiName, baseEndpoint } = selectedApi;
        // const apiName = selectedApi[0].name;
        // const baseEndpoint = selectedApi[0].baseUrl;
        console.log(selectedApi, apiName, baseEndpoint);

        const selectedMethod = await this.apiService.getApiMethod(app.appSelected, app.methodSelected);
        const methodEndpoint = selectedMethod.endpoint;
        const methodRequiredParameters = selectedMethod.required;

        //if there is a required fields
        let queryParameters = '';
        let arrParameters = [];

        if (apiName === 'Open Weather') {
          if (methodRequiredParameters) {
            for (let rawParams of methodRequiredParameters) {
              let params = rawParams[0].split(',');
              for (let [index, qParam] of params.entries()) {
                if (qParam === 'appid') {
                  arrParameters.push(`${qParam}=${settings.OPEN_WEATHER_API}`);
                } else {
                  //if parameters from frontend is array
                  if (Array.isArray(app.parameters)) {
                    arrParameters.push(`${qParam}=${app.parameters[index]}`);
                  }
                }
              }
            }
          }
          console.log(`${apiName} => ${baseEndpoint}${arrParameters.join('&')}`);
        } else if (apiName === 'Geolocator') {
          if (methodRequiredParameters) {
            if (Array.isArray(app.parameters)) arrParameters.push(app.parameters[index]);
            else arrParameters.push(app.parameters);
          }
          console.log(`${apiName} => ${baseEndpoint}${arrParameters.join('/')}`);
        }

        // let test = '';
        // if (Array.isArray(app.parameters)) {
        // } else {
        //   test = util.format(methodEndpoint, app.parameters);
        // }
        // console.log('test', test);

        // console.log(selectedMethod);
        // console.log('app', app);
        // for (let value in app) {
        //   console.log('value', value);
        // }
      }

      return true;
      // return await this.model.create({ data });
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }
}

module.exports = AutomationService;
