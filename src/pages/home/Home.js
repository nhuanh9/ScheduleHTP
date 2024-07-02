import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import SideBar from "../../components/SideBar";

export default function Home () {
    return (
        <>
            <div className="row">
                <Header></Header>
            </div>
            <div className="row">
                <Nav></Nav>
            </div>
            <div className="row">
                <SideBar></SideBar>
                <div className="col-10">
                    <Outlet></Outlet>
                </div>
            </div>
            
        </>
    )
}