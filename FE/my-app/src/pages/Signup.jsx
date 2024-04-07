import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
const Signup = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const handlesubmit = (e) => {
        e.preventDefault()
        if (email.length < 1 || password.length < 1 || name.length < 1) {
            return toast.error("Fill All The Details!!")
        }
        let obj = {
            email,
            password,
            name
        }
        axios.post("http://localhost:5050/auth/signup", obj).then((res) => {

            if (res.status == 200) {
                toast.success("SignUp Success!!")
                navigate("/")
                setemail("")
                setpassword("")
                setname("")
            } else {
                toast.error("Something Went Wrong!!")
            }

        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className='h-screen w-screen bg-slate-100 pt-5'>
            <h1 className='text-xl text-lime-800 text-center pt-3 underline'>Signup Form</h1>
            <br />
            <form onSubmit={handlesubmit} className='h-auto w-2/4 m-auto border flex flex-col items-center border-black rounded-md' action="">
                <br />
                <label htmlFor="">Name</label>

                <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder='Name' />
                <br />
                <label htmlFor="">Email</label>

                <input value={email} onChange={(e) => setemail(e.target.value)} type="text" placeholder='Email' />
                <br />

                <label htmlFor="">Password</label>

                <input value={password} onChange={(e) => setpassword(e.target.value)} type="text" placeholder='Password' />
                <br />
                <button className='bg-cyan-500 rounded-md px-4 h-10 text-white'>Signup</button>
                <br />
                <Link to="/"><span className='pb-4'>Click here for <span className='text-red-600 font-bold'>Login</span></span></Link>
                <br />
            </form>
        </div>
    )
}

export default Signup
