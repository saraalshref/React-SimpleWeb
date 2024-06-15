import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Name must be 3 characters or more")
            .max(30, "Name must be 30 characters or less")
            .required("Name is required"),
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is Required"),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Confirm Password is Required"),
        phone: Yup.string()
            .matches(/^01[0-9]{9}$/, "Please enter a valid Egyptian phone number")
            .required("Phone is Required"),
        age: Yup.number()
            .min(1, "Age must be greater than 0")
            .max(120, "Age must be less than 120")
            .required("Age is required"),
    });
    
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            let { data } = await axios.post(
                "https://localhost:7098/api/account/register",
                values
            );

            if (data.message === "User registered successfully") {
                Swal.fire("Register successfully");
                navigate("/signin");
            }
        } catch (error) {
            console.log(error.response);
            setServerError(error.response.data.message);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="my-3 mt-5">
            <h1 className="text-main text-center fw-bold">Register Form</h1>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    rePassword: "",
                    phone: "",
                    age: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit} >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="row mt-4">
                            <div className="col-md-8 m-auto bg-light shadow p-4 ">
                                <div className="row gy-4">
                                    <div className="col-md-12">
                                        <label htmlFor="name">Name:</label>
                                        <Field  type="text"  id="name"      name="name"    className="form-control"/>     
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                     
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="email">Email:</label>
                                        <Field type="email" name="email" id="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                     
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="password">Password:</label>
                                        <Field type="password"  name="password" id="password" className="form-control" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="rePassword">Confirm Password:</label>
                                        <Field type="password"  name="rePassword" id="rePassword" className="form-control" />
                                        <ErrorMessage name="rePassword" component="div" className="text-danger" />
                                     
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="phone">Phone:</label>
                                        <Field type="text" id="phone" name="phone" className="form-control" />
                                        <ErrorMessage name="phone" component="div" className="text-danger" />
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="age">Age:</label>
                                        <Field  type="number" id="age" name="age" className="form-control"/>
                                        <ErrorMessage  name="age"   component="div" className="text-danger"/>
                                    </div>
                                    {serverError && (
                                        <p className="text-danger">{serverError}</p>
                                    )}
                                    <div className="col-md-12 d-flex align-items-center justify-content-end ">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn bg-main text-light"
                                        >
                                            Register
                                            {isLoading && (
                                                <span>
                                                    <i className="fa-solid text-light fa-spinner fa-spin mx-2"></i>
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-muted">
                                        Already have an account?
                                        <Link to="/signin" className="text-main mx-1">
                                            Sign in now
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Signup;
