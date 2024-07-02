import { Link } from "react-router-dom";
export default function AdminMenu() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          Admin Menu
          <button className="btn btn-outline-warning">
            <Link to={"/"}>Logout </Link>
          </button>
        </div>
      </div>
    </>
  );
}
