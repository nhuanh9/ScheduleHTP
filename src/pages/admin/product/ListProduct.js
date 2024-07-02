import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListProuct() {
  let [list, setList] = useState([]);
  useEffect(() => {
    loadList();
  }, []);
  let loadList = () => {
    axios.get("http://localhost:3000/products").then((x) => {
      console.log(x.data);
      setList(x.data);
    });
  }
  return (
    <>
      <h1>List Product</h1>
      <button className="btn btn-outline-primary">
        <Link to={'products/add'}>Add Product</Link>
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <tr>
              <th scope="row">{e.id}</th>
              <td>{e.name}</td>
              <td>{e.price}</td>
              <td>{e.quantity}</td>
              <td>
                <button className="btn btn-warning"><Link to={'products/edit/'+e.id}>Edit</Link></button>
                <button className="btn btn-danger ml-2" onClick={() => {
                  axios.delete('http://localhost:3000/products/' + e.id).then(() => {
                    alert('Xóa Thành Công!');
                    loadList()
                  })
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
