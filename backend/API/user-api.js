//create user api app
const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../Middlewares/verifyToken')
//const commonApp=require('./common-api')

let usersCollection;
let articlesCollection;
//get usercollection app
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

//user registration route
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const newUser=req.body
    //check for duplicate user based on username
    const dbUser=await usersCollection.findOne({username:newUser.username})
    //if user found in db
    if(dbUser!=null){
        res.send({message:"User existed"})
    }else{
        //hash the password
        const hashedPassword=await bcryptjs.hash(newUser.password,6)
        //replace plain password with hashed password
        newUser.password=hashedPassword
        //create user
        await usersCollection.insertOne(newUser)
        //send res
        res.send({message:"user created"})
        //console.log(newUser)
    }
}))


//user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get cred obj from client
    const userCred=req.body
    //check for username
    const dbUser=await usersCollection.findOne({username:userCred.username})
    if(dbUser==null){
        res.send({message:"invalid username"})
    }else{
        //check for password
        const flag=await bcryptjs.compare(userCred.password,dbUser.password)
        if(flag==false){
            res.send({message:"invalid password"})
        }else{
            //create jwt token and encode it
            const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            //send res
            res.send({message:"login success",token:signedToken,user:dbUser})
            //console.log(dbUser)
        }
    }
}))


//get all articles of all users-view articles
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articlescollection from express app
    const articlesCollection=req.app.get('articlesCollection')
    //get all articles
    let articlesList=await articlesCollection.find({status:true}).toArray()
    //send res
    res.send({message:"articles",payload:articlesList})
}))


//post comments for an article by articleId
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get user comment obj
    const userComment=req.body
    const articleIdFromUrl=(+req.params.articleId)
    //insert userComment object to comments array of article by id
    let result=await articlesCollection.updateOne({articleId:articleIdFromUrl},{$addToSet:{comments:userComment}})
    console.log(result)
    res.send({message:"comment posted"})
}))


//export userApp
module.exports=userApp;