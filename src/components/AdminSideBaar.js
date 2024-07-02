import { Link } from "react-router-dom";
export default function AdminSideBar() {
  return (
    <>
      <div className="col-2">
        Admin Side Bar
        <br />
        <Link className="nav-link" to={""}>
          Manage Product
        </Link>
        <br />
        <Link className="nav-link" to={"order"}>
          Manage Order
        </Link>
        <br />
        <Link className="nav-link" to={"student"}>
          Manage Student
        </Link>
      </div>
    </>
  );
}
