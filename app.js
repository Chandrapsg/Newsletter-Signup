const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

//thsi line helps to display the image and style from public 
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended : true}))

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    lNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/896d470d9e";
    const Options = {
        method: "POST",
        auth: "chandra:b344afe63e066fb1c266a04e99c84022-us21"
    }
    const request = https.request(url, Options, function(response){
        if (response.statusCode === 200){
            res.sendfile(__dirname + "/success.html")
        }
        else{
            res.sendfile(__dirname + "/failur.html");
        }
        response.on("data",function(data){

            console.log(JSON.parse(data));
        });
    })
    request.write(jsonData);
    request.end();
console.log(firstName, lastName, email);

});

app.post("/failure", function(req, res){
    res.redirect("/")
})
app.listen(process.env.PORT || "3000", function(){
    console.log("newsletter port listing");
})

//ApiKey
//b344afe63e066fb1c266a04e99c84022-us21

//Audience ID or List ID https://us21.admin.mailchimp.com/lists/settings/defaults?id=9863
//896d470d9e.