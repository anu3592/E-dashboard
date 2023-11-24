import React from "react";
import {useParams, useNavigate} from 'react-router-dom';
const UpdateProduct = ()=>{
    const [name,setName] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setComapny] = React.useState("");
    const param = useParams();
    const navigate = useNavigate();

    React.useEffect(()=>{
        getUpdate();
    },[])// use square bracket to calling it one time

    const getUpdate = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${param.id}`,{
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))// here we are sending token through this api for verification of token in backend using middleware
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setComapny(result.company);
    }
    const Update = async ()=>{
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${param.id}`,{
            method: "Put",
            body: JSON.stringify({name,price,category,company}),
            headers: {
                'content-type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))// here we are sending token through this api for verification of token in backend using middleware
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    return (
        <div>
            <div className="product">
            <h1>Update Product</h1>
            <input className="inputbox" type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
            
            <input className="inputbox" type="text" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)}></input>
            
            <input className="inputbox" type="text" placeholder="Enter Category" value={category} onChange={(e)=>setCategory(e.target.value)}></input>
            
            <input className="inputbox" type="text" placeholder="Enter Company" value={company} onChange={(e)=>setComapny(e.target.value)}></input>
            
            <button onClick={Update} className="appButton" type="button" >Update Product</button>
        </div>
        </div>
    )
}

export default UpdateProduct;
