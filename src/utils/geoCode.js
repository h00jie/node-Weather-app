const request = require('request')

const geoCode = ( address , callBack) => {
    if (address !== undefined) {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaDAwamllIiwiYSI6ImNqeGRmN2o3bjBjcjEzcGw3MThndmlhbXUifQ.0EglvaaTk3OV04ryPT_olA&limit=1'
        
        request({url: url, json: true}, (error, { body } = {}) => {
            if ( error ) {
                callBack('Unable to connect to geolocation service!', undefined)
            } else if (body.features.length === 0) {
                callBack('Unable to find location info Try another Search', undefined)
            } else {
                callBack(undefined, {
                    latitude: body.features[0].center[1],
                    longitute: body.features[0].center[0],
                })   
            }
        })
    
    } else {
        callBack('Το πεδίο address δεν μπορεί να είναι κενό', undefined)
    }

}

module.exports = geoCode