// imported necessary module
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Schema for Movie addition of movie detail
const MovieSchema=new Schema({
    movieName:{
        type:String,
        require:true
    },
    director:{
        type:String,
        require:true
    },
    producer:{
        type:String,
        require:true
    },
    cast:{
        type:[String],
        require:true
    },
    imdb:{
        type:String
    }

});
// modal for MovieSchema

module.exports=MovieModel=mongoose.model('myMovieSchema',MovieSchema)

