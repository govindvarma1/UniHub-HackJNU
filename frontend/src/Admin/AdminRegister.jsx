import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AdminRegisterRoute, GetUniversitiesRoute, StudentRegister } from "../Utils/APIRoutes";
import { ConvertList } from "../Utils/UniversityList";
import TextAreaInput from "../Components/Common/TextAreaInput"
import { useAdminAuth } from "../Context/AdminAuthContext";
import { CheckAdminLogin } from "../Utils/CheckAdminLogin";

const AdminRegistrationForm = () => {
   
    const { isLoggedIn, login } = useAdminAuth();
    const navigate = useNavigate();

    useEffect(() => {
      async function VerifyLogin() {
        const response = await CheckAdminLogin();
        if(response === true) {
          login();
          navigate("/admin")
        } 
        console.log(response);
      }
      VerifyLogin();
    }, [])

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        universityName:"",
        description:"",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        universityName:"",
        description:"",
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


        if (!formData.universityName.trim()) {
            newErrors.universityName = "University is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(AdminRegisterRoute, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...formData }),
                });

                if (!response.ok) {
                    const errorData = await response.text(); // Log or inspect errorData
                    console.error("Registration failed. Status:", response.status, errorData);
                    return;
                }
                
                const data = await response.json();
                console.log("Registration successful:", data);

                if (response.status === 200) {
                    localStorage.setItem("admin", JSON.stringify(data));
                    navigate("/admin");
                    login();
                } 
                
            } catch (error) {
                console.error("Error during registration:", error);
            }
        } else {
            console.log("Form has errors. Please fix them.");
        }
    };



    return !isLoggedIn && (
        <div className="max-w-md p-6 mx-auto mt-48 bg-white rounded shadow-md">
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
               
                <label className="block mb-2">
                    University:
                    <input
                        type="text"
                        name="universityName"
                        value={formData.universityName}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border rounded"
                    />
                    <span className="text-xs text-red-500">
                        {errors.universityName}
                    </span>
                </label>
                
                <TextAreaInput label="Description" name="description"  value={formData.description} error= {errors.description} handleChange={handleChange} />

                <button
                    type="submit"
                    className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Register
                </button>
                <p className="font-semibold text-center">
                    Already Have an Account ?{" "}
                    <NavLink className="text-blue-700" to="/admin/login">
                        Login
                    </NavLink>
                </p>
            </form>
        </div>
    
    );
       
};

export default AdminRegistrationForm;
