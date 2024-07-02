import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";

export default function EditStudent() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [data, setData] = useState({
    id: "",
    name: "",
    description: "",
    action: "",
    score: "",
  });
  useEffect(() => {
    axios.get("http://localhost:3000/students/" + id).then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <>
      Edit Student {id}
      <Formik
        initialValues={data}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log(values);
          axios.put("http://localhost:3000/students/" + id, values).then(()=> {
            alert('Sua thanh cong!');
            navigate("/admin/student")
          })
        }}
      >
        <Form>
          <Field name={"id"} />
          <Field name={"name"} />
          <Field name={"score"} />
          <Field name={"description"} />
          <Field name={"action"} />
          <button>Save</button>
        </Form>
      </Formik>
    </>
  );
}
