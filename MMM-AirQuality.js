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
  colors: {
    GOOD: '#009966',
    MODERATE: '#ffde33',
    UNHEALTHY_FOR_SENSITIVE_GROUPS: '#ff9933',
    UNHEALTHY: '#cc0033',
    HAZARDOUS: '#7e0023',
    UNKNOWN: '#333333',
  },
  start: function () {
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
  render: function (response) {
    const data = response.data
    this.data.value = data.aqi
    this.data.city = data.city.name
    this.loaded = true
    this.data.impact = this.getImpact(data.aqi)
    this.data.color = this.getColor(this.data.impact)
  },
  getImpact: function (aqi) {
    if (aqi < 51) return 'GOOD'
    if (aqi < 101) return 'MODERATE'
    if (aqi < 151) return 'UNHEALTHY_FOR_SENSITIVE_GROUPS'
    if (aqi < 201) return 'UNHEALTHY'
    if (aqi < 301) return 'HAZARDOUS'
    return 'UNKNOWN'
  },
  getColor: function (impact) {
    return this.colors[impact]
  },
  html: {
    icon: '<i class="fa-solid fa-smog"></i>',
    city: '<div class="xsmall">{0}</div>',
    quality: '<div style="color: {0}">{1} {2}{3}</div>',
  },
  getScripts: function () {
    return [
      '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.js',
      'String.format.js',
    ]
  },
  getStyles: function () {
    return ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css']
  },
  // Override getHeader method.
  getHeader: function () {
    let header = ''
    if (this.data.header !== '') {
      if (this.data.header === 'HEADER' || this.data.header === null) {
        header += this.translate('HEADER')
      } else {
        header += this.data.header
      }
    }

    if (this.loaded && this.config.appendLocationNameToHeader) {
      if (header !== '') {
        header += ' '
      }
      header += this.data.city
    }
    return header
  },
  // Override dom generator.
  getDom: function () {
    const wrapper = document.createElement('div')
    if (this.config.token === '') {
      wrapper.innerHTML = 'Please set the AQICN token for module: ' + this.name + ". You can acquire one at <a href='https://aqicn.org/data-platform/token/'>https://aqicn.org/data-platform/token/</a>."
      wrapper.className = 'dimmed light small'
      return wrapper
    }
    if (this.config.location === '') {
      wrapper.innerHTML = 'Please set the air quality index <i>location</i> in the config for module: ' + this.name + '.'
      wrapper.className = 'dimmed light small'
      return wrapper
    }

    if (!this.loaded) {
      wrapper.innerHTML = this.translate('LOADING')
      wrapper.className = 'dimmed light small'
      return wrapper
    }
    wrapper.innerHTML =
      this.html.quality.format(
        this.data.color,
        this.html.icon,
        this.translate(this.data.impact),
        (this.config.showIndex ? ' (' + this.data.value + ')' : '')) +
      (this.config.showLocation && !this.config.appendLocationNameToHeader ? this.html.city.format(this.data.city) : '')
    return wrapper
  },
  getTranslations: function () {
    return {
      en: 'l10n/en.json', // fallback language
      de: 'l10n/de.json',
    }
  },
  socketNotificationReceived: function (notification, payload) {
    const self = this
    Log.debug('received ' + notification)
    switch (notification) {
      case self.notifications.DATA_RESPONSE:
        if (payload.status === 'OK') {
          console.log('Data %o', payload.payloadReturn)
          self.render(payload.payloadReturn)
          self.updateDom(this.animationSpeed)
        } else {
          console.log('DATA FAILED ' + payload.message)
        }
        break
    }
  },
})
