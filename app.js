const { populate } = require("./models/comment");

var express     =  require("express"),
    app         =  express(),

    bodyParser  =  require("body-parser"),
    mongoose    =  require("mongoose"),
    passport    =    require("passport"),
    LocalStrategy =require("passport-local"),
    flash      = require("connect-flash"),
    Campground   =require("./models/campground"),
    User         = require("./models/user");
     Comment   = require("./models/comment"),
     methodOverride = require("method-override"),

     seedDB    = require("./seeds")

//requiring routes
var commentRoutes      = require("./routes/comments");
    campgroundRoutes   = require("./routes/campgrounds");
    indexRoutes        = require("./routes/index")

//seed the database
//seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_camp');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//  passport configuartion
app.use(require("express-session")({
    secret:"duke is cute",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app .use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error =  req.flash("error");
    res.locals.success =  req.flash("success");
    next();
});


app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);



app.get("/home",function(req,res){
    res.render('home');
});


app.listen(3000,function(){
    console.log("yelp camp has started");
});


// var campgroundSchema =new mongoose.Schema({
//       name:String,
//       image:String,
//       description:String
// });
// var Campground=mongoose.model("Campground",campgroundSchema);


// Campground.create({name:"salmon creek",
//                   image:"https://images.unsplash.com/photo-1592960753504-e40dc9c13399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//                   description:"Beautiful Place with nice spots"}
//                   ,function(err,Campground){
//                       if(err){
//                           console.log(err);
//                       }else{
//                           console.log("Newly created campground");
//                           console.log(Campground);
//                       }
//                    });


// var campgrounds=[
//     {name:"salmon creek",image:"https://tse1.mm.bing.net/th?id=OIP.wGeb5p2_9-fcOVZb56Ce_wHaE4&pid=Api&P=0&w=235&h=156"},
//     {name:"granite hill",image:"https://tse3.mm.bing.net/th?id=OIP.CWqqakoWLX4-gwhbWdRuGAHaFH&pid=Api&P=0&w=227&h=158"},
//     {name:"Mountains goat rest",image:"https://tse4.mm.bing.net/th?id=OIP.IQgyefD4qkVCKRTxDaThHwHaE8&pid=Api&P=0&w=246&h=165"}
// ];

// app.get("/",function(req,res){
//     res.render("landing");
// });

// app.get("/campgrounds",function(req,res){
//     Campground.find({},function(err,allCampgrounds){
//         if(err){
//             console.log(err);
//         }
//         else{
//              res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
//              }
//     });

// });

// app.get("/campgrounds/new",function(req,res){
   
//      res.render("campgrounds/new");

// });

// app.post("/campgrounds",function(req,res){
//     var name=req.body.name;
//      var image=req.body.image;
//      var desc=req.body.description;
//      var newcampground={name:name ,image:image,description:desc}
//     // campgrounds.push(newcampground);
     
//     Campground.create(newcampground,function(err,newlycreated){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.redirect("/campgrounds")
//         }
//     });
// });

// app.get("/campgrounds/:id",function(req,res){
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(foundCampground)
//         res.render("campgrounds/show",{campground: foundCampground});
//     }
//     });
// });

//==========================================
//comments route
//==========================================


// app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
//     Campground.findById(req.params.id,function(err,campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.render("comments/new",{campground:campground});
//         }
//     })
//  ;
// });

// app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
//     Campground.findById(req.params.id,function(err,campground){
//         if(err){
//             console.log(err);
//             res.redirect("/campgrounds");
//         }
//         else{
//                 Comment.create(req.body.comment,function(err,comment){
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         campground.comments.push(comment);
//                         campground.save();
//                         res.redirect(`/campgrounds/`+ campground._id);
//                     }
//                 });
//         }
//     });
// });

//===========================================================
//Auth route
//===========================================================
//show register form

// app.get("/register",function(req,res){
//     res.render("register");
// });
// //handle sign up logic

// app.post("/register",function(req,res){
//     var newUser = new User({username:req.body.username});
//     User.register(newUser,req.body.password,function(err,user){
//     if(err)
//     {
//         console.log(err);
//         return res.render("register");
//     }
//     passport.authenticate("local")(req,res,function(){
//         res.redirect("/campgrounds");
//        });
//     });
// });

// //login form
// app.get("/login",function(req,res){
//     res.render("login");
// });

// app.post("/login",passport.authenticate("local",
//         {
//             successRedirect:"/campgrounds",
//             failureRedirect:"/login"
//         }),
//         function(req,res){
    
// });

// //logout
// app.get("/logout",function(req,res){
//     req.logout();
//     res.redirect("/campgrounds");
// });

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");

// }
