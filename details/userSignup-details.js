var db=require('../config/connection')
var collections=require('../config/collections')
const bcrypt=require('bcrypt')
const { reject } = require('bcrypt/promises')
const { status } = require('express/lib/response')
const async = require('hbs/lib/async')
const res = require('express/lib/response')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            userData.repassword=await bcrypt.hash(userData.repassword,10)
            db.get().collection(collections.USERSIGNUP_COLLECTIONS).insertOne(userData).then((data)=>{
                resolve(data.insertedId)
            })
        })
       
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collections.USERSIGNUP_COLLECTIONS).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("login successfully");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed")
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login failed");
                resolve({ststus:false})
            }
        })
    }
}