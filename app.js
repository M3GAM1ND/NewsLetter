const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function (req, res){
    const firstName = req.body.Fname;
const lastName = req.body.Lname;
const email = req.body.Email;

const data ={
    members:[
        {
        email_address: email,
        status : "subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }
  ]
};
const jasonData = JSON.stringify(data);
const options = {
    method: "POST",
    auth:"M3GA:7129bfe9aa676de6db5bba426161aedf-us11"
}
const request = https.request('https://us11.api.mailchimp.com/3.0/lists/2707b1b6cf',options,function(response){

if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
} else{
    res.sendFile(__dirname+"/faliure.html");
}

response.on("data",function(data){

})
}) 
request.write(jasonData);
request.end();
});

app.post("/faliure", function(req,res){
    res.redirect("/");
})

 app.listen(process.env.PORT || 3000,function(){
    console.log("runing on 3000");
 })

//  api Key 7129bfe9aa676de6db5bba426161aedf-us11
// list id 707b1b6cf