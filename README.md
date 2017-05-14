# AirQuality-Module for the MagicMirror

[MagicMirror Project on Github](https://github.com/MichMich/MagicMirror) | [Air Quality Index](http://aqicn.org/here/)

<img width="325" alt="bildschirmfoto 2016-03-31 um 23 08 38" src="https://cloud.githubusercontent.com/assets/9592452/14190991/b8a5de12-f795-11e5-8d5d-593bbf4e4e3c.png">

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
