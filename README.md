# MagicMirror-AirQuality-Module

[MagicMirror Project on Github](https://github.com/MichMich/MagicMirror) | [Air Quality Index](http://aqicn.org/here/)

<img width="325" alt="bildschirmfoto 2016-03-31 um 23 08 38" src="https://cloud.githubusercontent.com/assets/9592452/14190991/b8a5de12-f795-11e5-8d5d-593bbf4e4e3c.png">

## Usage 

To use this module, create a new folder `airQuality` in the *modules* subfolder of your mirror and copy the content of this repository this this folder. 

### Configuration

To run the module, you need to add the following data to your config.js file.

```
{
	module: 'airquality',
	position: 'top_center', // you may choose any location
	config: {
	  location: 'Beijing' // the location to check the index for
	}
}
```

You may want to set the following options in the config section as well:

- use `lang` to change the language (default: en)
- use `updateInterval` to change the refresh interval (default: 30 * 60 * 1000 | 30 minutes)

### Known Issues

Due to the AQI rendering script it is not possible to have multiple instances of this module running.

There is a bug in the skript that prevent some locations from being displayed (e.g. 'Mannheim'). 
