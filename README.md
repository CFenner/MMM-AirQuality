# MMM-AirQuality

A module for the [MagicMirror](https://github.com/MichMich/MagicMirror) to display a location's [*air quality index*](https://en.wikipedia.org/wiki/Air_quality_index) using data from [aqicn.org](http://aqicn.org/here/).

## Preview

![preview](.github/preview.png)

## Usage 

You need to install and configure the module for your MagicMirror.

### Setup

Clone the module into your modules folder:

```shell
cd ~/MagicMirror/modules && git clone https://github.com/CFenner/MMM-AirQuality
```

### Configuration

Add the module configuration to your `config.js` file.

```js
{
	module: 'MMM-AirQuality',
	position: 'top_center', // you may choose any location
	config: {
	  location: 'beijing' // the location to check the index for
	}
},
```

### Location

Determine the station you want to display. Select a station on the [map](https://aqicn.org/here/) and copy the location part from the URL. For example http://aqicn.org/city/netherland/utrecht/griftpark/ would be `netherland/utrecht/griftpark/`.

You may want to set the following options in the config section as well:

| Option |  Description | 
|---|---|
| `location` | The location for that you you want to show the air quality.<br><br>This is **REQUIRED**.| 
| `lang` | change the language<br><br>This is **OPTIONAL**.<br>**Default value:** `en` | 
| `updateInterval` |  change the update period in minutes<br><br>This is **OPTIONAL**.<br>**Default value:** `30` (minutes) | 
| `showLocation` | toggle location printing<br><br>This is **OPTIONAL**.<br>**Default value:**`true` |
| `showIndex` | toggle index printing<br><br>This is **OPTIONAL**.<br>**Default value:**`true` | 

### Known Issues

- Due to the AQI rendering script it is not possible to have multiple instances of this module running.
- There is a bug in the skript that prevent some locations from being displayed (e.g. 'Mannheim'). 
- Not all languages may be supported (see: http://aqicn.org/faq/2015-07-28/air-quality-widget-new-improved-feed/).
