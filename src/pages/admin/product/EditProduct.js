import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import axios from 'axios'
export default function EditProduct() {
    let {id} = useParams();
    let navigate = useNavigate();
    let [data, setData] = useState({
        id: "",
        price: "",
        name: "",
        quantity: ""
    })
    useEffect(()=> {
        axios.get('http://localhost:3000/products/'+id).then(res => {
            setData(res.data)
        })
    }, [])
    return (
        <>
         <div className="row">
                <div className="col-4">
                    <h1>Edit Product {id}</h1>
                    <button className="btn btn-outline-warning">
                        <Link to={"/admin"}>Back to List </Link>
                    </button>
                    <Formik
                        initialValues={data}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            axios.put('http://localhost:3000/products/'+id, values).then(x => {
                                alert('Sửa thành công!');
                                navigate('/admin')
                            }).catch(e => {
                                alert('Sửa lỗi!')
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
                            <button className="btn btn-primary">Save</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}