$(document).ready(function(){
    $("#createUserForm").validate({
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
           }
        }
    })
})