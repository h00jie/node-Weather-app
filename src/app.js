const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')
const log = console.log

const app = express()

const port = 5000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hadlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup server static folder to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'h00jie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        imageName:'sea.jpeg',
        name: 'h00jie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'h00jie',
        helpText: 'This is some help text'
    })
})

app.get('/weather', (req, res) => {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
    console.log( ip )
    // console.log(req)
    dns.reverse(req.connection.remoteAddress, function(err, domains) {
        console.log(domains);
    });

    const { address } =  req.query
    if ( !address ) {
        return res.json({
            error: 'You must provide an address'
        })
    }

    geoCode(address, (error, {latitude, longitute} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        foreCast(latitude, longitute, ( foreCastError, foreCastData ) => {
            
            if (foreCastError) {
                return res.send({
                    error: foreCastError
                })
            }
            res.json({
                foreCastData
            })
        })
    })
    
})

// Help 404 handler
app.get('/help/*', (req, res) => {

    res.render('404-help', {
        title: 'Help 404',
        name: 'h00jie',
        requestedUrl: (req.url).replace('/', '').split('/')[1]
    })

})

// 404 handler
app.get('*', (req, res) => {


    res.render('404', {
        title: '404 Page',
        name: 'h00jie',
        requestedUrl: (req.url).replace('/', '')
        
    })

})

app.listen(port,  () => {
    console.log('Server is up and running, listening on port 5000!')
})