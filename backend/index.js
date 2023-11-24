const express = require('express');
const cors = require('cors');
require('./db/config');
const connectdb = require('./db/connect');
const Product = require('./db/product');
const app =express();
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());

app.post('/add-product', verifyToken, async (req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})
app.post('/register', async (req, resp)=>{
    let users = new connectdb(req.body);
    let result = await users.save();
    // Here we were sending the exact result into the response which is not a good practice so we remove password data from response
    // in find operation it is easy to remove any field but in save we have to do following task.
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn: "2h"}, (err,token)=>{
        if(err)
        {
            resp.send({result: "Something went wrong please try again after sometime"});
        }
        resp.send({result,auth:token});
    })
    //resp.send(result);
})

//login api
app.post('/login', async (req,resp)=>{
    if(req.body.email && req.body.password)
    {
        let user = await connectdb.findOne(req.body).select("-password");//Here we remove password data from api enter through login page while searching the user from database
        if(user)
        {
            Jwt.sign({user}, jwtKey, {expiresIn: "2h"}, (err,token)=>{
                if(err)
                {
                    resp.send({result: "Something went wrong please try again after sometime"});
                }
                resp.send({user,auth:token});
            })
            //resp.send(user);
        }
        else{
            resp.send({result:"User Not Found"});
        }
    }
    else{
        resp.send({result:"User Not Found"});
    }
    
})

app.get('/products', verifyToken, async (req,resp)=>{
    let products = await Product.find();
    resp.send(products);
})

app.delete('/product/:id', verifyToken, async (req,resp)=>{
    let result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.get('/product/:id', verifyToken, async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    resp.send(result);
})

app.put('/product/:id', verifyToken, async (req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set : req.body}
    )
    resp.send(result);
})

app.get('/search/:key', verifyToken, async (req,resp)=>{
    let result = await Product.find({
        "$or": [
            {name : {$regex : req.params.key}},
            {company: {$regex : req.params.key}},
            {category: {$regex : req.params.key}}
        ]
    })
    resp.send(result);
});

//MiddleWare to verify token... The difference between middleware and normal function is that middle ware always take three param req,resp,next
function verifyToken(req,resp,next){
    let token = req.headers['authorization'];
    if(token)
    {
        Jwt.verify(token, jwtKey, (err,valid)=>{
            if(err)
            {
                resp.status(401).send({result: "token is invalid"});
            }
            else{
                next();// it is compulsory to call otherwise it will stuck while running
            }
        })
    }
    else{
        resp.status(403).send({result:"please add token in header"});
    }
    
}

app.listen(5000);

//cors issue is occured when we try to fetch api from frontend like fetching from react and it will show error (cors) error because due to running of application
//at different prot to the port of api both api and app have different port so this problem occurs(This is a backend problem).

// So to solve this we have to install corse package (npm i cors).

//In Last we also use JWT token for data security and authentication (JWT - JsonWebToken) for this we have to install package (npm i jsonwebtoken).
//JWT - It helps to provide security from data stealing bcz we use api and if attacker get access to api then can get data from database.
// So it generates token and it is given to the user wo login or register bcz they are authorized and every token have expiry and only that authorise user can access data.
