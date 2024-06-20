//create author api app
const exp=require('express')
const authorApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../Middlewares/verifyToken')
//const commonApp=require('./common-api')

let authorsCollection;
let articlesCollection;
//get authorscollection app
authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get('authorsCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

//author registration route
authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    //get author resource from client
    const newauthor=req.body
    //check for duplicate author based on authorname
    const dbauthor=await authorsCollection.findOne({username:newauthor.username})
    //if author found in db
    if(dbauthor!==null){
        res.send({message:"user existed"})
    }else{
        //hash the password
        const hashedPassword=await bcryptjs.hash(newauthor.password,6)
        //replace plain password with hashed password
        newauthor.password=hashedPassword
        //create author
        await authorsCollection.insertOne(newauthor)
        //send res
        res.send({message:"author created"})
        //console.log(newauthor)
    }
}))


//author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get cred obj from client
    const userCred=req.body
    //check for authorname
    const dbauthor=await authorsCollection.findOne({username:userCred.username})
    if(dbauthor===null){
        res.send({message:"invalid username"})
    }else{
        //check for password
        const flag=await bcryptjs.compare(userCred.password,dbauthor.password)
        if(flag===false){
            res.send({message:"invalid password"})
        }else{
            //create jwt token and encode it
            const signedToken=jwt.sign({username:dbauthor.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            //send res
            res.send({message:"login success",token:signedToken,author:dbauthor})
            //console.log(dbauthor)
        }
    }
}))


//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle=req.body
    //post to articles collection
    await articlesCollection.insertOne(newArticle)
    //send res
    res.send({message:"new article created"})
}))


//update article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body
    //update article by id
    let result=await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlesCollection.findOne({articleId:modifiedArticle.articleId})
    console.log(result)
    res.send({message:"article modified"})
}))

//delete an article by article id
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get article from url
    const articleIdFromUrl=(+req.params.articleId);
    //get article
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
        let modifiedArt=await articlesCollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt=await articlesCollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
    // //update status of article to false
    // await articlesCollection.updateOne({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}})
    // res.send({message:'article removed'})
}))


//read articles of author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const authorName=req.params.username
    //get articles whose status is true
    const articlesList=await articlesCollection.find({username:authorName}).toArray()
    res.send({message:"list of articles",payload:articlesList})
}))




//export authorApp
module.exports=authorApp;