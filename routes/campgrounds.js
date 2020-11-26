var express = require("express");
var router = express.Router();
var Campground =require("../models/campground");
const campground = require("../models/campground");
const { route } = require("./comments");
//var middleware= require("../middleware/index");

//INDEX- show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
             res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
             }
    });

});

//NEW- show form to create new campground
router.get("/new",isLoggedIn,function(req,res){
   
     res.render("campgrounds/new");
});


//CREATE -add new campground to db
router.post("/",isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
     var image=req.body.image;
     var desc=req.body.description;
     var author={
         id:req.user._id,
         username: req.user.username
     }
     var newcampground={name:name ,price:price,image:image,description:desc,author:author}
    // campgrounds.push(newcampground);
     
    Campground.create(newcampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds")
        }
    });
});

//SHOW -show more info about one campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err){
        console.log(err);
    }
    else{
        console.log(foundCampground)
        res.render("campgrounds/show",{campground: foundCampground});
    }
    });
});

//EDIT campground route
router.get("/:id/edit",checkCampgroundOwnership,function(req,res){
    //is user logged in
        Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
        });
});


//UPDATE Campground route
router.put("/:id",checkCampgroundOwnership,function(req,res){
    //find and update the campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,UpdatedCampgrounds){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});




//DESTROY campground route
router.delete("/:id",checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});



//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");

}
function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err)
            {
                req.flash("error","campground not found");
                res.redirect("back");
            }
            else{
                // does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                        next();
                
                }else{
                    req.flash("error","you don't have the permission to do that!");
                    res.redirect("back");
                }
            }
        });
        } else{
            res.redirect("back");
        }
} 



module.exports=router;