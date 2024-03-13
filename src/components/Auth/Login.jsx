import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import createToast from "../../utils/toast";
import { Context } from "../../main";
import "./Register.css"

const Login = () => {
    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().required("Required"),
            
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(
                    "http://localhost:5000/api/v1/user/login",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                formik.resetForm();
                setIsAuthorized(true);
                createToast(data.message, "success");
                createToast("Login Successfully", "success");
            } catch (error) {
                createToast(error.response.data.message, "error");
            }
        },
    });

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="./images/logo.png" alt="logo" />
                        <h3>Login to your account</h3>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="inputTag">
                            <label>Email Address</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="xyz@gmail.com"
                                    {...formik.getFieldProps("email")}
                                />
                                <MdOutlineMailOutline />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="inputTag">
                            <label>Password</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    {...formik.getFieldProps("password")}
                                />
                                <RiLock2Fill />
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="banner">
                    <img src="./images/login.png" alt="login" />
                </div>
            </section>
        </>
    );
};

export default Login;
