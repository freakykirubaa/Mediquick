const express=require('express');

const router=express.Router();
const twilio = require('twilio');
const path=require('path')
const app=express();


app.use(express.static("public"));
var bodyParser = require('body-parser');

var date={
    date:new Date()
}
var mongoose=require('mongoose');
const { dirname } = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://freaky:kirubaa@cluster0.gk8zr.mongodb.net/mongoose?retryWrites=true&w=majority')


const d=new Date();
console.log(d)





var nameSchema = new mongoose.Schema({
   
    
        Name:{
        type:String,
        
        
        
        },

        Email:{ 
            type:String,
            
        },
        Number:{
            type:Number,
            required:true,
            
        },
        Date:{
            type:String,
            
         } ,


         Address:{
             type:String,
         },

         Doctors:{

            type:String,

         }

        
        
        
        

    });
    var User = mongoose.model("User", nameSchema);
    function myFunction(){
        return Math.floor(1000 + Math.random() * 9000);
    }
    var otp = myFunction();
    const msg = `Hello! Appointment has been successfully booked Your token is ${otp}`;


app.get("/", (req, res) => {
    var client = new twilio('ACdc47a6e810164829a8baada859b45b31','617b5f4ce49ebe4050cf504d607e91ba');
    client.messages.create({
        from: '+19107189676',
        to: '+918667314316',
        body: msg,
});






    // var btn =document.getElementById("myBtn");
    // var phno=document.getElementById("myPhno").value;

    //  btn.addEventListener("click", func);

    res.sendFile(__dirname + "/index.html");
});

// app.post("/", function(req,res){
//     ph=req.body.Number;
    
//     res.redirect("/");
// });

app.get("/table", (req, res) => {
    res.sendFile(__dirname + "/table.html");
});

app.get("/emergency",(req,res)=>{
    res.send("emergency")
})

//router.post("/register",(req,res)=>{
    //const body=req.body;
   //const user= User.findOne({email:body.email});
   //if(body)
   //{
      // res.send("Logged in")

   //}

  // else{
  //  res.status(401).json({ error: "User does not exist" });
  // }
//})

//app.get('/contact',(req,res)=>{
    
  //  res.send("contact")
//})


app.get('/contact',(req,res)=>{
    res.sendFile(__dirname+"/contact.html")
})


app.get('/map',(req,res)=>{
    res.sendFile(__dirname+"/map.html")
})




    app.post("/appointment", (req, res) => {
        var myData = new User(req.body);
        myData.save()
            .then(item => {
                res.send("Your appointment has been booked successfully!!");
            })
            .catch(err => {
                res.status(400).send("Unable to save to database");
            });
    });

const PORT=5000;
app.listen(PORT,()=>{
        console.log(`Connected to http://localhost:${PORT} successfully`);
})


module.exports=router;
