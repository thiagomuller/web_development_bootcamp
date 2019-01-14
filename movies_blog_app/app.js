var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressSanitizer = require('express-sanitizer'),
    request = require('request'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Post = require('./models/post'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    result = '',
    innerResult = '';
    


mongoose.connect('mongodb://localhost:/movies_blog_app', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(expressSanitizer());



app.use(session({
    secret : "Jack is the cutest dog in this world",
    resave : false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res , next){
   res.locals.currentUser = req.user;
   next();
});


app.get('/' , function(req , res){
  res.redirect('/posts');
});


//INDEX ROUTE
app.get("/posts" , function(req , res){
   console.log("Just received a request on landing page!");
   Post.find({}, function(err , posts){
      if(err){
          console.log(err);
      } 
      else{
          res.render('index', {
              posts: posts
          });
      }
   });
    
});

//NEW ROUTE
app.get("/posts/new", function(req , res){
    console.log("Just received a request on new route");
    res.render("new", {
       result: result
   }); 
   result = ''
});

//SHOW ROUTE
app.get("/posts/:id" , function(req , res){
    console.log("Just received a request on show page!");
    Post.findById(req.params.id).populate('comments').exec(function(err , post){
        if(err){
            console.log(err);
        }
        else{
            res.render('show' , {
               post : post  
            });
        }
    })
});

//FIND ROUTE
app.post('/find' , function(req , res){
    console.log("Just received a request on find route!");
    var searchTerm = req.body.searchTerm;
    var urlString = 'http://www.omdbapi.com/?apikey=thewdb&s='
    
    urlString += searchTerm;
    
    request(urlString , function(error , response , body){
       if(!error && response.statusCode === 200){
           result = JSON.parse(body);
           result.Search.forEach(function(movie){
              var id = movie.imdbID;
              urlString = 'http://www.omdbapi.com/?apikey=thewdb&i='
              
              urlString += id;
              
              request(urlString, function(error , response , body){
                 if(!error && response.statusCode === 200){
                     innerResult = JSON.parse(body);
                     movie["Plot"] = innerResult.Plot;
                 }  
              });
           });
       }
    });
    res.redirect('/posts/new');
});

//CREATE ROUTE
app.post('/posts', function(req , res){
    console.log("Just received a request on create route!");
    var id = req.body.movieID;
    var urlString = 'http://www.omdbapi.com/?apikey=thewdb&i=';
    
    urlString += id;
    
    
    request(urlString , function(error , response , body){
       if(!error && response.statusCode === 200){
            innerResult = JSON.parse(body);
            var postObject = {};
            if(innerResult){
                if(innerResult.Ratings[0]){
                    postObject["The Internet Movie Database"] = innerResult.Ratings[0]
                }
                else{
                    postObject["The Internet Movie Database"] = "There's no ratings for this movie/serie :)"
                }
                
                if(innerResult.Ratings[1]){
                    postObject["Rotten Tomatoes"] = innerResult.Ratings[1]
                }
                else{
                    postObject["Rotten Tomatoes"] = "There's no ratings for this movie/serie :)"
                }
                
                if(innerResult.Ratings[2]){
                    postObject["Metacritic"] = innerResult.Ratings[2]
                }
                else{
                    postObject["Metacritic"] = "There's no ratings for this movie/serie :)"
                }
            }


            
            Post.create({
              Title : innerResult.Title, 
              Image : innerResult.Poster,
              Year : innerResult.Year,
              Director : innerResult.Director,
              Writers : innerResult.Writer,
              Actors : innerResult.Actors,
              Plot : innerResult.Plot,
              imdbRating : innerResult.imdbRating,
              Rating : postObject
              
          });
       } 
    });
    res.redirect('/posts');
});

//EDIT ROUTE
app.get('/posts/:id/edit' , function(req , res){
    console.log("Just received a request on edit route!");
    Post.findById(req.params.id ,  function(err , foundedPost){
       if(err){
           console.log(err);
       } 
       else{
           res.render('edit', {
              post : foundedPost 
           });
       }
    });
});

//UPDATE ROUTE
app.put('/posts/:id', function(req , res){
    console.log("Just received a request on update route!");
    var editObject = req.body.post;
    var updateObject = {
        Title : editObject.Title,
        Image : editObject.Image,
        Year : editObject.Year,
        Director : editObject.Director,
        Writers : editObject.Writers,
        Actors : editObject.Actors,
        Plot : editObject.Plot,
        imdbRating : editObject.imdbRating,
        Rating : {
            "The Internet Movie Database" : editObject.imbRating,
            "Rotten Tomatoes" : editObject.rtRating,
            "Metacritic" : editObject.metacriticRating
            
            }
        
    }
    
    Post.findByIdAndUpdate(req.params.id , updateObject, function(err , updatedObject){
       if(err){
           res.redirect('/posts');
       } 
       else{
           res.redirect('/posts/' + req.params.id);
       }
    });
    
});

//DELETE ROUTE
app.delete('/posts/:id/', function(req , res){
    console.log('Just received a request on delete route');
    Post.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect('/posts');
        }
        else{
            res.redirect('/posts');
        }
    })
});


//CREATE COMMENT
app.post('/posts/:id/comment/new', function(req , res){
    
    var user = req.user.username;
    var com = req.body.comment;    
   
   //CREATE NEW COMMENT ON DATABASE
   Comment.create({
      text : com.text,
      author: user
   }, function(err , comment){
       if(err){
           console.log(err);
       }
       else{
           //EMBEDDING COMMENT TO POST
           Post.findById(req.params.id , function(err , foundPost){
               if(err){
                   console.log("Error founding the Comment by its ID");
               }
               else{
                  foundPost.comments.push(comment);
                   
                  foundPost.save(function(err , sucess){
                      if(err){
                          console.log("Error embbeding the comment to post!");
                      }
                      else{
                          res.redirect('/posts/' + req.params.id);
                      }
                  });
              }
           });
           //EMBEDDING COMMENT TO USER 
           User.findOne({username : user}, function(err, foundUser){
              if(err){
                  console.log("Didn't find that user on db");
              } 
              else{
                  foundUser.comments.push(comment)
                  
                  foundUser.save(function(err, success){
                     if(err){
                         console.log("Error embbeding the comment to user!")
                     }
                     else{
                         res.redirect('/posts/' + req.params.id);
                     }
                  });
              }
           });
       }
   });
    
});





//REGISTER ROUTE

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/posts"); 
        });
    });
});


// LOGIN ROUTE

app.post('/login',  passport.authenticate('local', {
    successRedirect: 'posts',
    failureRedirect: '/posts/new'
}), function(req, res){
});


app.get('/logout', function(req, res){
   req.logout();
   res.redirect('/posts');
});

app.listen(process.env.PORT, process.env.IP, function(req , res){
   console.log("Server is up!!!"); 
});