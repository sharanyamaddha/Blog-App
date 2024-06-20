const exp=require('express');
const app=exp()
require('dotenv').config()
const mc=require('mongodb').MongoClient
const path=require('path')


 //deploy react build in this server
app.use(exp.static(path.join(__dirname,'../client/build')))
//to parse body of req
app.use(exp.json())

//connect to db
mc.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const blogdb=client.db('blogdb')
    //get collection obj
    const usersCollection=blogdb.collection('usersCollection')
    const articlesCollection=blogdb.collection('articlesCollection')
    const authorsCollection=blogdb.collection('authorsCollection')
    //share collection obj with express app
    app.set('usersCollection',usersCollection)
    app.set('articlesCollection',articlesCollection)
    app.set('authorsCollection',authorsCollection)
    //confirm db connection status
    console.log("DB connection success")
})
.catch(err=>console.log("Err in DB connection ",err))

//import API routes
const userApp=require('./API/user-api')
const authorApp=require('./API/author-api')
const adminApp=require('./API/admin-api')


//if path starts with user-api send req to userApp
app.use('/user-api',userApp)
//if path starts with author-api send req to authorApp
app.use('/author-api',authorApp)
//if path starts with admin-api send req to adminApp
app.use('/admin-api',adminApp)

//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})  


//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

//assign port number
const port=process.env.PORT || 5000; 
app.listen(port,()=>console.log(`web server on port ${port}`))