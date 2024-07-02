import { Outlet } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";
import AdminSideBar from "../../components/AdminSideBaar";

export default function Admin() {
  return (
    <>
      <div className="row">
        <AdminSideBar></AdminSideBar>
        <div className="col-9">
          <AdminMenu></AdminMenu>
          <div className="row">
            <div className="col-12">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
