import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Nav()
{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img className="logo" alt="logo" src="https://i.pinimg.com/564x/15/96/e3/1596e3b738d6e32dbd700844ed062488.jpg"/>
            {auth?
            <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>:
            <ul className="nav-ul nav-right">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>
            }
        </div>
    )
}

export default Nav;
