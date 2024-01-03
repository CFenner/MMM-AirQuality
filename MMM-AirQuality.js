/* Magic Mirror
 * Module: AirQuality
 *
 * By Christopher Fenner http://github.com/CFenner
 * MIT Licensed.
 */
Module.register('MMM-AirQuality', {
	// Default module config.
	defaults: {
    initialDelay: 0,
		lang: '',
		location: '',
		showLocation: true,
		showIndex: true,
		appendLocationNameToHeader: true,
		updateInterval: 30, // every 30 minutes
		animationSpeed: 1000,
		token: '',
    apiBase: 'api.waqi.info/',
    dataEndpoint: 'feed/',
	},
  notifications: {
    DATA: 'AIR_QUALITY_DATA',
    DATA_RESPONSE: 'AIR_QUALITY_DATA_RESPONSE',
  },
	start: function(){
    const self = this
    Log.info(`Starting module: ${this.name}`)
    self.loaded = false

    setTimeout(function () {
      self.sendSocketNotification(self.notifications.DATA, self.config)
    }, this.config.initialDelay * 1000)

    // set auto-update
    setInterval(function () {
      self.sendSocketNotification(self.notifications.DATA, self.config)
    }, this.config.updateInterval * 60 * 1000 + this.config.initialDelay * 1000)
	},
	render: function(response){
		let data = response.data;
		this.data.value = data.aqi; 
		this.data.city = data.cityname;
		this.loaded = true;

		if (data.aqi < 51) {
			this.data.color = "#009966";
			this.data.impact = 'Good';
		} else if (data.aqi < 101) {
			this.data.color = "#ffde33";
			this.data.impact = 'Moderate';
		} else if (data.aqi < 151) {
			this.data.color = '#ff9933';
			this.data.impact = 'Unhealty for Sensitive Groups';
		} else if (data.aqi < 201) {
			this.data.color = '#cc0033';
			this.data.impact = 'Unhealthy';
		} else if (data.aqi < 301) {
			this.data.color = '#7e0023';
			this.data.impact = 'Hazardous';
		}

		this.updateDom(this.animationSpeed);
	},
	html: {
		icon: '<i class="fa-solid fa-smog"></i>',
		city: '<div class="xsmall">{0}</div>',
		quality: '<div style="color: {0}">{1} {2}{3}</div>'
	},
	getScripts: function() {
		return [
			'//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.js',
			'String.format.js'
		];
	},
	getStyles: function() {
		return ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'];
	},
        // Override getHeader method.
        getHeader: function () {
                var header = ""
                if (this.data.header)
                        header += this.data.header;
                if (this.config.appendLocationNameToHeader) {
                        if (header != "") {
                                header += " ";
                        }
                        header += this.data.city;
                }
                return header
        },
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		if (this.config.token === '') {
			wrapper.innerHTML = "Please set the AQICN token for module: " + this.name + ". You can acquire one at <a href='https://aqicn.org/data-platform/token/'>https://aqicn.org/data-platform/token/</a>.";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
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
				this.data.color,
				this.html.icon,
				this.data.impact,
				(this.config.showIndex?' ('+this.data.value+')':''))+
			(this.config.showLocation && !this.config.appendLocationNameToHeader?this.html.city.format(this.data.city):'');
		return wrapper;
	},
  socketNotificationReceived: function (notification, payload) {
    const self = this
    Log.debug('received ' + notification)
    switch (notification) {
      case self.notifications.DATA_RESPONSE:
		    self.render(payload)
        break
    }
  },
});
