import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginP() {

    const {login} = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
      username: '',
      password: '',
    });
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
    };

    const validateForm = () => {
      let valid = true;
      const newErrors = { ...errors };
  
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
        valid = false;
      }
  
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
        valid = false;
      }
  
      setErrors(newErrors);
      return valid;
    };
  
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (validateForm()) {
            login();
              console.log("Logging in with:", formData);
          } 
        } catch(error) {
          toast.error(`try again: ${error}`);
        }
    };

    return (
      <div className="max-w-md p-8 mx-auto mt-64 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
          <span className="text-xs text-red-500">{errors.username}</span>
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
          <span className="text-xs text-red-500">{errors.password}</span>
        </label>
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
