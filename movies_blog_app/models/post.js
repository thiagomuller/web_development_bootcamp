var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
    Title: String,
    Image:  String,
    Year: String,
    Director: String,
    Writers: String,
    Actors: String,
    Plot: String,
    imdbRating: Number,
    Rating: Object,
    comments : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
        }
    ]
});


var Post = mongoose.model("Post" , postSchema);
module.exports = Post