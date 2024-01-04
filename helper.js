/* MagicMirror²
 * Module: MMM-AirQuality
 *
 * By Christopher Fenner https://github.com/CFenner
 * MIT Licensed.
 */

module.exports = {
  notifications: {
    DATA: 'AIR_QUALITY_DATA',
    DATA_RESPONSE: 'AIR_QUALITY_DATA_RESPONSE',
  },
  start: function () {
    console.log('AirQuality helper started ...')
  },
  loadData: async function (payload) {
    const self = this
    self.config = payload.config
    const identifier = payload.identifier
    const url = `https://${self.config.apiBase}${self.config.dataEndpoint}${self.config.location}/?token=${this.config.token}`
    console.log(`AirQuality loaded: ${url}`)

    const result = await fetch(url)
      .then(response => response.json())

    self.sendSocketNotification(self.notifications.DATA_RESPONSE, {
      payloadReturn: { identifier, result },
      status: 'OK',
    })
  },
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case this.notifications.DATA:
        this.loadData(payload)
        break
    }
  },
}
