const mongoose = require('mongoose')

main().catch(err=>{
    console.log("Error in MongoDB connection ",err);
    return;
})

async function main(req,res)
{
    await mongoose.connect('mongodb://127.0.0.1:27017/IssueTracker_DB');
    console.log("Connected to MongoDB");
    module.exports = mongoose.connection;
    
}