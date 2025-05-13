const mongoose = require('mongoose');

const userSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please add a name'],
        },
        email:{
            type:String,
            required:[true,'Please add an email'],
            unique:true,
        },
        password:{
            type:String,
            required:[true,'Please add a password'],
        },
    },
    {
        timestamps:true,
    }
);

module.exports= mongoose.model('User',userSchema);
// This code defines a Mongoose schema for a user model in a Node.js application. The schema includes fields for the user's name, email, and password, with validation rules for each field. The timestamps option is enabled to automatically add createdAt and updatedAt fields to the documents. Finally, the schema is exported as a Mongoose model named 'User'.