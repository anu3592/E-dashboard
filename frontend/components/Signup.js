import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
const Signup = ()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })
    const show = async ()=>{
        console.log(name,email,password);
        let result = await fetch('http://localhost:5000/register',{
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers: {
                'content-type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        // we use to local storage to save user cresential at browser it saved the data for long term not only for minutes
        //through this we can update header or navigation bar for user and non user.

        // if we use inspect->icon after elements at the top->select appliaction ->local storage at left list above cookies
        // then we can see our record.
        localStorage.setItem("user",JSON.stringify(result.result));//we use result.result because in console localstorage it is showing all the user credential under result.
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/');
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputbox" type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
            <input className="inputbox" type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input className="inputbox" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={show} className="appButton" type="button" >Sign Up</button>
        </div>
    )
}

export default Signup;
