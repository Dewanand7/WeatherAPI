const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
    extended: true
}))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})
app.post('/', (req, res) => {

    const query = req.body.cityName
    const apiKey = 'a55e55a176fc72e2484fecf21b2d74ce'
    const unit = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            console.log(weatherData)
            const temp = weatherData.main.temp
            console.log(temp)
            const weatherDescription = weatherData.weather[0].description
            console.log(weatherDescription)
            const icon = weatherData.weather[0].icon
            const imageURl = ' http://openweathermap.org/img/wn/' + icon + '@2x.png'

            res.write('<p> The Weather is currently ' + weatherDescription + '</p>')
            res.write(`<h1>The Temp in ${query}is ${temp} degree Celcius.</h1>`)

            res.write('<img src=' + imageURl + '>')
            res.send()


            const object = {
                name: 'Dewanand',
                favouriteSinger: 'ketty perry'
            }
            console.log(JSON.stringify(object))
        })
    })
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})