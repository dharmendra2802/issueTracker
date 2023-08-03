const mongoose =  require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
            type:String,
            required : true,
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{
            type:String,
            required : true,
    },
    labels : [{
        type:String
    }],
    bugs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }],
},{timestamps:true});

const Project = mongoose.model('Project',projectSchema);


module.exports = Project;