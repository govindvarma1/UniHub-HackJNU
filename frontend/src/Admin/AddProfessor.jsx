import React, { useEffect, useState } from "react";
import { useAdminAuth } from '../Context/AdminAuthContext';
import { CheckLogin } from '../Utils/CheckLogin';
import { NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../Components/Layouts/AdminLayout";
import { CheckAdminLogin } from "../Utils/CheckAdminLogin";
import TextAreaInput from "../Components/Common/TextAreaInput";
import { AddProfessorRoute } from "../Utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function AddProfessor() {
    console.log("AddProfessor component is rendering");

    const { isLoggedIn, login } = useAdminAuth();
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        username: "",
        password: "",
        bio: "",
        universityId: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        bio: "",
        universityId: "",
    });

    //  const [universities, setUniversities] = useState([]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };



    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            valid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
            valid = false;
        }


        if (!formData.bio.trim()) {
            newErrors.bio = "Professor bio is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };
   // console.log("handleSubmit is not being called");
    
    const handleSubmit = async (e) => {
      //  console.log("handleSubmit is being called what");
        e.preventDefault();
       // console.log("handleSubmit is being called");

        const storedAdminData = JSON.parse(localStorage.getItem("admin"));
        if (!storedAdminData || !storedAdminData.universityId || !storedAdminData.token) {
            //console.log("Missing admin data or token.");
            return;
        }

        if (validateForm()) {
            try {
                console.log("Sending request to:", AddProfessorRoute);
                const response = await fetch(AddProfessorRoute, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storedAdminData.token}`,
                    },
                    body: JSON.stringify({ ...formData, universityId: storedAdminData.universityId }),
                   
                });
                console.log("Response status:", response.status);

                if (!response.ok) {
                    const errorData = await response.text(); // Log or inspect errorData
                    console.error("Registration failed. Status:", response.status, errorData);
                    return;
                }

                const data = await response.json();
                console.log("Registration successful:", data);

                if (response.status === 200) {
                    navigate("/admin/add-professor");
                    login();
                    setFormData({
                        username: "",
                        password: "",
                        bio: "",
                        universityId: "",
                    });

                     // message
                     toast.success('User added successfully');
                }else {
                    toast.error(`${data.error}`)
                }

            } catch (error) {
                console.error("Error during registration:", error);
            }
        } else {
            console.log("Form has errors. Please fix them.");
        }
    };

    console.log("Inside render block");
    return isLoggedIn && (
        <AdminLayout>
        
            <div className="max-w-md p-6 mx-auto mt-40 bg-white rounded shadow-md">
          
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
                        <span className="text-xs text-red-500">
                            {errors.username}
                        </span>
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
                        <span className="text-xs text-red-500">
                            {errors.password}
                        </span>
                    </label>

                    <TextAreaInput label="Bio" name="bio" value={formData.bio} error={errors.bio} handleChange={handleChange} />

                   

                    <button
                     type="submit"
                        className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                           
                        Add
                    </button>
                    
                </form>
            </div>
            <ToastContainer />
        </AdminLayout>

    );

}





