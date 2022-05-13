var express = require('express');
const { response } = require('../app');
var router = express.Router();
var userSignup=require('../details/userSignup-details')
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user);

  let products=[
    {
      name:"Redmi",
      category:"mobile",
      description:"Redmi 9A Sport (Coral Green, 2GB RAM, 32GB Storage) | 2GHz Octa-core Helio G25 Processor | 5000 mAh Battery",
      image:"https://m.media-amazon.com/images/I/71Iq9ug6OvL._SX679_.jpg"
    },
    {
      name:"oppo",
      category:"mobile",
      description:"OPPO A31 ddddddd(Fantasy White, 6GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers",
      image:"https://m.media-amazon.com/images/I/61RQyzwnsBL._SX679_.jpg"
    },
    {
      name:"Realme",
      category:"mobile",
      description:"realme narzo 50i (Carbon Black, 4GB RAM+64GB Storage) - with No Cost EMI/Additional Exchange Offers",
      image:"https://image01.realme.net/general/20220418/1650304819000.png"
    },
    {
      name:"Samsung",
      category:"mobile",
      description:"Samsung Galaxy M12 (Blue,4GB RAM, 64GB Storage) 6000 mAh with 8nm Processor | True 48 MP Quad Camera | 90Hz Refresh Rate",      
      image:"https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY606_.jpg"
    },
    {
      name:"Apple",
      category:"mobile",
      description:"Apple 9A Sport (Coral Green, 2GB RAM, 32GB Storage) | 2GHz Octa-core Helio G25 Processor | 5000 mAh Battery",
      image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8&w=1000&q=80"
    },
    {
      name:"Itel",
      category:"mobile",
      description:"Itel A31 ddddddd(Fantasy White, 6GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers",
      image:"https://4.imimg.com/data4/BB/RH/MY-15241145/multimedia-mobile-phone-500x500.jpg"
    },
    {
      name:"Nokia",
      category:"mobile",
      description:"Nokia narzo 50i (Carbon Black, 4GB RAM+64GB Storage) - with No Cost EMI/Additional Exchange Offers",
      image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-a736blgginu/gallery/in-galaxy-a73-5g-a736-sm-a736blgginu-thumb-531830956?$320_320_PNG$"
    },
    {
      name:"Lava",
      category:"mobile",
      description:"Lava Mobile M12 (Blue,4GB RAM, 64GB Storage) 6000 mAh with 8nm Processor | True 48 MP Quad Camera | 90Hz Refresh Rate",      
      image:"https://www.lavamobiles.com/images/card-smartphones.jpg"
    }
  ]
  res.render('index', {products,admin:false,user});
});

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
  res.render('user/login',{"loginErr":req.session.userLoginErr})
  req.session.userLoginErr=false
  }
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
 userSignup.doSignup(req.body).then((response)=>{
  console.log(response)
   //res.render("user/login")

  //  req.session.user=response.user
  //  req.session.loggedIn=true
   res.redirect('/login')
 })
})
router.post('/login',(req,res)=>{
  userSignup.doLogin(req.body).then((response)=>{
    if(response.status){
     
     
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.userLoginErr="Invalid username or password"
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})
module.exports = router;
