const index = (req,res)=> {
    console.log("project"); 
    res.send("Project Routes Get")
}

const projects = (req,res)=> {
    console.log("project"); 
    res.send("Project Routes Post")
}


export {projects, index}