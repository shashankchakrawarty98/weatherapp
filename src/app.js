const path = require('path');
const express = require('express');
const hbs= require('hbs');
const geocode= require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// console.log(__dirname);cd 
// console.log(__filename)

const DirectoryPath = path.join(__dirname,'./public');
app.set('view engine','hbs');
app.set("views", path.join(__dirname, "./public/views"));
const PartialsPath = path.join(__dirname,'./public/views/partials');
console.log(path.join(__dirname,'./public/views/partials'));
// console.log(DirectoryPath);

app.use(express.static(DirectoryPath));
hbs.registerPartials(PartialsPath);
/*app.get('',(req,res)=>{
    res.sendFile(DirectoryPath)
})*/

app.get('/help', (req, res) => {
   res.render('help',{
       title:'this is help page'
   });
})

app.get('/index',(req,res)=>{
    console.log("HELO")
    res.render('index',{
        title:'Weather App',
        name:'mausam'
    });
})

app.get('/about', (req, res) => {
   // res.send('about page');
   res.render('about',{
       name:'Mausam',
       title:'delhi'
       
   })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
       return res.send({
            error:'please provide a location'
        })
    }
    /*res.send([{
        forecast:'its snowing',
        location:'jammu and kashmir',
        address : req.query.address
    }]);*/

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
    
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
   
    
})

app.get('/products',(req,res)=>{
    
    if(!req.query.search){
       return res.send({
            error:'you must provide  a term'
        })
    }
    else{
        res.send({
            product:[]
        })
    }
    console.log(req.query.search)
    

})

app.get('*',(req,res)=>{
    console.log("not found func")
    res.render('notfound',{
        title:'notfound',
        name:'shashank',
        errorMessage:'page not found'
        
    })
})

app.listen(3000, () => {
    console.log('server running on port 3000');
})
