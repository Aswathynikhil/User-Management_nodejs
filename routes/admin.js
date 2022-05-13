
var express = require('express');
const async = require('hbs/lib/async');
const { response } = require('../app');
var router = express.Router();

const app = require('../app');
var userDetails=require('../details/user-details')

router.get('/',(req,res)=>{
  let admin=req.session.admin
  console.log(admin)
  res.render('admin/admin-home',{admin:true})
})
router.get('/admin',(req,res)=>{

  res.render('admin/admin-home',{admin:true})
})









/* GET users listing. */
router.get('/view-users', function(req, res, next) {
  userDetails.getAllUsers().then((userinfo)=>{
    console.log(userinfo);
    res.render('admin/view-users',{userinfo,admin:true})
  })
  
  
});
router.get('/create-user',function(req,res){
  res.render('admin/create-user',{admin:true})
})
router.post('/create-user',(req,res)=>{
  console.log(req.body);
   userDetails.addUser(req.body,(result)=>{
    // console.log(result)
    res.redirect('/admin/view-users')
  })
})
router.get('/delete-user/:id',(req,res)=>{
  let userId=req.params.id
  console.log(userId)
  userDetails.deleteUser(userId).then((response)=>{
    res.redirect('/admin/view-users')
  })
})
router.get('/edit-user/:id',async (req,res)=>{
  let editUser=await userDetails.getUserDetails(req.params.id)
  res.render('admin/edit-user',{editUser,admin:true})
})
router.post('/edit-user/:id',(req,res)=>{
  userDetails.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-users')
  })
})

router.get('/admin-login/',(req,res)=>{
  res.render('admin/admin-login',{"adminErr":req.session.adminErr});
  req.session.AdminErr=false;
})





router.get('admin/admin-login',(req,res)=>{
  res.render('admin/admin-login',{admin:true,'adminErr':req.session.adminErr});
  req.session.adminErr=false

})
router.post('/admin-login',(req,res)=>{
  console.log(req.body)
  userDetails.doAdminLogin(req.body).then((response)=>{
    if(response.status){
    
     
      req.session.loggedIn=true
      req.session.admin=response.admin
      res.redirect('/admin')
    }else{
      req.session.adminErr="Invalid username or password"
      res.redirect('/admin/admin-login')
    }
  })
})
router.get('/adminlogout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})




// const username = 'aswathia.achu@gmail.com'
// const password = 'password'

// router.post('/admin-login/',(req, res)=>{
//   console.log(req.body)
//   const user= req.body.username;
//   const pw = req.body.password;
// //console.log(user)

//   if (user === username && pw === password){
//     req.session.admin=true
//     req.session.loggedIn=true
//     req.session.admin=res.admin
//     res.redirect('/admin');

//   }else{
//     req.session.AdminErr=true;
//     req.session.AdminErr="Invalid username or password"
//     res.redirect('/admin/admin-login/');
//   }
// })
// router.get('/logout',(req,res)=>{
//   req.session.destroy()
//   res.redirect('/')
// })
module.exports = router;
