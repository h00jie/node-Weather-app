const request =  require('request')
const testData = require('./testData.json')
const transformer =  require('./transformer')
const log = console.log
const foreCast = (latitude, longitute , callBack) => {
    if (latitude !== undefined && longitute !== undefined) {
        const url = {
            'openWeather':'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitute+'&units=metric&APPID=a53889d636e5f16c596b36ede93c48c2&lang=el',
            'weatherStack': 'http://api.weatherstack.com/current?access_key=de4ed8c30e93a54a711c2808a315d7e6& query=Athens'
            }
            request({url: url.openWeather, json:true }, (error, { body } = response) => {
                if ( error ) {
                    callBack('Unable to connect to weather service!', undefined)
                } else if (body.error) {
                    callBack('Unable to find location weather info', undefined)
                } else {

                    callBack(undefined, transformer(body))
        
                }
            })
        
    }

}

module.exports = foreCast
