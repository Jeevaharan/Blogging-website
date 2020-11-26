var mongoose= require("mongoose");
var Campground= require("./models/campground"); 
var Comment= require("./models/comment");

var data=[
    {
        name:"clouds rest",
        image:"https://tse1.mm.bing.net/th?id=OIP.wGeb5p2_9-fcOVZb56Ce_wHaE4&pid=Api&P=0&w=235&h=156",
        description:"Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) is spent outdoors distinguishes camping it from day-tripping, picnicking, and other similarly short-term recreational activities.[citation needed]Luxury may be an element, as in early 20th century African safaris, but including accommodations in fully equipped fixed structures such as high-end sporting camps under the banner of camping blurs the line.[citation needed]Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew in popularity among other socioeconomic classes. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
    },
    {
        name:"mountain top",
        image:"https://tse3.mm.bing.net/th?id=OIP.CWqqakoWLX4-gwhbWdRuGAHaFH&pid=Api&P=0&w=227&h=158",
        description:"Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) is spent outdoors distinguishes camping it from day-tripping, picnicking, and other similarly short-term recreational activities.[citation needed]Luxury may be an element, as in early 20th century African safaris, but including accommodations in fully equipped fixed structures such as high-end sporting camps under the banner of camping blurs the line.[citation needed]Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew in popularity among other socioeconomic classes. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
    }
] 



function seedDB(){
  //remove all campgrounds
    Campground.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        console.log("removed");
        // Comment.remove({},function(err){
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //  console.log("removed comments!");
        
   //add a few campgrounds     
//     data.forEach(function(seed){
//         Campground.create(seed,function(err,campground){
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("added a new campground");
//              //add a few comments
//              Comment.create(
//             {
//                  text:"",
//                  author:""
//             },function(err,comment){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     campground.comments.push(comment);
//                     campground.save();
//                     console.log("created a comment");
//                 }
//             });
            
      
    
//         }
//     });

//    });

  });
    }



module.exports=seedDB;