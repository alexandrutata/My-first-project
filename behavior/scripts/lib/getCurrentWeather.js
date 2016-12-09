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

module.exports = function getMessageTemplate(locationName, next) {
  const requestUrl = `http://localhost/MessageTemplate/Message/Read/${locationName}`
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

module.exports = function getQP(locationName, next) {
  const requestUrl = `http://localhost/Bls.LPM.Api.CustomApi/CustomApiRest.svc/QueryPoints?source=WEB&channel=SITE&externalReferenceId=1111&subscriberId=774004379&subscriberIdType=Msisdn&language=EN`
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

module.exports = function getCustomerDetails(locationName, next) {
  const requestUrl = `http://localhost/Bls.LPM.Api.CustomApi/CustomApiRest.svc/GetCustomerProfile?source=WEB&channel=SITE&externalReferenceId=1111&subscriberId=774004379&subscriberIdType=Msisdn&language=EN`
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

module.exports = function getIsRegistered(locationName, next) {
  const requestUrl = `http://localhost/Bls.LPM.Api.CustomApi/CustomApiRest.svc/IsCustomerRegistered?source=WEB&channel=SITE&externalReferenceId=1111&subscriberId=774004379&subscriberIdType=Msisdn&language=EN`
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