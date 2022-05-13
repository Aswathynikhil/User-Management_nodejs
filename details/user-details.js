var db=require('../config/connection')
var collections=require('../config/collections')
var objectId=require('mongodb').ObjectId
module.exports={
    addUser:(userinfo,callback)=>{
        console.log(userinfo);
        db.get().collection('userinfo').insertOne(userinfo).then((data)=>{
            callback(data.insertedId)
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let userinfo=await db.get().collection(collections.USERINFO_COLLECTIONS).find().toArray()
            
            resolve(userinfo)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USERINFO_COLLECTIONS).deleteOne({_id:objectId(userId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USERINFO_COLLECTIONS).findOne({_id:objectId(userId)}).then((editUser)=>{
              resolve(editUser)  
            })
        })
    },
    updateUser:(userId,userEditDetails)=>{
           return new Promise((resolve,reject)=>{
               db.get().collection(collections.USERINFO_COLLECTIONS)
               .updateOne({_id:objectId(userId)},{$set:{
                   name:userEditDetails.name,
                   place:userEditDetails.place,
                   address:userEditDetails.address,
                   phone:userEditDetails.phone
               }
            }).then((response)=>{
                resolve()
            })
           })
    }, 

    doAdminLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let admin=await db.get().collection(collections.ADMIN_COLLECTIONS).findOne({username:adminData.username})
            console.log(admin)
            if(admin){
               if(adminData.password==admin.password){
                        console.log("login successfully");
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed")
                        resolve({status:false})
                    }
            }else{
                console.log("login failed");
                resolve({status:false})
            }
        })
    }
    
}