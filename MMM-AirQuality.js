/* Magic Mirror
 * Module: AirQuality
 *
 * By Christopher Fenner http://github.com/CFenner
 * MIT Licensed.
 */
Module.register('MMM-AirQuality', {
	// Default module config.
	defaults: {
		lang: '',
		location: '',
		showLocation: true,
		showIndex: true,
		updateInterval: 30, // every 30 minutes
		animationSpeed: 1000
	},
	start: function(){
		Log.info('Starting module: ' + this.name);
		// load data
		this.load();
		// schedule refresh
		setInterval(
			this.load.bind(this),
			this.config.updateInterval * 60 * 1000);
	},
	load: function(){
		_aqiFeed({
			lang: this.config.lang,
			city: this.config.location,
			callback: this.render.bind(this)
		});
	},
	render: function(data){
		this.data.value = $(data.aqit).find("span").text();
		this.data.impact = data.impact;
		this.data.city = data.cityname;
		this.loaded = true;
		this.updateDom(this.animationSpeed);
	},
	html: {
		icon: '<i class="fa fa-leaf"></i>',
		city: '<div class="xsmall">{0}</div>',
		quality: '<div>{0} {1}{2}</div>'
	},
	getScripts: function() {
		return [
			'aqiFeed.js',
			'//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.js',
			'String.format.js'
		];
	},
	getStyles: function() {
		return ['https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'];
	},
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		if (this.config.location === '') {
			wrapper.innerHTML = "Please set the air quality index <i>location</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		if (!this.loaded) {
			wrapper.innerHTML = "Loading air quality index ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		wrapper.innerHTML = 
			this.html.quality.format(
				this.html.icon,
				this.data.impact,
				(this.config.showIndex?' ('+this.data.value+')':''))+
			(this.config.showLocation?this.html.city.format(this.data.city):'');
		return wrapper;
	}
});
