import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(null);
    const {setUser } = useContext(UserContext)

    async function handleLoginSubmit(e) {
        e.preventDefault();

       try{
           const {data} = await axios.post('/login', {email, password}, {withCredentials: true});
           setUser(data)
           alert('Login successfull!')
           setRedirect('/')
        }
        catch (err){
            alert('Login Failed! Please check your email and password');
        }

        if (redirect) {
            return <Navigate to={redirect} />
        }

    
    }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <form 
        className="max-w-md mx-auto "
        onSubmit={handleLoginSubmit}
        >
          <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e =>  setEmail(e.target.value)}
          />

          <input 
          type="password" 
          placeholder="Password"
          value={password} 
          onChange={e => setPassword(e.target.value)}
          />

          

          <button type="submit" className="btn">Login</button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? 
            <Link 
            className="underline text-black px-2"
            to="/register">Register</Link>

          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
