'use strict'

const getCurrentWeather = require('./lib/getCurrentWeather')

const firstOfEntityRole = function(message, entity, role) {
  role = role || 'generic';

  const slots = message.slots
  const entityValues = message.slots[entity]
  const valsForRole = entityValues ? entityValues.values_by_role[role] : null

  return valsForRole ? valsForRole[0] : null
}

exports.handle = function handle(client) {
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('app:response:name:welcome')
      client.addResponse('app:response:name:provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('app:response:name:provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
     client.addResponse('app:response:name:apology/untrained')
     client.done()
    }
  })

  /*const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addTextResponse('Hello world, I mean human')
      client.done()
    }
  })

  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addTextResponse('See you later!')
      client.done()
    }
  })*/

  const collectCity = client.createStep({
	  satisfied() {
		return Boolean(client.getConversationState().weatherCity)
	  },

	  extractInfo() {
		const city = firstOfEntityRole(client.getMessagePart(), 'city')

		if (city) {
		  client.updateConversationState({
			weatherCity: city,
		  })

		  console.log('User wants the weather in:', city.value)
		}
	  },

	  prompt() {
		client.addResponse('app:response:name:prompt/weather_city')
		client.done()
	  },
	})

  const provideWeather = client.createStep({
	  satisfied() {
		return false
	  },

	   /*prompt() {
		let weatherData = {
		  temperature: 60,
		  condition: 'sunny',
		  city: client.getConversationState().weatherCity.value,
		}

		client.addResponse('app:response:name:provide_weather/current', weatherData)
		client.done()
	  }*/
	  prompt(callback) {
		getCurrentWeather(client.getConversationState().weatherCity.value, resultBody => {
		  /*if (!resultBody || resultBody.cod !== 200) {
			console.log('Error getting weather.')
			callback()
			return
		  }

		  const weatherDescription = (
			resultBody.weather.length > 0 ?
			resultBody.weather[0].description :
			null
		  )

		  const weatherData = {
			temperature: resultBody.main.temp,
			condition: weatherDescription,
			city: resultBody.name,
		  }*/
		  
		  const weatherDescription = resultBody.Body
		  const weatherData = {
			temperature: resultBody.Date,
			condition: weatherDescription,
			city: client.getConversationState().weatherCity.value,
		  }

		  console.log('sending real weather:', weatherData)
		  client.addResponse('app:response:name:provide_weather/current', weatherData)
		  client.done()

		  callback()
		  })}
	})
  
  client.runFlow({
	  classifications: {},
	  streams: {
		main: 'getWeather',
		hi: [sayHello],
		getWeather: [collectCity, provideWeather],
	  }
	})
  /*
  client.runFlow({
    classifications: {
      goodbye: 'goodbye',
      greeting: 'greeting'
    },
    streams: {
      goodbye: handleGoodbye,
      greeting: handleGreeting,
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained]
    }
  })*/
}