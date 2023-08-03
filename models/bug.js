const mongoose =  require('mongoose');

const bugSchema = new mongoose.Schema({
    name:{
            type:String,
            required : true,
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    label:[{
        type:String
    }],
    description:{
            type:String,
            required : true,
    }
},{timestamps:true});

const Bug = mongoose.model('Bug',bugSchema);


module.exports = Bug;