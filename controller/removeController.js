const User = require('../models/user');
const Project = require('../models/project');
const Bug = require('../models/bug');

// to remove bug
module.exports.removeBug = async function(req,res)
{
    try {
        // getting bug id
        const bugid = req.params.id

        const bug =  await Bug.findById(bugid);
        const proID = bug.projectId;
        const project = await Project.findById(proID);

        //  removing from project bug array
        project.bugs.pull(bugid);
        await project.save()
        // deleting bug
        await bug.deleteOne();
        console.log('bug deleted')
        return res.redirect('back');

    } catch (err) {
        console.log('error in removing the bug' , err)
        return res.redirect('back');
    }
}

// removing project
module.exports.removeProject = async function(req,res)
{
    try {
        // getting pro id 
        const projectId = req.params.id
        const project = await Project.findById(projectId).populate('authorId');
        const user = await User.findById(project.authorId.id);
        const bugs = project.bugs

        // looping through the bug array of project and deleting
        for( let bug of bugs)
        {
            await Bug.findByIdAndDelete(bug._id);
        }
        user.projects.pull(projectId);
        await project.deleteOne();       
        console.log("project deleted")
        if(req.xhr)
            return res.status(200).json({message:'deleted'})

        return res.redirect('back');

    } catch (err) {
        console.log("error in deleting project",err)
        
        if(req.xhr)
            return res.status(200).json({message:'deleted'})

        return res.redirect('back');
    }
}