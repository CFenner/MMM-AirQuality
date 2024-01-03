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
    this.token = null
  },
  loadData: async function (config) {
    const self = this
    self.config = config

      let result = await fetch(`https://${self.config.apiBase}${self.config.dataEndpoint}/?token=${this.config.token}`)
        .then(response => response.json())

      self.sendSocketNotification(self.notifications.DATA_RESPONSE, {
        payloadReturn: result,
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
