const asyncRequest = require("async-request")
const express = require("express")
const path = require("path")

const getWeather= async (location)=>{
    const key = "0abc76e94eebc6ab1a4d3c73cad3db8e"
    // http://api.weatherstack.com/current?access_key=0abc76e94eebc6ab1a4d3c73cad3db8e&query=tokyo
    const url= `http://api.weatherstack.com/current?access_key=${key}&query=${location}`
    try {
        const response = await asyncRequest(url)
        const data = JSON.parse(response.body)
        const weather = {
            region:data.location.region,
            country:data.location.country,
            temperature:data.current.temperature,
            wind_speed:data.current.wind_speed,
            precip:data.current.precip,
            cloudcover:data.current.cloudcover

        }
        console.log(weather)
        return weather
    } catch (error) {
        console.log("notfound")
       
        return 1
    }


}
// getWeather("tokyo")


const app = express()

app.get("/", async(req,res)=>{
   
    const params = req.query
    const location = params.address
    const weather = await getWeather(location)
    if(location){
        res.render("weather",{
            status: true,
            region:weather.region,
            country:weather.country,
            temperature:weather.temperature,
            wind_speed:weather.wind_speed,
            precip:weather.precip,
            cloudcover:weather.cloudcover,
    
        })
    }else{
        
        res.render("weather",{
            status: false
    
        })
    }
    
})
app.set("view engine","hbs")
const port =7001
app.listen(port,()=>{
    console.log("server run on port 7001")
}
)

const pathPublic=path.join(__dirname,"../public")
app.use(express.static(pathPublic))
