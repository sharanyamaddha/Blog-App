import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  Link } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

function Signup() {
 
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [err, setErr] = useState("");
  let navigate=useNavigate()
  // let [state, setState] = useState(false);
  // let [signupSuccess, setSignupSuccess] = useState(false);

  async function onSignUpFormSubmit(userObj) {
    try {
      let res;
      if (userObj.userType === 'user') {
        res = await axios.post('http://localhost:4000/user-api/user', userObj);
      } else if (userObj.userType === 'author') {
        res = await axios.post('http://localhost:4000/author-api/author', userObj);
      }

      if (res.data.message === "user created" || res.data.message === "author created") {
        // navigate to login
        navigate('/signin');
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr(error.message);
    }
  }

 
  //   if (res.status === 201) {
  //     setState(true);
  //     setSignupSuccess(true);
  //     setErr("");
  //   } else {
  //     setErr(res.data.message);
  //   }
   

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
             <div className="card-title text-center border-bottom"> 
              {/* {signupSuccess === true ?
               (
                <div>
                  <p className="lead fs-3 text-center display-4 text-success">
                    User registration success
                  </p>
                  <p className="text-center fs-6 text-secondary">
                    Proceed to <Link to="/signin">Login</Link>
                  </p>
                  <p className="text-center fs-6 text-secondary">
                    Back to <Link to="/">Home</Link>
                  </p>
                </div>
              ) : (
                
              )
              } */}
              <h2 className="p-3">Signup</h2>
             </div> 
            <div className="card-body">
            {/* display user signup error message */}
            {err.length!==0 && <p className="text-danger fs-3">{err}</p>}

              {/* display user signup error message */}
              {err.length !== 0 && (
                <p className="lead text-center text-danger">{err}</p>
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
                    Register as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                     {...register("userType", 
                    //  { disabled: state }
                    )}
                    />
                    <label
                      htmlFor="author"
                      className="form-check-label"
                      style={{ color: "var(--brown)",fontSize: "18px"  }}

                    >
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType", 
                      // { disabled: state }
                    )}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"
                      style={{ color: "var(--brown)",fontSize: "18px"  }}
                    >
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
                    {...register("username", 
                    // { disabled: state }
                  )}
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
                    {...register("password",
                    //  { disabled: state }
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email", 
                    // { disabled: state }
                  )}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="text-light" 
                  // disabled={state}
                  >
                    Register
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

export default Signup;