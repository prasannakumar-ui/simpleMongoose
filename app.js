//express part (server)
const express=require('express');
const app=express();
app.use(express.json());// Allow json data
//mongoose part (database)
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
 mongoose.connect('mongodb://127.0.0.1:27017/cd',{ useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false })
 .then(()=>console.log('Database is connected'))
 .catch((error)=>console.log(error))
//mongoose in database in store a document(model),Schema(structure like Allow with type values)
 const ListSchema=new mongoose.Schema({
     title:{
         type:String,
         trim:true,
         minlength:3
     }
 });
 const List=mongoose.model('List',ListSchema);// List is document in database
// server routers (curd)
app.get('/lists',(req,res)=>{
    List.find({})
    .then(lists=>res.send(lists))
    .catch((error)=>console.log(error))
});

app.post('/lists',(req,res)=>{
    (new List({'title':req.body.title}))
    .save()
    .then(list=>res.send(list))
    .catch((error)=>console.log(error));
});

app.get('/lists/:listId',(req,res)=>{
    List.find({'_id':req.params.listId})
    .then(list=>res.send(list))
    .catch((error)=>console.log(error));
});

app.patch('/lists/:listId',(req,res)=>{
    List.findOneAndUpdate({'_id':req.params.listId},{$set:req.body})
    .then(list=>res.send(list))
    .catch((error)=>console.log(error));
});

app.delete('/lists/:listId',(req,res)=>{
    List.findByIdAndDelete(req.params.listId)
    .then(list=>res.send(list))
    .catch((error)=>console.log(error));
  });

app.listen(3000,()=>console.log('server is connected on port 3000'));// listen is connect to server