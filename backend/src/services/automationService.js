// model
const AutomationModel = require('../models/AutomationModel');

//services
const ApiService = require('./apiService');
const ResultService = require('./resultService');

//config/helpers
const ApiRequest = require('../config/apiRequest');
const Scheduler = require('../config/scheduler');

// const util = require('util');

// settings
const settings = require('../../settings');

class AutomationService {
  constructor() {
    this.model = AutomationModel;
  }

  //initialization
  apiService = new ApiService();
  resultService = new ResultService();
  apiRequest = new ApiRequest();
  scheduler = new Scheduler();

  async add(data) {
    try {
      //manipulate data and add endpoint

      // let appApiEndpoints = [];
      let appResults = [];
      for (let app of data) {
        //get baseendpoint
        // const { name: apiName, baseEndpoint } = await this.apiService.getApis(app.appSelected)[0];
        const selectedApi = await this.apiService.getAppById(app.appSelected);
        let { name: apiName, baseEndpoint } = selectedApi;

        const selectedMethod = await this.apiService.getApiMethod(app.appSelected, app.methodSelected);
        // const methodEndpoint = selectedMethod.endpoint;
        const methodRequiredParameters = selectedMethod.required;

        //if there is a required fields
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
          const appApi = `${baseEndpoint}${arrParameters.join('&')}`;
          // appApiEndpoints.push(appApi);
          appResults.push({ app: selectedApi._id, endpoint: appApi });
          app['automation'] = appApi;
          console.log(`${apiName} => ${appApi}`);
          //
        } else if (apiName === 'Geolocator') {
          if (methodRequiredParameters) {
            if (Array.isArray(app.parameters)) arrParameters.push(app.parameters[index]);
            else arrParameters.push(app.parameters);
          }
          const appApi = `${baseEndpoint}${arrParameters.join('/')}`;
          // appApiEndpoints.push(appApi);
          appResults.push({ app: selectedApi._id, endpoint: appApi });
          app['automation'] = appApi;
          console.log(`${apiName} => ${appApi}`);
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

      const automationData = await this.model.create({ data });

      //for automation purpose

      //run task immediately
      const weatherResult = await this.apiRequest.fetchData(appResults[1].endpoint);
      await this.resultService.add({ app: appResults[1].app, data: weatherResult });
      console.log('[immediately] => Result successfully saved in DB...');
      //scheduled task
      const task = this.scheduler.scheduleTask(async () => {
        const weatherResult = await this.apiRequest.fetchData(appResults[1].endpoint);
        await this.resultService.add({ app: appResults[1].app, data: weatherResult });
        console.log('[scheduled] => Result successfully saved in DB...');
        // console.log('Weather result ', weatherResult);
      });

      if (!settings.TASKS.find((t) => t.id === 1)) {
        settings.TASKS.push({ id: 1, task: task });
      }

      // settings.TASKS.push({ id: automationData._id, task: task });
      //for automation purpose

      return automationData;
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }
}

module.exports = AutomationService;
