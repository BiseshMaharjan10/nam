import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { createUserApi } from '../services/Api';


const Registration = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    });

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () =>{
        if(!formData.name.trim()){
            toast.error('Name is Required');
            return false;
        }

        if(!formData.email.trim()){
            toast.error('Email is Required');
            return false;
        }

        if(!formData.password.trim()){
            toast.error('Password is Required');
            return false;
        }

        if(!formData.confirmPassword.trim()){
            toast.error('Confirm Password is Required');
            return false;
        }

        if (formData.password.length < 6){
            toast.error('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword){
            toast.error('Passwords do not match');
            return false;s
        }
        return true;
    }
    ha
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validate()) return;
        try{
            const dataToSubmit = {
                username: formData.name,
                email: formData.email,
                password: formData.password,
            }

            const response = await createUserApi(dataToSubmit);
            if(response.data.success){
                toast.success(response?.data?.message);
                setFormData({
                    name:'',
                    email:'',
                    password:'',
                    confirmPassword:'',
                });
            }
            else{
                toast.error(response?.data?.message);
            }

            
        }catch(error){
            toast.error("Something went wrong")
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Registration</h1>
            
            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="mb-6">
            <label className="block text-gray-700 mb-2"> Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Register
            </button>
        </div>
        </div>
    )
}

export default Registration
