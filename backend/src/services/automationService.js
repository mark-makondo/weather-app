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

  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log(error);
    }
  }

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
                if (qParam.trim() === 'appid') {
                  arrParameters.push(`${qParam.trim()}=${settings.OPEN_WEATHER_API}`);
                } else {
                  //if parameters from frontend is array
                  if (Array.isArray(app.parameters)) {
                    arrParameters.push(`${qParam.trim()}=${String(app.parameters[index]).trim()}`);
                  }
                }
              }
            }
          }
          const appApi = `${baseEndpoint}${arrParameters.join('&')}`;
          // appApiEndpoints.push(appApi);
          appResults.push({ app: selectedApi._id, methodUsed: app.methodSelected, endpoint: appApi });
          app['automation'] = appApi;
          console.log(`${apiName} => ${appApi}`);
          //
        } else if (apiName === 'Geolocator') {
          if (methodRequiredParameters) {
            if (Array.isArray(app.parameters)) arrParameters.push(app.parameters[index].trim());
            else arrParameters.push(app.parameters.trim());
          }
          const appApi = `${baseEndpoint}${arrParameters.join('/')}`;
          // appApiEndpoints.push(appApi);
          appResults.push({ app: selectedApi._id, methodUsed: app.methodSelected, endpoint: appApi });
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
      //scheduled task
      const task = this.scheduler.scheduleTask(async () => {
        const weatherResult = await this.apiRequest.fetchData(appResults[1].endpoint);
        const automationTask = await this.resultService.add({
          app: appResults[1].app,
          methodUsed: appResults[1].methodUsed,
          data: weatherResult,
        });
        console.log(`Scheduled Task : [${selectedAutomation._id}] => Result successfully saved in DB...`);
        // console.log('Weather result ', weatherResult);
      });

      if (settings.TASKS.filter((t) => t.id === automationData._id).length === 0) {
        settings.TASKS.push({ id: automationData._id, task: task });
        // console.log(`task added [${automationData._id}]`, settings.TASKS);
      }
      //for automation purpose

      return automationData;
    } catch (error) {
      console.error('error', error);
      return null;
    }
  }

  async getById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async startAutomationTask(automationId) {
    try {
      const selectedAutomation = await this.getById(automationId);
      if (selectedAutomation) {
        //
        const task = this.scheduler.scheduleTask(async () => {
          const weatherResult = await this.apiRequest.fetchData(selectedAutomation.data[1].automation);
          const data = {
            app: selectedAutomation.data[1].appSelected,
            methodUsed: selectedAutomation.data[1].methodSelected,
            data: weatherResult,
          };

          // console.log('startAutomationTask', data);
          const automationTask = await this.resultService.add(data);
          console.log(`Scheduled Task : [${selectedAutomation._id}] => Result successfully saved in DB...`);
        });

        if (settings.TASKS.filter((t) => t.id === selectedAutomation._id).length === 0) {
          settings.TASKS.push({ id: selectedAutomation._id, task: task });
          console.log(`Task [${selectedAutomation._id}] added on schedule.`);
        }
      }
      return selectedAutomation;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AutomationService;
