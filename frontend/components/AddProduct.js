import React from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = ()=>{
    const [name,setName] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setComapny] = React.useState("");
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const add = async ()=>{
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }
        console.log(name,price,category,company);
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({name,price,category,userId,company}),
            headers: {
                'content-type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))
            },
        });
        result = await result.json();
        console.log(result);
        navigate("/");
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputbox" type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
            {(error&&!name)?<span className="invalid-input">Enter Valid Name</span>:<></>}
            <input className="inputbox" type="text" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)}></input>
            {(error&&!price)?<span className="invalid-input">Enter Valid Price</span>:<></>}
            <input className="inputbox" type="text" placeholder="Enter Category" value={category} onChange={(e)=>setCategory(e.target.value)}></input>
            {(error&&!category)?<span className="invalid-input">Enter Valid Category</span>:<></>}
            <input className="inputbox" type="text" placeholder="Enter Company" value={company} onChange={(e)=>setComapny(e.target.value)}></input>
            {(error&&!company)?<span className="invalid-input">Enter Valid Company</span>:<></>}
            <button onClick={add} className="appButton" type="button" >Add Product</button>
        </div>
    )
}

export default AddProduct;
