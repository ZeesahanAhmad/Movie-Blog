// Register and Login code will go here
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jsonwt=require('jsonwebtoken');
var RegisterModel=require('../../Modal/RegistrationSchema');
const key=require('../../Setup/Url').secreteKey;

//@router:api/auth/signup
//@method:post
//@description:route for signup
//@access:public

router.post('/signup',(req,res)=>{
    RegisterModel.findOne({email:req.body.email})
    .then(register=>{
        if(register){
            res.json({message:'This email already exist !'})
        }
        else{
            const Userinfo={};
            Userinfo.name=req.body.name,
            Userinfo.email=req.body.email,
            Userinfo.gender=req.body.gender,
            Userinfo.password=req.body.password
            //code to encrypt password.
            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(Userinfo.password, salt, (err, hash)=> {
                
                if(err) throw err;
                Userinfo.password=hash;

            new RegisterModel(Userinfo)
            .save()
            .then(register=>{
                res.json(register);
            })
            .catch(err=>console.log(err));
                
        });
    });
            
        }

    })
    .catch(err=>console.log(err));



});


//@router:api/auth/login
//@method:post
//@description:route for user login
//@access:public

router.post('/login',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;

    RegisterModel.findOne({email:email})
    .then((register)=>{
        if(!register){
            res.status(400).json({loginError:"It looks like you don't have an account !"});
        }
        else{
            bcrypt.compare(password, register.password)
            .then((isMatched) => {
                var credential={
                    email:register.email,
                    id:register.id
                }

            //    code to generate token 
               var token=jsonwt.sign(credential, key, { expiresIn: '1h' });
               res.json({token:"Bearer "+token});

              })
             .catch(err=>console.log(err));

        }
    })
    .catch(err=>console.log(err));





})






// export router to index file
module.exports=router;