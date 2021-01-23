var express        =require("express"),
     app           = express(),
     passport      = require("passport"),
     LocalStrategy = require("passport-local");
     bodyParser    = require("body-parser"),
     Campground    = require('./models/campground'),
     seedsDB       = require("./seeds");
     Comment       = require("./models/comment"),
     methodOverride = require("method-override"),
     User          = require("./models/user");
const mongoose = require("mongoose");
const { authenticate } = require("passport");
const seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

//seedDB(); //seed the data base[start fresh]
mongoose.connect('mongodb://localhost:27017/YelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));
    

app.use(bodyParser .urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

///SCHEMA SETUP////

// Campground.create({
//     name:'Darjeeling',
//     image:"/images/image2.jpeg",
//     description: "The fabled queen of the mountains!!!"
// },function(err,camp){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(camp);
//     }
// })


var campgrounds =[
    {name:'Lanka Para', image:"/images/hendrik-cornelissen-x59BNivBcQ8-unsplash.jpg"},
    {name:'Darjeeling', image:"/images/image2.jpeg"},
    {name: 'Kalimpong', image:"/images/image3.jpeg"},
    {name:'Lanka Para', image:"/images/hendrik-cornelissen-x59BNivBcQ8-unsplash.jpg"},
    {name:'Darjeeling', image:"/images/image2.jpeg"},
    {name: 'Kalimpong', image:"/images/image3.jpeg"},
    {name:'Lanka Para', image:"/images/hendrik-cornelissen-x59BNivBcQ8-unsplash.jpg"},
    {name:'Darjeeling', image:"/images/image2.jpeg"},
    {name: 'Kalimpong', image:"/images/image3.jpeg"}


]
app.use(require("express-session")({
    resave: false,
    secret: "Abhirup Deb has a very good memory",
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    next();
})

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000,function(){
    console.log("The Server is Listening!!");
}) 