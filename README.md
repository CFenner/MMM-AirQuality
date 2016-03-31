# MagicMirror-AirQuality-Module

[MagicMirror Project on Github](https://github.com/MichMich/MagicMirror) | [Air Quality Index](http://aqicn.org/here/)

### Configuration

To run the module properly, you need to add the following data to your config.js file.

```
{
	module: 'airquality',
	position: 'top_center', // you may choose any location
	config: {
	  location: 'Beijing' // the location to check the index for
	}
}
```

### Known Issues

Due to the AQI rendering script it is not possible to have multiple instances of this module running.

There is a bug in the skript that prevent some locations from being displayed (e.g. 'Mannheim'). 
