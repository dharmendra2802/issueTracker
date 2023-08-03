const mongoose =  require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
            type:String,
            required : true,
    },
    authorId:{
        // ref to user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{
            type:String,
            required : true,
    },
    labels : [{
        // array labels ass. with the project
        type:String
    }],
    bugs:[{
        //  ref to all the bug ass. wiht the project
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }],
},{timestamps:true});

const Project = mongoose.model('Project',projectSchema);


module.exports = Project;