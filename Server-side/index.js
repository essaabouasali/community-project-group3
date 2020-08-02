const express = require('express');
const uuid = require('uuid')
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const storage = require('node-persist');

const server = express(); 
server.use(cors()); 
server.use(express.json()); 
server.use(bodyParser.json()); 
server.use(bodyParser.json({ type: 'application/json'})); 
server.use(bodyParser.text()); 
server.use(bodyParser.urlencoded({extended: true}));               
                                   


async function initStorage()
{

    await storage.init({dir:'./data'});

    // initiate the first data into the file
}

async function initServer()
{
    

    // code here
    server.post('/projects', async (req,res) =>{
        try{
        let key= uuid.v4();
        let id=key;
        let nameofsubmitter = req.body.nameofsubmitter.trim();
        let description = req.body.description.trim();
        let email = req.body.email.trim();
        let postcode = req.body.postcode.trim();
        let title = req.body.title.trim();
        let today = new Date();
        if(!isNaN(postcode) && (postcode >= 2000 && postcode <= 2599 || postcode >=2618 && postcode <= 2899))
        {
            if(isNaN(nameofsubmitter) && description.length <= 300 && description!=="" && title!=="")
            {
                //project 
                let project = {id:key,value:{title,description,nameofsubmitter,email,postcode,status:"pending",todayDate:today.toISOString().slice(0,10)}}
                await storage.setItem(`project-${key}`,project);
                res.json({status:200,data:project});
            }
            else{
                res.json({status:500,message:"please fill out the name, description and title correctly."});
            }
        }
        else{
            res.json({status:500,message:"please enter valid postcode (need to be in NSW)"});
        }
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });
    
    server.get('/projects', async (req,res) => {
        try{
            let projects = await storage.valuesWithKeyMatch(/project-/);
            res.json({status:200,data:projects});
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });

    server.post('/projects/pendding',async(req,res)=>{
        try{
            let projects = await storage.valuesWithKeyMatch(/project-/);
            let searchTerm = req.body.searchTerm.trim();
            let result = projects.filter(p => p.value.status === "pending").filter(p => p.value.title.toLowerCase().includes(searchTerm.toLowerCase()));
            res.json({status:200,data:result});
        }
        catch(error){
            res.json({status:500,message:error.message});
        }
    });
    server.post('/projects/pending',async(req,res)=>{
        try{
            let projects = await storage.valuesWithKeyMatch(/project-/);
            let searchTerm = req.body.searchTerm.trim();
            let result = projects.filter(p => p.value.status === "pending").filter(p => p.value.title.toLowerCase().includes(searchTerm.toLowerCase()));
            res.json({status:200,data:result});
        }
        catch(error){
            res.json({status:500,message:error.message});
        }
    });
    server.post('/projects/approved',async(req,res)=>{
        try{
            let projects = await storage.valuesWithKeyMatch(/project-/);
            let searchTerm = req.body.searchTerm.trim();
            let result = projects.filter(p => p.value.status === "approved").filter(p => p.value.title.toLowerCase().includes(searchTerm.toLowerCase()));
            res.json({status:200,data:result});
        }
        catch(error){
            res.json({status:500,message:error.message});
        }
    });
    server.post('/projects/rejected',async(req,res)=>{
        try{
            let projects = await storage.valuesWithKeyMatch(/project-/);
            let searchTerm = req.body.searchTerm.trim();
            let result = projects.filter(p => p.value.status === "rejected").filter(p => p.value.title.toLowerCase().includes(searchTerm.toLowerCase()));
            res.json({status:200,data:result});
        }
        catch(error){
            res.json({status:500,message:error.message});
        }
    });
    server.get('/projects/:id', async(req,res) =>{
        try{
            let key = req.params.id;
            let project = await storage.getItem(`project-${key}`);
            if(project == undefined)
            {
                res.json({status:500,message:"No Matching"});
            }
            else{
                res.json({status:200,data:project});
            }
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });

    server.put('/projects',async(req,res) =>{
        try{
            let key = req.body.id.trim();
            let project = await storage.getItem(`project-${key}`);
            if(project.value.status === 'pending')
            {
                let status = req.body.status.trim();
                project.value.status = status ;
                await storage.updateItem(`project-${key}`,project);
                if(project.value.status === "approved")
                {
                    let now = new Date();
                    let today = now.toISOString().slice(0,10);
                    let time = today + " " + now.toLocaleTimeString();
                    let approvedProject={id:key,votes:"0",comments:[],timeUpdated:time,details:project.value};
                    await storage.setItem(`projectApproved-${key}`,approvedProject);
                }
                res.json({status:200,data:project});
            }else{
                res.json({status:500,message:"this project has been already updated"});
            }
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });
    server.put("/approved-projects/Comments/:id", async (req, res) => 
    {
        try {
            let key = req.params.id;
            let project = await storage.getItem(`projectApproved-${key}`);
            let comment = req.body.comment;
            if (comment !== "") {
                let words = ["crikey", "fart", "silly", "dumb"];
                let bol = false;
                for(let i=0; i<words.length;i++)
                 {
                    if (req.body.comment.toLowerCase().includes(words[i])) {
                        bol = true;
                        break;
                    }
                    else {
                        bol = false;
                    }
                 }

                if (bol) {
                    res.json({ status: 500, message: "error." })
                }
                else {
                    project.comments.push(comment);

                    await storage.updateItem(`projectApproved-${key}`, project);
                    res.json({ status: 200, data: project });

                }

            }
            else {
                res.json({ status: 500, message: "you should add comments" });
            }
        }
        catch (error) {
            res.json({ status: 500, message: error.message });
        }
    });
    server.put("/approved-projects/delete-comment/:id",async(req,res)=>{
        try{
            let key = req.params.id;
            let project = await storage.getItem(`projectApproved-${key}`);
            let comment = req.body.comment;
            project.comments = project.comments.filter(c => c!==comment);
            await storage.updateItem(`projectApproved-${key}`,project);
            res.json({status: 200, data:project});
        }
        catch(error)
        {
            res.json({ status: 500, message: error.message });
        }
    })
    server.get('/approved-projects',async(req,res)=>{
        try{
            let projects = await storage.valuesWithKeyMatch(/projectApproved-/);
            projects = projects.sort((a,b)=>{
               return Number(b.votes) - Number(a.votes) 
            });
            res.json({status:200,data:projects});
        }
        catch(error)
        {
            res.json({status:500,message:error.message})
        }
        
    });
    server.get('/approved-projects/:id',async(req,res)=>{
        try{
            let key = req.params.id;
            let project = await storage.getItem(`projectApproved-${key}`);
            res.json({status:200,data:project});
        }
        catch(error)
        {
            res.json({status:500,message:error.message})
        }
        
    });

    server.put("/approved-projects/:id",async(req,res)=>{
        try{
            let key = req.params.id;
            let project = await storage.getItem(`projectApproved-${key}`);
            
            project.votes++;
            await storage.updateItem(`projectApproved-${key}`,project);
            res.json({status:200,data:project});
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });
    server.post("/public-can-vote",async(req,res)=>{
        try{
            let canVote=req.body.canVote;
            await storage.setItem("vote-1",{canVote});
            res.json({data:{canVote},status:200})
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });
    server.get("/public-can-vote",async(req,res)=>{
        try{
            let result= await storage.getItem("vote-1");
            res.json({data:result,status:200})
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });
    server.put("/public-can-vote",async(req,res)=>{
        try{
            let result = await storage.getItem("vote-1");
            (result.canVote > 0)? result.canVote = 0 : result.canVote = 1 ;
            await storage.updateItem("vote-1",result);
            res.json({data:result,status:200});
        }
        catch(error)
        {
            res.json({status:500,message:error.message});
        }
    });
    const PORT = 4000; 
    server.listen(PORT,()=>{
        console.log('The server is up and running and listening on port ' + PORT); 
    });

}

initStorage().then(()=> initServer());
module.exports = server;

 
