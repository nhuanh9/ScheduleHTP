import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import axios from 'axios'
export default function AddProduct() {
    let navigate = useNavigate();
    return (
        <>
            <div className="row">
                <div className="col-4">
                    <h1>Add Product</h1>
                    <button className="btn btn-outline-warning">
                        <Link to={"/admin"}>Back to List </Link>
                    </button>
                    <Formik
                        initialValues={{
                            name: "",
                            price: "",
                            quantity: ""
                        }}
                        onSubmit={(values) => {
                            axios.post('http://localhost:3000/products', values).then(x => {
                                alert('Thêm thành công!');
                                navigate('/admin')
                            }).catch(e => {
                                alert('Thêm mới lỗi!')
                            })
                        }}
                    >
                        <Form>
                            <div className="form-group mt-3">
                                <label>Name</label>
                                <Field name={"name"} className={'form-control'} placeholder="Input product's name" />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <Field name={"price"} className={'form-control'} placeholder="Input product's price" />
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <Field name={"quantity"} className={'form-control'} placeholder="Input product's quantity" />
                            </div>
                            <button className="btn btn-primary">Add</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}