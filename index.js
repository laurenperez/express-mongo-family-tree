const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
mongoose.connect('mongodb://localhost/family-tree')


//EXAMPLE OF NEW DATA STRUCTURE//
let chris = new User({
  name: "Chris",
  email: "chris@chris.chris",
  meta: {
    age:27,
    website:"http://chris.chris"
  }
});


/////// CRUD WITH MONGOOSE AND MONGO DB ///////

app.get('/', function(req, res){

  ////CREATE (ONE) - there is not an option to create more than one
    User.create({name:'Becky', email:'becky@becky.becky'}, function(err, user){
      if (err) return console.log(err);
      console.log(user);
    });

    ////READ - FIND ALL
    User.find({}, function(err, users){
      if(err) return res.send(err);
      // then to say hello to all of them run a loop because users is an array of objects about each user
      for (let i = 0; i < users.length; i++ ){
        console.log(users[i].sayHello());
      }
    })

    ////READ - FIND ONE (who's name starts with a letter "less than" or before G in the alphabet) SEE MONGO DOCS TO GET MORE INFO ON CONDITIONALS
    User.findOne({name: {$lt: "G"}}, function(err, users){
      if (err) return res.send(err);
      res.send(users);
    })

    ////UPDATE - FIND ALL - ALL that meet our paramenter of name 'becky' and UPDATE it.
    User.update({name: 'becky'}, {meta: {age:24}}, function(err, user){
      if (err) console.log(err);
      res.send(user);
    });

    ////UPDATE - FIND ONE- FIRST INSTANCE that meets our paramenter of name 'becky' and UPDATE it.
    User.findOneAndUpdate({name: 'becky'}, {meta: {age:24}}, function(err, user){
      if (err) console.log(err);
      res.send(user);
    });

    ////REMOVE ALL - FIND ALL instances of 'becky' and REMOVE them from DB.
    User.remove({name: 'becky'}, function(err){
      if (err) console.log(err);
      console.log('Becky is gone now!')
    })

    ////REMOVE ONE - FIND FIRST instance of 'becky' and REMOVE them from DB.
    User.findOneAndRemove({name: 'becky'}, function(err){
      if (err) console.log(err);
      console.log('Becky is gone now!')
    })


});







app.listen(3000);
