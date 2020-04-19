const express = require('express')
    , hbs = require('hbs')
    , path = require('path')

const app = express()

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

//calling middleware
app.use(logger)

//middleware definition
function logger(req, res, next) {
    var d = new Date()
    console.log("Request made to " + req.url + " by " + req.method + " method on " + d)
    next()
}

app.get('', (req, res) => {
    res.render('index',{
        title: "weather app",
        name: "Prayas"
    })
})

app.get('/view_orders', (req, res) => {
    res.render('view_orders')
})

app.get('/cancelled_orders', (req, res) => {
    res.render('cancelled_orders')
})

app.get('/order_details', (req, res) => {
    res.render('order_details')
})

app.get('/under_500', (req, res) => {
    res.render('under_500')
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log("Server is up on the port ", port)
})