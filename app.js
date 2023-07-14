const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
 
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey="b318d9618051be6f3944d5c63ee0dcfa";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey +"&units="+unit;
    https.get(url,function(response){
    //console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        //console.log(weatherData);
       const temp=weatherData.main.temp;
       // console.log(temp);
        const weatherDescription=weatherData.weather[0].description;
       // console.log(weatherDescription);
        const icon = weatherData.weather[0].icon;
        const imageUrl=" https://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celcius</h1>");
        res.write("<p>The weather is currently "+weatherDescription+"</p>");
        res.write("<img src="+imageUrl+">");
        res.send();
    })
})
//res.send("Server is up and running.");
})












app.listen(3000, function(){
    console.log("Server is running on port 3000. ");
})
