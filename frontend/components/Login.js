import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
const Login = ()=>{
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })
    const handleForm = async ()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {
                'content-type':'application/json'
            },
        });
        result = await result.json();
        if(result.auth)// this result.name we get from backend as we use api to send request and get response from backend and the response containing the name and email so we get that from there
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/');
        }
        else{
            alert("please enter a valid email or password");
        }
        console.log(result);
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input className="inputbox" type="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className="inputbox" type="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className="appButton" onClick={handleForm}>Submit</button>
        </div>
    )
}

export default Login;
