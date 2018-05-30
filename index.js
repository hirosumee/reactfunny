const express = require('express');
const app = express();
const server = require('http').createServer(app);
var data=[{title:"a",content:"a"},{title:"b",content:"b"},{title:"c",content:"c"},
{title:"ad",content:"ad"},{title:"ad",content:"ae"},{title:"aa",content:"aa"}];
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://firstreact.epizy.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/list',(req,res)=>{
    res.send(data);
});
app.post('/edit',(req,res)=>{
    var {title,content,index} = req.body;
    if(index>=0&&index<data.length){
        data[index]={title,content};
    }
    res.status(200).send({ok:true});
});
app.post('/remove',(req,res)=>{
    let {index} = req.body;
    if(index>=0&&index<data.length){
        data.splice(index,1);
        
    }
    res.send(data);
});
app.post('/add',(req,res)=>{
    data.push({title:"give me a title",content:"give me a content"});
    res.status(200).end();
})

server.listen(process.env.PORT||3000,()=>{console.log('server is listening')})