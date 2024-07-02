import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Student() {
  let navigate = useNavigate();
  let [list, setList] = useState([]);
  let [listShow, setListShow] = useState([]);
  let [data, setData] = useState({
    name: "",
    score: "",
  });
  let [key, setKey] = useState({ from: 0, to: 0 });
  let getLst = () => {
    axios.get("http://localhost:3000/students").then((res) => {
      setList(res.data);
      setListShow(res.data);
    });
  };
  let changeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getLst();
  }, []);
  return (
    <>
      <h2>List Student</h2>
      <h5><Link to={'add'}>Add Student</Link></h5>
      <input
        onChange={(e) => {
          let searchList = list;
          searchList = list.filter((item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setListShow(searchList);
        }}
      />
      <input
        value={key.from}
        onChange={(e) => {
          setKey({ ...key, from: e.target.value });
        }}
      />
      <input
        value={key.to}
        onChange={(e) => {
          setKey({ ...key, to: e.target.value });
        }}
      />
      <button
        onClick={() => {
          let searchList = list;
          searchList = list.filter(
            (item) => item.score <= key.to && item.score >= key.from
          );
          setListShow(searchList);
          setKey({ from: 0, to: 0 });
        }}
      >
        Search
      </button>
      <Outlet></Outlet>
      {listShow.map((e) => (
        <h2>
          {e.name}, {e.score}
          <button
            onClick={() => {
              if (window.confirm("Ban co chac k?")) {
                axios
                  .delete("http://localhost:3000/students/" + e.id)
                  .then(() => {
                    getLst();
                  });
              }
            }}
          >
            Xoa
          </button>
          <button
            onClick={() => {
              navigate("/admin/student/detail", { state: { obj: e } });
            }}
          >
            Chi tiet
          </button>
          <button
            onClick={() => {
              navigate("/admin/student/edit/"+e.id);
            }}
          >
            Sửa
          </button>
        </h2>
      ))}
    </>
  );
}
