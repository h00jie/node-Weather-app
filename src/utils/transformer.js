const moment = require('moment')

const transformer = (data) => {
    // console.log(data);
    

    const weatherInfoObj = {}
    const respObj = {}

    respObj.cityName = data.city.name
    data.list.map( (forecast) => {    
        const dateTime = forecast.dt_txt
        const date = moment(dateTime).format('DD/MM/YYYY')
        const time = moment(dateTime).format('HH:mm')

        const temp = forecast.main.temp
        const weatherDescr = forecast.weather[0].description


        if (!weatherInfoObj[date]) {
            weatherInfoObj[date] = []
            weatherInfoObj[date].push(insertDato(time, temp, weatherDescr))

        } else {
            weatherInfoObj[date].push(insertDato(time, temp, weatherDescr))
        }
    })
    respObj.forecast = weatherInfoObj

    return respObj

}

const insertDato = (time, temp, weatherDescr) => {

    return {'time' :time, 'temp' : temp, 'weatherDescr': weatherDescr}

}

module.exports = transformer