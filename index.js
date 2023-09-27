const express = require('express')
const mongoose = require('mongoose')
const mongooseObjectID= mongoose.Types.ObjectId
const user = require('./models/user')
const note = require('./models/note')
const app = express()
app.use(express.json({extended: true}))    
app.use(express.urlencoded({ extended: true }))
const path = require('path');
const bcrypt = require("bcrypt")

app.use(express.static(path.join(__dirname, 'public')));


const port = 3000

//Wersja dockerowa

// mongoose.connect('mongodb://mongo:27017/')
//    .then(() => {
//       console.log("Connected to MongoDB");
//    })
//    .catch((error) => {
//       console.error("Error connecting to MongoDB:", error);
//    });

//Wersja lokalna

mongoose.connect('mongodb://localhost:27017/')
   .then(() => {
      console.log("Connected to MongoDB");
   })
   .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      console.log("123")
   });


//Endpoints to serve the HTML

// app.get('/', (req, res) => {
//   res.sendFile("pages/index.html", {root: __dirname})
// })

// app.get('/login', (req, res) => {
//     res.sendFile("pages/login.html", {root: __dirname})
//   })

  
// app.get('/signUp', (req, res) => {
//     res.sendFile("pages/signup.html", {root: __dirname})
//   })

app.get('/', (req, res) => {
    res.sendFile("pages/login.html", {root: __dirname})
    })
  
app.get('/index', (req, res) => {
  res.sendFile("pages/index.html", {root: __dirname})
    })
  
    
app.get('/signup', (req, res) => {
    res.sendFile("pages/signup.html", {root: __dirname})
    })
  
app.get('/about', (req, res) => {
    res.sendFile("pages/about.html", {root: __dirname})
    })
    
//Endpoints for APIs

app.post('/getNotes', async (req, res) => {
    let notes = await note.find({email: req.body.email})
    res.status(200).json({success: true, notes})
  })

app.post('/login', async (req, res) => {
    let User = await user.findOne({email: req.body.email})
  
    if(!User){
        res.status(200).json({success: false, message: "No user found!"})
    }
    else{
        if(await bcrypt.compare(req.body.password, User.password)){
          res.status(200).json({success: true, User: {email: User.email} , message: "Logged in!"})
        }
        else{
          res.status(200).json({success: false, message: "Wrong password!"})
        }
        
    } 

  })


app.post('/signup', async (req, res) => {   
    const existingUser = await user.findOne({email: req.body.email})
    if(!existingUser){
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let newUser = {email: req.body.email, password: hashedPassword}  
    await user.create(newUser)
    res.status(200).json({success: true, User: newUser})
    }
    else {
    res.status(200).json({success: false, User: ""})
    }
  })

app.post('/addNote', async (req, res) => {
  console.log(req.body.id)
   if(req.body.id == null){
    let Note =  await note.create(req.body)
    res.status(200).json({success: true, Note})
   }
   else{
    let editNote = await note.updateOne({ _id: req.body.id }, { $set: req.body })
    res.status(200).json({success: true, editNote})
   }

  })


app.post('/:id', async (req, res) => {
    let Note =  await note.findOne({_id: new mongooseObjectID(req.params.id)})
    res.status(200).json({success: true, Note})
  })

app.delete('/:id', async (req, res) => {
    const deleteID = req.params.id
    console.log(deleteID)
    const result = await note.deleteOne({_id: new mongooseObjectID(deleteID)})
    res.status(200).json({success: true, result})  
})

 
app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`)
})

