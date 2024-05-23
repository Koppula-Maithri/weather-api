import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.render("index.ejs",{ weather: null });
})
app.post("/",async(req,res)=>{
    try{
    const lat=req.body["latitude"];
    const lon=req.body["longitude"];
    const API_key="8dfe2726b9354ef195650837242305";
   // const result=await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_key}&lat=${lat}&lon=${lon}`);
   const result = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
            params: {
                key: API_key,
                q: `${lat},${lon}`
            }})
            const dat = {
                temp: result.data.current.temp_c,
                description: result.data.current.condition.text
            };
    
  
    res.render("index.ejs",{weather:dat});
}catch(error){
    
res.send("Error in fetching the data",error);
res.render("index.ejs",{weather:null});
}
})
app.listen(port,()=>{
    console.log("Listening at port :3000");
})