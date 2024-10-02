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
  start() {
    console.log('AirQuality helper started ...')
  },
  async loadData(payload) {
    const self = this
    const url = `https://${payload.config.apiBase}${payload.config.dataEndpoint}${payload.config.location}/?token=${payload.config.token}`
    console.log(`AirQuality-Fetcher: ${url}`)

    const result = await fetch(url)
      .then(response => response.json())

    self.sendSocketNotification(self.notifications.DATA_RESPONSE, {
      payloadReturn: result,
      status: 'OK',
      identifier: payload.identifier,
    })
  },
  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case this.notifications.DATA:
        console.log(`AirQuality-Fetcher: Loading data of ${payload.config.location} for module ${payload.identifier}`)
        this.loadData(payload)
        break
    }
  },
}
