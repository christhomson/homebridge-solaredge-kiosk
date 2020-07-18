# homebridge-solaredge-kiosk
A [SolarEdge](https://www.solaredge.com) Inverter plugin for [Homebridge](https://github.com/homebridge/homebridge).

This creates a Light Sensor in [HomeKit](https://www.apple.com/ios/home/), where the Lux reading is actually the
current power generation in Watts.

This is a fork of ecoen66's [homebridge-solaredge-inverter](https://github.com/ecoen66/homebridge-solaredge-inverter)
plugin. This fork uses the endpoint that powers the SolarEdge kiosk page. That plugin is heavily based on the work of
Stog's [homebridge-fronius-inverter](https://github.com/Stog/homebridge-fronius-inverter) accessory, and so is this.

# Installation
Run these commands:

    % sudo npm install -g homebridge
    % sudo npm install -g homebridge-solaredge-kiosk


NB: If you install homebridge like this:

    sudo npm install -g --unsafe-perm homebridge

Then all subsequent installations must be like this:

    sudo npm install -g --unsafe-perm homebridge-solaredge-kiosk

# Configuration

Example accessory config (needs to be added to the homebridge config.json):
 ...

 "accessories": [
   {
     "name": "SolarEdge Inverter",
     "manufacturer": "SolarEdge",
     "model": "SE10000H-US000BNU4",
     "serial": "myserialno",
     "guid": "longkey",
     "accessory": "SolarEdge Inverter Kiosk"
   }
 ]
 ...

### Config Explanation:

Field | Description
------|------------
**accessory** | (required) Must always be "SolarEdge Inverter Kiosk".
**name** | (required) The name you want to use for for the power level widget.
**guid** | (required) The GUID in the URL for your SolarEdge kiosk page.
**manufacturer** | (optional) This shows up in the HomeKit accessory Characteristics.
**model** | (optional) This shows up in the HomeKit accessory Characteristics.
**serial** | (optional) This shows up in the HomeKit accessory Characteristics.
