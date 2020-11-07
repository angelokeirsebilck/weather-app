const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5nZWxvZ3JlZW55IiwiYSI6ImNrZ3oxeWd6OTB6bzAydW9ldjBkdHR0dG0ifQ.W5ftvkJSLCCcUPonZdYO5A';

    request({url: url, json: true},(error,response) => {
        if(error){
            callback('Unable to connect to mapbox service.',undefined)
        }
        else if (response.body.features.length === 0){
            callback('Wrong input.', undefined)
        }
        else{
            const data = {
                location: response.body.features[0].place_name,
                lat: response.body.features[0].center[0],
                long: response.body.features[0].center[1]
            }
            callback(undefined,data)
        }
    
    });
}

module.exports = geocode