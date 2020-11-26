var express = require("express");
var router = express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment   = require("../models/comment");
//var middleware= require("../middleware/index");


//comments new
router.get("/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    })
 ;
});

// comments create
router.post("/",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
                Comment.create(req.body.comment,function(err,comment){
                    if(err){
                        req.flash("error","something went wrong");
                        console.log(err);
                    }
                    else{
                        //add username and id to the comment
                        comment.author.id= req.user._id;
                        comment.author.username= req.user.username;

                       // console.log(req.user.username);
                        //save the commemt
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        req.flash("success","sucessfully added comment");
                        res.redirect(`/campgrounds/`+ campground._id);
                    }
                });
        }
    });
});

//comment edit route
router.get("/:comment_id/edit",checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
              res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
});

//Comments update
router.put("/:comments_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//comments destroy route
router.delete("/:comment_id",checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        {
            res.redirect("back");
        }
        else{
            req.flash("success","comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

}
function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err)
            {
                res.redirect("back");
            }
            else{
                // does user own th comment
                if(foundComment.author.id.equals(req.user._id)){
                        next();
                
                }else{
                    res.redirect("back");
                }
            }
        });
        } else{
            res.redirect("back");
        }
} 

module.exports =router;