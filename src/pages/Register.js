import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import axios from 'axios'
export default function Register() {
    let navigate = useNavigate();
    return (
        <>
            <h1>Register</h1>
            <button>
                <Link to={"/"}>Login</Link>
            </button>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    name:"",
                    dob:""
                }}
                onSubmit={(values) => {
                    axios.post('http://localhost:3000/users/register', values).then(x => {
                        alert('Đăng ký thành công!');
                        navigate('/')
                    }).catch(e => {
                        alert(e.response.data.message);
                    })
                }}
            >
                <Form>
                    <Field name={"username"} />
                    <Field name={"password"} />
                    <Field name={"name"} />
                    <Field name={"dob"} />
                    <button>Register</button>
                </Form>
            </Formik>
        </>
    );
}