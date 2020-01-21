const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhc2hhbmtjaGFrcmF3YXJ0eSIsImEiOiJjazVtNjdxZ3IwdzhkM2xuNTNpcHFqZjZkIn0.hOLtKc1JoZZEFs6gZ_aWsg'

    request({ url, json: true }, (error, { body }) => {
        console.log(body.features[0])
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode