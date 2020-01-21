const request = require('request')
console.log(__dirname)
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/324e66090d57730c5a828df0ea3efee1/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {console.log(body.currently)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast