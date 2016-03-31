Module.create({
	// Default module config.
	defaults: {
		location: '',
        	updateInterval: 30 * 60 * 1000, // every 30 minutes
        	animationSpeed: 1000
	},
	start: function(){
		Log.info('Starting module: ' + this.name);
		setInterval(
			this.load.bind(this),
			this.config.updateInterval);
	},
	load: function(){
		_aqiFeed({
			city: this.config.location,
			callback: this.render.bind(this)
		});
	},
	render: function(data){
		var aqiValue = $(data.aqit).find("span").text();
		this.text = '<div class="xsmall">'+data.cityname+'</div>'
			+'<div>'+this.toText(aqiValue)+' ('+aqiValue+')</div>';
		this.loaded = true;
		this.updateDom(this.animationSpeed);
	},
	toText: function(value){
		if(value > 300){
			return 'Severely Polluted';
		}else if(value > 200){
			return 'Heavily Polluted';
		}else if(value > 150){
			return 'Moderately Polluted';
		}else if(value > 100){
			return 'Lightly Polluted';
		}else if(value > 50){
			return 'Good';
		}else{
			return 'Excellent';
		}
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
		return [];
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
