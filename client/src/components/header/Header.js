import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userAuthorSlice";

function Header() {
  let { currentUser, loginUserStatus,errMsg } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );
  let dispatch = useDispatch();

  function signout(){
    //remove token from local storage
    localStorage.removeItem("token")
    dispatch(resetState())
  }  
  return (
    <nav
      className="navbar navbar-expand-sm fs-5"
      // style={{ backgroundColor: "var(--light-olive)" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={"https://logowik.com/content/uploads/images/quill-pen798.logowik.com.webp"} alt="" className="picture" width="90px" />
          {/* <img src={"https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1718150400&semt=ais_user"} alt="" className="picture" width="90px" /> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             {loginUserStatus === false ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to=""
                    style={{ color: "white" }}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signup"
                    style={{ color: "white" }}
                  >
                    SignUp
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signin"
                    style={{ color: "white" }}
                  >
                    SignIn
                  </NavLink>
                </li>
               </>
            ) 
              : ( 
                //sign out link
              <li className="nav-item">
               
                 <NavLink
                  className="nav-link"
                  to="signin"
                  style={{ color: "var(--light-grey)" }}
                   onClick={signout}>
                   {/* <span className="lead  fs-4 me-3 fw-1"  style={{ color: "#994570" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>
                  {currentUser.username} 
                   <sup style={{color:'var(--dark-green)',fontSize:'1rem'}}>
                     ({currentUser.userType}) 
                    </sup>
                   </span> */}
                   <p className="fs-3"> Welcome,{currentUser.username}</p>
                  Signout
                </NavLink> 
              </li>
            )} 
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;