import "../signup/Signup.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { isPending,currentUser,loginUserStatus, errorOccurred, errMsg } =
    useSelector((state) => state.userAuthoruserAuthorLoginReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

function onSignUpFormSubmit(userCred) {
    console.log(userCred)
   dispatch(userAuthorLoginThunk(userCred));
 }

  useEffect(() => {
    if (loginUserStatus===true) {
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      }
      if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [currentUser,loginUserStatus,  navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
          <div className="card-body">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signin</h2>
            </div>
            
              {/* invalid cred err */}
              {errorOccurred === true && (
                <p className="text-center" style={{ color: "var(--crimson)" }}>
                  {errMsg}
                </p>
              )}
              <form 
              onSubmit={handleSubmit(onSignUpFormSubmit)}
              >
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--dark-grey)",
                    }}
                  >
                    Login as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType")}
                    />
                    <label htmlFor="author" className="form-check-label"
                    style={{ color: "var(--brown)",fontSize: "18px"  }}>
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label htmlFor="user" className="form-check-label"
                    style={{ color: "var(--brown)",fontSize: "18px"  }}>
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password")}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="text-light">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;



// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import {useDispatch, useSelector} from 'react-redux';
// import {userAuthorLoginThunk} from '../../redux/slices/userAuthorSlice';
// import { useNavigate } from "react-router-dom";

// function Signin() { // Renamed from Login to Signin
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   let { currentUser, loginUserStatus, errorOccurred, errMsg } = useSelector(state => state.userAuthorLoginReducer);
//   let navigate = useNavigate();
//   let dispatch = useDispatch();

//   function onLoginFormSubmit(userCred) {
//     console.log(userCred);
//     dispatch(userAuthorLoginThunk(userCred));
//   }

//   useEffect(() => {
//     if (loginUserStatus) {
//       if (currentUser.userType === "user") {
//         navigate("/user-profile");
//       }
//       if (currentUser.userType === "author") {
//         navigate("/author-profile");
//       }
//     }
//   }, [loginUserStatus]);

//   return (
//     <div className="container">
//       <form
//         className="w-50 mx-auto bg-light p-4 rounded shadow mt-5 mb-5"
//         onSubmit={handleSubmit(onLoginFormSubmit)}
//       >
//         {/* User Type label and radio buttons at the top */}
//         <div className="mb-3 row align-items-center">
//           <label className="col-sm-3 col-form-label">User Type</label>
//           <div className="col-sm-9">
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 {...register("userType")}
//                 id="user"
//                 value="user"
//                 className="form-check-input"
//               />
//               <label htmlFor="user" className="form-check-label">User</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 {...register("userType")}
//                 id="author"
//                 value="author"
//                 className="form-check-input"
//               />
//               <label htmlFor="author" className="form-check-label">Author</label>
//             </div>
//           </div>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">Username</label>
//           <input
//             type="text"
//             {...register("username")}
//             id="username"
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             {...register("password")}
//             id="password"
//             className="form-control"
//           />
//         </div>

//         <button type="submit" className="btn btn-success w-30% mx-auto d-block">
//           Sign In
//         </button>
        
//         <p className="lead text-center mt-3">
//           New User?{" "}
//           <Link to="/register" className="text-success fw-bold">
//             Register here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signin; // Renamed from Login to Signin
