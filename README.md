[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=CFenner_MMM-AirQuality&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=CFenner_MMM-AirQuality)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=CFenner_MMM-AirQuality&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=CFenner_MMM-AirQuality)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=CFenner_MMM-AirQuality&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=CFenner_MMM-AirQuality)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=CFenner_MMM-AirQuality&metric=bugs)](https://sonarcloud.io/summary/new_code?id=CFenner_MMM-AirQuality)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://choosealicense.com/licenses/mit/)

# MMM-AirQuality

A module for the [MagicMirror](https://github.com/MichMich/MagicMirror) to display a location's [*air quality index*](https://en.wikipedia.org/wiki/Air_quality_index) using data from [aqicn.org](http://aqicn.org/here/).

## Preview

<img width="318" alt="Bildschirmfoto 2022-01-20 um 06 57 01" src="https://user-images.githubusercontent.com/9592452/150281894-a4c87c58-5080-42fb-99c5-d63b10c3c320.png">


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
	header: 'AQI', //choose a header if you like
	config: {
	  location: 'beijing' // the location to check the index for
	}
},
```

### Location

Determine the station you want to display. Select a station on the [map](https://aqicn.org/here/) and copy the location part from the URL. For example http://aqicn.org/city/netherland/utrecht/griftpark/ would be `netherland/utrecht/griftpark/`.

You may want to set the following options in the config section as well:

| Option |  Description | Default | Required |
|---|---|---|---|
| `location` | The location for that you you want to show the air quality.|| x |
| `lang` | change the language | `en`||
| `updateInterval` | change the update period in minutes  | `30` ||
| `showLocation` | toggle location printing | `true` ||
| `appendLocationNameToHeader` | If set to `true`, the returned location name will be appended to the header of the module. | `true` ||
| `showIndex` | toggle index printing | `true` ||

### Known Issues

- Due to the AQI rendering script it is not possible to have multiple instances of this module running.
- There is a bug in the skript that prevent some locations from being displayed (e.g. 'Mannheim'). 
- Not all languages may be supported (see: http://aqicn.org/faq/2015-07-28/air-quality-widget-new-improved-feed/).
