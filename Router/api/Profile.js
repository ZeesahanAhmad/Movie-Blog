const express=require('express');
const router=express.Router();
const passport=require('passport');
const mongoose=require('mongoose');


//@router:api/profile
//@method:get
//@desc:route for player profile
//@access:private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
     // Basic information of player
     res.json(req.user);
});


module.exports=router;

