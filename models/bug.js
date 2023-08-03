const mongoose =  require('mongoose');

const bugSchema = new mongoose.Schema({
    name:{
            type:String,
            required : true,
    },
    authorId:{
        // ref to the user 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId:{
        //  ref to project of which the bug is part of 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    label:[{
        //  to store associated label
        type:String
    }],
    description:{
            type:String,
            required : true,
    }
},{timestamps:true});

const Bug = mongoose.model('Bug',bugSchema);


module.exports = Bug;