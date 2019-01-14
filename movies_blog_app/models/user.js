var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
    

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }    
    ]
    
});
    
userSchema.plugin(passportLocalMongoose);
    
var User = mongoose.model('User' , userSchema);
    
module.exports = User;




