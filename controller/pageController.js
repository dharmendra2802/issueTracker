const User = require('../models/user'); // data model
const Project = require('../models/project');
const Bug = require('../models/bug')

const bcrypt = require('bcrypt'); // hashing

// for main page
module.exports.main =async function(req,res)
{
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

    const id = req.query.id;
    let sortby = req.query.sortby || 'createdAt';
    let order = sortby == 'sortbyoldest' ? -1 : 1;
    if(sortby == 'sortByOldest' || sortby == 'sortByNewest')
        sortby = 'createdAt';
    const searchBy = req.query.searchBy || '';
    const labels = req.query.labels || [];
    const sortOptions = {};
    sortOptions[sortby] = order;

    try {
        const curPro = await Project.findById(id).populate('authorId')
        
        let bugs = await Bug.find({
            projectId:id,
            name: { $regex: new RegExp(searchBy, 'i') },
        }).sort(sortOptions).populate('authorId')
        
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
