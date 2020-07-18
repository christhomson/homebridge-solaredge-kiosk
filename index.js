const axios = require('axios');
const setupCache = require('axios-cache-adapter').setupCache;

var Service, Characteristic;

const PLUGIN_NAME   = 'homebridge-solaredge-kiosk';
const ACCESSORY_NAME = 'SolarEdge Inverter Kiosk';

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory(PLUGIN_NAME, ACCESSORY_NAME, SolarEdgeInverter);
}

/**
 * Setup Cache For Axios to prevent additional requests
*/
const cache = setupCache({
  maxAge: 60 * 1000 // in ms
})

const api = axios.create({
  adapter: cache.adapter
})

/**
 * Main API request with site overview data
 *
 * @param {guid} the SolarEdge guid for access to the Site
 */
const getInverterData = async(guid) => {
  try {
    return await api.post(`https://monitoringpublic.solaredge.com/solaredge-web/p/kiosk/kioskData?locale=en_US&guid=${guid}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Gets and returns the accessory's value in the correct format.
 *
 * @param {guid} the SolarEdge guid for access to the Site
 * @param (log) access to the homebridge logfile
 * @return {bool} the value for the accessory
 */
const getAccessoryValue = async (guid, log) => {
  // To Do: Need to handle if no connection
  const inverterData = await getInverterData(guid);

  if (inverterData) {
    log.info('Data from API', inverterData.data);
    const systemPower = inverterData.data.match(/systemPower:"(\d+)/)[1];
    const currentPower = inverterData.data.match(/currentPower:"(\d+\.?\d*)/)[1];

    log.info(`system power = ${systemPower}, current power = ${currentPower}`);
    return parseFloat(currentPower);
  } else {
    // No response inverterData return 0
    log.info('No valid API response.');
    return 0;
  }
}

class SolarEdgeInverter {
  constructor(log, config) {
    this.log = log;
    this.config = config;

    this.service = new Service.LightSensor(this.config.name);

    this.name = config["name"];
    this.manufacturer = config["manufacturer"] || "SolarEdge";
    this.model = config["model"] || "Inverter";
    this.serial = config["serial"] || "solaredge-inverter-1";
    this.guid = config["guid"];
  }

  getServices () {
    const informationService = new Service.AccessoryInformation()
      .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
      .setCharacteristic(Characteristic.Model, this.model)
      .setCharacteristic(Characteristic.SerialNumber, this.serial);

    this.service.getCharacteristic(Characteristic.CurrentAmbientLightLevel)
      .on('get', this.getOnCharacteristicHandler.bind(this));

    return [informationService, this.service];
  }

  async getOnCharacteristicHandler (callback) {
    this.log(`calling getOnCharacteristicHandler`, await getAccessoryValue(this.guid, this.log));

    callback(null, await getAccessoryValue(this.guid, this.log));
  }
}
