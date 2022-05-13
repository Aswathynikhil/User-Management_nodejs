$(document).ready(function(){
    $("#signup-form").validate({
        errorClass:"err",
     rules:{
        name:{
            required:true,
            minlength:4,
            maxlength:15,
            namevalidation:true
        },
        place:{
           required:true
        },
        address:{
            required:true
         },
         phone:{
            required:true,
            minlength:10,
            maxlength:15
        },
        email:{
            required:true,
            email:true
        },

        password:{
            required:true,
            minlength:5,
            strongePassword:true
           
        },
        repassword:{
            required:true,
            equalTo:"#password"
        }
     },
     messages:{
         name:{
             required:"Please enter your name",
             minlength:"At least 4 characters required",
             maxlength:"Maximum 15 characters are allowed"
         },
         place:{
            required:"please enter your place"
         },
         address:{
            required:"please enter your address"
         },
         phone:{
            required:"Please enter your phone number",
            minlength:"Enter 10 numbers",
            maxlength:"Number should be less than or equal to 15 numbers"
           },
         email:{
             required:"Please enter your email id",
             email:"Enter a valid email"
         },
        //  password:"Please enter your password",
         repassword:{
             required:"confirm password",
             equalTo:"Password doesn't matches"
         }
     }
    })
    $.validator.addMethod("namevalidation", function(value, element) {
            return /^[A-Za-z]+$/.test(value);
    },
      "Sorry,only alphabets are allowed"
   );
   $.validator.addMethod("strongePassword", function(value,element) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[A-Z]/.test(value);
    },
    "The password must contain at least 1 number,1 lower case letter, and 1 upper case letter"
    ); 
  
})




