import React from "react";
import {Link} from 'react-router-dom';
const ProductList = ()=>{
    const [products, setProducts] = React.useState([]);
    const [search, setSearch] = React.useState("");
    React.useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async ()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))// here we are sending token through this api for verification of token in backend using middleware
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: 'Delete',
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))// here we are sending token through this api for verification of token in backend using middleware
            }
        });
        result = await result.json();
        if(result)
        {
            getProducts();//It is called because it show the remaining product instant not require to refresh
        }
    }   

    const searchHandle = async (event)=>{
        /*let key = event.target.value;
        if(key)
        {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            setProducts(result);
        }
        else{
            getProducts();
        }*/
        if(search)
        {
            let result = await fetch(`http://localhost:5000/search/${search}`,{
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))// here we are sending token through this api for verification of token in backend using middleware
                }
            });
            result = await result.json();
            setProducts(result);
        }
        else{
            getProducts();
        }
    }
    console.log("products", products);
    return (
        <div className="product-list">
            <h1>Product list</h1>
            <input className="search-product-box" type="text" placeholder="search products" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            <button className="appButton" onClick={searchHandle}>Search</button>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ?products.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>Rs {item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                ): <h1>No Result Found</h1>
                
            }
        </div>
    )
}

export default ProductList;
