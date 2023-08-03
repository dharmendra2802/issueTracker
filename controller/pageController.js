const User = require('../models/user'); // data model
const Project = require('../models/project');
const Bug = require('../models/bug')

const bcrypt = require('bcrypt'); // hashing

// for main page
module.exports.main =async function(req,res)
{
    // finding user and populating its field project and same goes for project
    const user = await User.findById(req.user.id).populate('projects');
    const project = await Project.find({}).populate('authorId');

    return res.render('mainPage',{
        user:user,
        projects:project
    });
}

// for project page
module.exports.project = async function(req,res)
{    

    // getting id
    const id = req.query.id;
    // finding the sortby params if set else default will be created at
    let sortby = req.query.sortby || 'createdAt';
    // setting order 1 and if oldest select then -1 means decreasing
    let order = sortby == 'sortbyoldest' ? -1 : 1;
    // setting the correct value as in schema
    if(sortby == 'sortByOldest' || sortby == 'sortByNewest')
        sortby = 'createdAt';
    // getting searchby option else empty
    const searchBy = req.query.searchBy || '';
    // getting labels
    const labels = req.query.labels || [];
    // creating sort onj so we can directly pass it in the sort function
    const sortOptions = {};
    sortOptions[sortby] = order;

    try {
        // finding project
        const curPro = await Project.findById(id).populate('authorId')
        // finding bug with some filter like whether it has a particular expression
        let bugs = await Bug.find({
            projectId:id,
            name: { $regex: new RegExp(searchBy, 'i') },
        }).sort(sortOptions).populate('authorId')
        
        // if labels are searched then filter acc to it
        if (labels.length > 0) {
            bugs = bugs.filter(bug => bug.label.some(label => labels.includes(label)));
        }

        console.log(bugs);  
        return res.render('projectPage',{project:curPro,bugs:bugs});

    } catch (err) {
        console.log('error in finding project ',err)
        return res.redirect('back')
    }
}
