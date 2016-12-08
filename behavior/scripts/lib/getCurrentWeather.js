'use strict'

const request = require('request')

module.exports = function getCurrentWeather(locationName, next) {
  const appId = '50502340f1bdd96e290552bddc9e581c'

  const requestUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&appid=${appId}&q=${locationName}`

  console.log('Making HTTP GET request to:', requestUrl)

  request(requestUrl, (err, res, body) => {
    if (err) {
      throw new Error(err)
    }

    if (body) {
      const parsedResult = JSON.parse(body)
      next(parsedResult)
    } else {
      next()
    }
  })
}