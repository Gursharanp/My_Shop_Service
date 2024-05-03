const express= require("express");
let app=express();
const loginRouter= require("./controllers/loginController.js");
const allowOrigin = require("./middlewares/allowOrigin.js");
const verifyToken = require("./middlewares/verifyToken.js");
app.use(express.json());
app.use(allowOrigin);

app.get("/",(req,res)=>{
    res.json({
        message:"Server is running on port 8080"
    });
})
app.post("/getCurrentAddress",async(req,res)=>{
    //req = JSON.parse(req)
    let{lat,lon}=req.body;
    if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.display_name) {
            return res.json({ address: data.display_name });
        } else {
            throw new Error('Could not get location address');
        }
    } catch (error) {
        return res.status(500).json({ error: `Error fetching location address: ${error.message}` });
    }
})
app.use("/api",loginRouter);
app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})