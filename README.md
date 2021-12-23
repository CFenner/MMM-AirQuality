# MMM-AirQuality

A module for the [MagicMirror](https://github.com/MichMich/MagicMirror) to display a location's [*air quality index*](https://en.wikipedia.org/wiki/Air_quality_index) using data from [aqicn.org](http://aqicn.org/here/).

## Preview

![preview](.github/preview.png)

## Usage 

You need to install the module for your MagicMirror.

### Installation

Navigate into your MagicMirror's modules folder:

```shell
cd ~/MagicMirror/modules
```
Clone this repository:
```shell
git clone https://github.com/CFenner/MMM-AirQuality
```
Configure the module in your config.js file.

### Configuration

To run the module, you need to add the following data to your config.js file.

```
{
	module: 'MMM-AirQuality',
	position: 'top_center', // you may choose any location
	config: {
	  location: 'beijing' // the location to check the index for
	}
}
```

### Location
Use the part behind http://aqicn.org/city/ for your location.
For example http://aqicn.org/city/netherland/utrecht/griftpark/ would be:
```
location: 'netherland/utrecht/griftpark/'
```

You may want to set the following options in the config section as well:

| Option |  Description | 
|---|---|
| `location` | The location for that you you want to show the air quality.<br><br>This is **REQUIRED**.| 
| `lang` | change the language<br><br>This is **OPTIONAL**.<br>**Default value:** `en` | 
| `updateInterval` |  change the update period in minutes<br><br>This is **OPTIONAL**.<br>**Default value:** `30` (minutes) | 
| `showLocation` | toggle location printing<br><br>This is **OPTIONAL**.<br>**Default value:**`true` |
| `showIndex` | toggle index printing<br><br>This is **OPTIONAL**.<br>**Default value:**`true` | 

### Known Issues

Due to the AQI rendering script it is not possible to have multiple instances of this module running.

There is a bug in the skript that prevent some locations from being displayed (e.g. 'Mannheim'). 

Not all languages may be supported (see: http://aqicn.org/faq/2015-07-28/air-quality-widget-new-improved-feed/).
