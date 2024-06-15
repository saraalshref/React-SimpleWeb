import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function EditUserPage() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    useEffect(() => {
        axios.get(`https://localhost:7098/api/Account/getUserById/${id}`)
            .then(response => {
                if (response.data && response.data.data) {
                    setUserData(response.data.data);
                }
            })
            .catch(error => {
                setError('Error fetching user data: ' + error.message);
            });
    }, [id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be 3 characters or more')
            .max(30, 'Name must be 30 characters or less')
            .required('Name is required'),
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .required('Phone number is required'),
        age: Yup.number()
            .min(1, 'Age must be greater than 0')
            .max(120, 'Age must be less than 120')
            .required('Age is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.put(`https://localhost:7098/api/Account/update/${id}`, values);
            setIsUpdateSuccess(true);
        } catch (error) {
            setError('Error updating user: ' + error.message);
        }
        setSubmitting(false);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    if (isUpdateSuccess) {
        return <Navigate to="/userData" />;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-main fw-bold">Edit User</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
                initialValues={userData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <Field type="text" className="form-control" id="name" name="name" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <Field type="email" className="form-control" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone:</label>
                            <Field type="text" className="form-control" id="phone" name="phone" />
                            <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age:</label>
                            <Field type="number" className="form-control" id="age" name="age" />
                            <ErrorMessage name="age" component="div" className="text-danger" />
                        </div>
                        
                        <button type="submit" className="btn bg-main text-light" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditUserPage;
