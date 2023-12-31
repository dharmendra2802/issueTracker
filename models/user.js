const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
            type:String,
            required : true,
    },
    email:{
        type:String,
        required : true,
    },
    password:{
            type:String,
            required : true,
    },
    projects:[{
        // array of all the project created by the user
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }]
},{timestamps:true});

const User = mongoose.model('User',userSchema);


module.exports = User;