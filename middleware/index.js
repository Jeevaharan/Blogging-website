//all the middleware
var middlewareObj={};
var Campground =require("../models/campground");
var Comment    = require("../models/comment");

middlewareObj.checkCampgroundOwnership=function(req,res,next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err,foundCampground){
                if(err)
                {
                    res.redirect("back");
                }
                else{
                    // does user own th campground
                    if(foundCampground.author.id.equals(req.user._id)){
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

    middleware.checkCommentOwnership=function(req,res,next){
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

middleware.isLoggedIn=function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    
}

module.exports=middlewareObj;