Module.create({
	// Default module config.
	defaults: {
        animationSpeed: 1000
	},
	start: function(){
		_aqiFeed({ city:"Beijing", callback:
			function(aqi){ 
				var aqiValue = $(aqi.aqit).find("span").text();
				this.text = '<div class="xsmall">'+aqi.cityname+'</div>'+'<div>'+this.toText(aqiValue)+' ('+aqiValue+')</div>';
				this.loaded = true;
				this.updateDom(this.animationSpeed);
			}.bind(this)
		});
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
		if (!this.loaded) {
			wrapper.innerHTML = '<div class="dimmed light small">Loading air quality index ...</div>'; 
			return wrapper;
		}
		wrapper.innerHTML = this.text;  

		return wrapper;
	}
});