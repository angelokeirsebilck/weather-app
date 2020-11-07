const request = require('request');


const forecast = (latitude,longitude,callback) => {

    const url =`http://api.weatherstack.com/current?access_key=2fd8fda28f7dd1f43af4665c6fc9d22e&query=${latitude},${longitude}&units=m`;

    request({url: url, json: true},(error,response) => {
        if(error){
            callback('Unable to connect to weather service.')
        }
        else if(response.body.error){
            callback('Wrong input.')
        }
        else{

            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. There is a '  + response.body.current.precip + '% chance of rain.')
        }

    });

}

module.exports = forecast