Module.create({
	// Default module config.
	defaults: {
		lang: '',
		location: '',
		updateInterval: 30 * 60 * 1000, // every 30 minutes
		animationSpeed: 1000
	},
	start: function(){
		Log.info('Starting module: ' + this.name);
		// load data
		this.load();
		// schedule refresh
		setInterval(
			this.load.bind(this),
			this.config.updateInterval);
	},
	load: function(){
		_aqiFeed({
			lang: this.config.lang,
			city: this.config.location,
			callback: this.render.bind(this)
		});
	},
	render: function(data){
		var aqiValue = $(data.aqit).find("span").text();
		this.text = '';
		this.text += '<div><i class="fa fa-leaf"></i> '+data.impact+' ('+aqiValue+')</div>';
		this.text += '<div class="xsmall">'+data.cityname+'</div>';
		this.loaded = true;
		this.updateDom(this.animationSpeed);
	},
	html: {
		city: '<div class="xsmall">{0}</div>',
		aqi: '<div>{0} ({1})</div>'
	},
	getScripts: function() {
		return [
			'aqiFeed.js',
			'//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.js'
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
		wrapper.innerHTML = this.text;  

		return wrapper;
	}
});
