const User = require('../models/user');
const Project = require('../models/project');
const Bug = require('../models/bug');


module.exports.addProject = async function(req,res)
{

    // console.log(req.body)
    try {
        // finding user
        const user = await User.findById(req.body.authorId);

        //adding project data
        const project = await Project.create(req.body);
        // adding project in user
        user.projects.push(project);
        await user.save();

        console.log("project add successfully")
        return res.redirect('back');

    } catch (err) {
        console.log("Error in adding project ",err);
        return res.redirect('back')
    }
    
}

// add a bug
module.exports.addBug = async function(req,res)
{

    // console.log(req.body)
    try {
        // finding project
        const project = await Project.findById(req.body.projectId);
        
        req.body.label = !Array.isArray(req.body.label) ? [req.body.label] : req.body.label;
        //adding bug data
        const bug = await Bug.create(req.body);
        // adding project in user

        project.bugs.push(bug);
        for (label of req.body.label) {
            if (!project.labels.includes(label)) {
              project.labels.push(label);
            }
        }
        await project.save();

        console.log("bug add successfully")
        return res.redirect('back');

    } catch (err) {
        console.log("Error in adding bug ",err);
        return res.redirect('back')
    }
    
}