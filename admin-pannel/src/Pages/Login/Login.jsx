import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import './Login.css'



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const loginData = async (e) => {
        if (!email || !password) {
          alert("please enter email and password");
        } else {
          e.preventDefault();
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            await axios
              .post(`${process.env.REACT_APP_BASE_URL}/api/login`,
                {
                  email,
                  password,
                },
                config
              )
              .then((res) => {
                if (res) {
                    console.log(res);
                    navigate('/dashboard')
                    localStorage.setItem("adminInfo",JSON.stringify(res.data.admin))
                }else{
                    navigate('/login')
                }
              })
              .catch((err) =>{
                toast.error(err.response.data.message, {
                  autoClose: 2000,
                  transition: Slide,
                });
              });
          } catch (error) {
            console.log(error);
          }
        }
      };
    
    
    return (
        <div className='main'>
            <div className='box-div mx-auto'>
                <div className='logo'>
                    <img style={{ height: "100px", width: "100px" }} src={require("./Asset/logo alt2-min.png")} alt="" />
                </div>
                <div className='inputs-fileds'>
                    <form action="" onSubmit={loginData}>
                        <input className='inputs my-4'
                         type="email" placeholder='  Email' 
                         value={email} 
                         onChange={(e) => setEmail(e.target.value)}
                        />
                        <input className='inputs' 
                        type="password" 
                        placeholder='  Password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <div>
                            <button className='login-btn my-4'>
                                Login
                            </button>
                            <ToastContainer />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
