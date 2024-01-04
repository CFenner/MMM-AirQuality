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
    VERY_UNHEALTHY: '#660099',
    HAZARDOUS: '#7e0023',
    UNKNOWN: '#333333',
  },
  start: function () {
    const self = this
    Log.info(`Starting module: ${this.name}`)
    self.loaded = false

    if (this.config.token !== '' && this.config.location !== '') {
      setTimeout(function () {
        self.sendSocketNotification(self.notifications.DATA, { identifier: self.identifier, config: self.config })
      }, this.config.initialDelay * 1000)

      // set auto-update
      setInterval(function () {
        self.sendSocketNotification(self.notifications.DATA, { identifier: self.identifier, config: self.config })
      }, this.config.updateInterval * 60 * 1000 + this.config.initialDelay * 1000)
    }
  },
  updateData: function (response) {
    this.loaded = true
    this.data.city = response.data.city.name
    this.data.value = response.data.aqi
    this.data.impact = this.getImpact(response.data.aqi)
    this.data.color = this.colors[this.data.impact]
  },
  getImpact: function (index) {
    if (index < 51) return 'GOOD'
    if (index < 101) return 'MODERATE'
    if (index < 151) return 'UNHEALTHY_FOR_SENSITIVE_GROUPS'
    if (index < 201) return 'UNHEALTHY'
    if (index < 301) return 'VERY_UNHEALTHY'
    if (index > 300) return 'HAZARDOUS'
    return 'UNKNOWN'
  },
  // Override getHeader method.
  getHeader: function () {
    let header = ''
    if (this.data.header !== '') {
      if (this.data.header === undefined) {
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
  getTemplate: function () {
    return `${this.name}.njk`
  },
  getTemplateData: function () {
    let message = ''
    if (this.config.token === '') {
      message = `Please set a token for ${this.name}.<br>You can acquire one at <a href='https://aqicn.org/data-platform/token/'>https://aqicn.org/data-platform/token/</a>.`
    } else if (this.config.location === '') {
      message = `Please set a location for ${this.name}!`
    }

    return {
      loaded: this.loaded,
      city: this.data.city,
      index: this.data.value,
      impact: this.data.impact,
      color: this.data.color,
      showLocation: this.config.showLocation && !this.config.appendLocationNameToHeader,
      showIndex: this.config.showIndex,
      labelLoading: this.translate('LOADING'),
      message,
    }
  },
  getTranslations: function () {
    return {
      en: 'l10n/en.json', // fallback language
      de: 'l10n/de.json',
    }
  },
  getScripts: function () {
    return ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.js']
  },
  getStyles: function () {
    return ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css']
  },
  socketNotificationReceived: function (notification, payload) {
    const self = this
    Log.debug('received ' + notification)
    switch (notification) {
      case self.notifications.DATA_RESPONSE:
        if (payload.identifier === this.identifier) {
          if (payload.status === 'OK') {
            console.log('Data %o', payload.payloadReturn)
            self.updateData(payload.payloadReturn)
            self.updateDom(this.animationSpeed)
          } else {
            console.log('DATA FAILED ' + payload.message)
          }
        }
        break
    }
  },
})
