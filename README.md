# homebridge-solaredge-inverter
A [SolarEdge](https://www.solaredge.com) Inverter plugin for
[Homebridge](https://github.com/nfarina/homebridge).  This creates a Light Sensor in homekit,
 where the LUX reading is actually the current power generation in Watts.

This code is heavily based on the work of Stog's [homebridge-fronius-inverter](https://github.com/Stog/homebridge-fronius-inverter) accessory.

# Installation
Run these commands:

    % sudo npm install -g homebridge
    % sudo npm install -g homebridge-solaredge-inverter


NB: If you install homebridge like this:

    sudo npm install -g --unsafe-perm homebridge

Then all subsequent installations must be like this:

    sudo npm install -g --unsafe-perm homebridge-solaredge-inverter

# Configuration

Example accessory config (needs to be added to the homebridge config.json):
 ...

		"accessories": [
        	{
				"name": "SolarEdge Inverter",
				"manufacturer": "SolarEdge",
				"model": "SE10000H-US000BNU4",
				"serial": "myserialno",
				"api_key": "longapikey",
				"accessory": "SolarEdge Inverter"
        	}
      	]
 ...

### Config Explanation:

Field           			| Description
----------------------------|------------
**accessory**   			| (required) Must always be "SolarEdge Inverter".
**name**					| (required) The name you want to use for for the power level widget.
**api_key_**		  		| (required) The API Key for the administration of your SolarEdge site.
**manufacturer**			| (optional) This shows up in the homekit accessory Characteristics.
**model**					| (optional) This shows up in the homekit accessory Characteristics.
**serial**					| (optional) This shows up in the homekit accessory Characteristics.
