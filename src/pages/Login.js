import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import axios from 'axios'
import './Login.css'
export default function Login() {
  let navigate = useNavigate();
  return (
    <>
      <div className="row mt-5 pt-5">
        <div className="offset-4"></div>
        <div className="col-4 text-center login p-5">
          <h1>Login</h1>
          <button className="btn btn-outline-warning">
            <Link to={"register"}>Register</Link>
          </button>
          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            onSubmit={(values) => {
              axios.post('http://localhost:3000/users/login', values).then(x => {
                alert('Đăng nhập thành công!');
                navigate('/admin')
                localStorage.setItem('user',JSON.stringify(x.data))
              }).catch(e => {
                alert('Tài khoản hoặc mật khẩu sai!')
              })
            }}
          >
            <Form>
              <div className="form-group text-left">
                <label>Username</label>
                <Field name={"username"} className={'form-control'} placeholder='Input your username'/>
              </div>
              <div className="form-group text-left">
                <label>Password</label>
                <Field name={"password"} className={'form-control'} placeholder='Input your password' />
              </div>
              <button className="btn btn-primary">Login</button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
