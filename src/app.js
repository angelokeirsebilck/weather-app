const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.Port || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to servce
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Angelo'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About title',
        name: 'Angeloo'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'This is the help message. Hope it helps.',
        title: 'Help',
        name: 'Angelo'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'No address was selected.'
        })
    }


    geocode(req.query.address, (error, {lat,long,location} = {}) => {
        if(error){
           return res.send({
               error
           })
        }else{

            forecast(long,lat,(error, dataForecast) => {
                if(error){
                   return res.send({
                     error
                   })
                }else{
                   res.send({
                       location,
                       forecast: dataForecast,
                       address: req.query.address
                   })
                }
            });
    
        }
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    }) 
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Angelo'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Angelo'
    })
})


app.listen(port, () => {
    console.log('Express server started on port ' + port)
});