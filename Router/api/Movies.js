const express=require('express');
const router=express.Router();
const passport=require('passport');

// Movie model is imported
const MovieModel=require('../../Modal/MovieSchema');


//@router:api/movie/add
//@method:post
//@description:route for addition of movie in the list
//@access:private

// code for addition of movie in list

router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
    MovieModel.findOne({movieName:req.body.movieName})
    .then(movie=>{
        if(movie){
            res.json({error:"This movie already exist in the list"});

        }
        else{
            const movieInfo={};
            movieInfo.movieName=req.body.movieName;
            movieInfo.director=req.body.director;
            movieInfo.producer=req.body.producer;
            movieInfo.cast=req.body.cast.split(",");
            movieInfo.imdb=req.body.imdb;

            new MovieModel(movieInfo)
            .save()
            .then(movie=>{
                res.json(movie);
            })
            .catch(err=>console.log(err));

        }

    })
    .catch(err=>console.log("error in movie addition :"+err));


});

//@router:api/movie/delete
//@method:delete
//@description:route for deletion of movie from the list
//@access:private

// code to delete movie in list

router.delete('/delete',passport.authenticate('jwt',{session:false}),(req,res)=>{
  
    MovieModel.deleteOne({movieName:req.body.movieName})
    .then(()=>{
        res.json({message:"Movie deleted successfuly !"});
    })
    .catch((err)=>console.log("Error in movie deletion :"+ err));


});

//@router:api/movie/search/:name
//@method:get
//@description:route for searching movie from the list
//@access:public

// code to get serch movie from list

router.get('/search/:name',(req,res)=>{
    MovieModel.findOne({movieName:req.params.name})
    .then((movie)=>{
        if(!movie){
            res.status(404).json({Error:req.params.name+" not found"});
        }else{
            res.json(movie);
        }
    })
    .catch((err)=>console.log('error in getting movie from list '+err));
});





//@router:api/movie/all
//@method:get
//@description:route for getting all movie from the list
//@access:public

// code to get all movie in list

router.get('/all',(req,res)=>{
    MovieModel.find()
    .then((movie)=>{
        if(!movie){
            res.status(404).json({Error:'no movie was found'});
        }else{
            res.json(movie);
        }
    })
    .catch((err)=>console.log('error in getting movie from list '+err));
});





module.exports=router;




