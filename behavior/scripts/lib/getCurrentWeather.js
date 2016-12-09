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
      var parsedResult = JSON.parse(body)
	  
	  if (!parsedResult || parsedResult.QueryPointsResult.Error == '') {
		console.log('API ERROR fct: error code: ' + parsedResult.QueryPointsResult.Error.ErrorCode)
		parsedResult = ''
	  }
	  else{
		  parsedResult = parsedResult.QueryPointsResult.Wallets[0].Points + ' points'
	  }
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
      var parsedResult = JSON.parse(body)
	  
	  if (!parsedResult || parsedResult.GetCustomerProfileResult.Error == '') {
		console.log('API ERROR fct: error code: ' + parsedResult.GetCustomerProfileResult.Error.ErrorCode)
		parsedResult = ''
	  }
	  else{
		  parsedResult = parsedResult.GetCustomerProfileResult.CustomerGeneralInfo.FirstName + ' ' + parsedResult.GetCustomerProfileResult.CustomerGeneralInfo.LastName
	  }
      next(parsedResult)
    } else {
      next()
    }
  })
}

module.exports = function getIsRegistered(locationName, next) {
  const requestUrl = `http://http://91.231.232.36//Bls.LPM.Api.CustomApi/CustomApiRest.svc/IsCustomerRegistered?source=WEB&channel=SITE&externalReferenceId=1111&subscriberId=774004379&subscriberIdType=Msisdn&language=EN`
  console.log('Making HTTP GET request to:', requestUrl)

  request(requestUrl, (err, res, body) => {
    if (err) {
      throw new Error(err)
    }

    if (body) {
      var parsedResult = JSON.parse(body)
	  
	  if (!parsedResult || parsedResult.IsCustomerRegisteredResult.Error == '') {
		console.log('API ERROR fct: error code: ' + parsedResult.IsCustomerRegisteredResult.Error.ErrorCode)
		parsedResult = ''
	  }
	  else{
		  parsedResult = parsedResult.IsCustomerRegisteredResult.IsCustomerRegistered
	  }
      next(parsedResult)
    } else {
      next()
    }
  })
}
/*
module.exports = function register(locationName, next) {
  const requestUrl = `http://http://91.231.232.36//Bls.LPM.Api.CustomApi/CustomApiRest.svc/Register?source=WEB&channel=SITE&externalReferenceId=1111&subscriberId=774004379&subscriberIdType=Msisdn&language=EN`
  console.log('Making HTTP GET request to:', requestUrl)

  request(requestUrl, (err, res, body) => {
    if (err) {
      throw new Error(err)
    }

    if (body) {
      var parsedResult = JSON.parse(body)
	  
	  if (!parsedResult || parsedResult.RegisterResult.Error.ErrorCode !== 0) {
		console.log('API ERROR fct: error code: ' + parsedResult.RegisterResult.Error.ErrorCode)
		parsedResult = ''
	  }
	  else{
		  parsedResult = 'Success'
	  }
      next(parsedResult)
    } else {
      next()
    }
  })
}*/