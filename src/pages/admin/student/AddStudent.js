import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
export default function AddStudent() {
    let navigate = useNavigate();
    return (
        <>
        <h2>Add Student Form</h2>
        <h5><Link to={'/admin/student'}>Back to List Student</Link></h5>
        <Formik 
            initialValues={{
                name: '',
                score: ''
            }}
            onSubmit={values => {
                axios.post('http://localhost:3000/students', values).then(() => {
                    navigate("/admin/student")
                })
            }}
        >
            <Form>
                <Field name={'name'}/>
                <Field name={'score'}/>
                <button>Add Student</button>
            </Form>
        </Formik>
        </>
    )
}