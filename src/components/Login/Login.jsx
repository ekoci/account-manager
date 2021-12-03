import React, { useState } from "react";
import styles from "./Login.module.scss";
import splash from "../../assets/landing_photo.svg";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import apiGtw from "../../api";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Login = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirectClick = () => {
    history.push("/register");
  };

  const handleInputChange = (event) => {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiGtw.post(
        `/spotify/login?email=${inputs.email}&password=${inputs.password}`
      );
      console.log(response);
      const token = response.data.token;
      const user = JSON.stringify(response.data);
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);
      if (response.data.role === "user") history.push("/userdashboard");
      if (response.data.role === "admin")  history.push("/admindashboard");
    } catch (error) {
      console.log(error)
      setError(true);
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <>
      <div className={styles.container}>
        <img
          height="100px"
          src={logo}
          style={{
            paddingBottom: "20px",
            marginBottom: "30px",
            marginLeft: "-45px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <div className={styles.container__art}>
            <div className={styles.container__art__upper}>
              <img src={splash} />
            </div>
            <p>Don't have an</p>
            <p className={styles.spacing}>account?</p>
            {/* <p className={styles.secondary}>
              What ar
            </p> */}
            <p className={styles.secondary}>What are you waiting for?</p>
            <button
              className={styles.container__art__button}
              onClick={handleRedirectClick}
            >
              SIGN UP
            </button>
            <div className={styles.container__art__lower}>
              <img src={splash} />
            </div>
          </div>
          <div className={styles.container__form}>
            <p>Sign In</p>
            <p>Welcome back to Accounds</p>

            <form onSubmit={handleSubmitForm} autocomplete="off">
              <input
                type="email"
                placeholder="E-Mail"
                name="email"
                onChange={handleInputChange}
                required
                value={inputs.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                required
                value={inputs.password}
              />
              {isLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "59px",
                    marginBottom: "120px",
                  }}
                >
                  <CircularProgress
                    color="#00BC87"
                    style={{ color: "#00BC87!important" }}
                  />
                </div>
              ) : (
                <button
                  style={{ marginTop: "60px", marginBottom: "120px" }}
                  type="submit"
                  className={styles.container__art__button}
                >
                  SIGN IN
                </button>
              )}
            </form>
            <p
              style={{
                textAlign: "center",
                marginBottom: "0",
                marginTop: "20px",
                fontSize: "0.875rem",
                color: "#989898",
              }}
            >
              By signing up, you agree to our{" "}
              <span>
                {" "}
                <a href="javascript:">Terms of Service</a>
              </span>{" "}
              and have{" "}
            </p>
            <p
              style={{
                textAlign: "center",
                marginBottom: "0",
                fontSize: "0.875rem",
                color: "#989898",
              }}
            >
              read the{" "}
              <span>
                <a href="javascript:">Privacy Policy</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
        {error && (
          <Alert onClose={handleClose} severity="error">
            Error! Wrong credentials!
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default Login;
