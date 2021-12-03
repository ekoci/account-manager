import React, { useState } from "react";
import styles from "./Register.module.scss";
import splash from "../../assets/landing_photo.svg";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import apiGtw from "../../api";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Register = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMatching, setIsMatching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirectClick = () => {
    history.push("/login");
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
    if (inputs.password !== inputs.repeatPassword) {
      setIsMatching(false);
      return;
    }
    setIsLoading(true);

    try {
      await apiGtw.post("/spotify/register", {
        ...inputs,
      });
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setSuccess(false);
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
        <div style={{ display: "flex" }}>
          <div className={styles.container__art}>
            <div className={styles.container__art__upper}>
              <img src={splash} />
            </div>
            <p>Already have an</p>
            <p className={styles.spacing}>account?</p>
            <p className={styles.secondary}>
              Sign In now to continue your Accounds
            </p>
            <p className={styles.secondary}>experience.</p>
            <button
              className={styles.container__art__button}
              onClick={handleRedirectClick}
            >
              SIGN IN
            </button>
            <div className={styles.container__art__lower}>
              <img src={splash} />
            </div>
          </div>
          <div className={styles.container__form}>
            <p>Sign Up</p>
            <p>What are your waiting for?</p>

            <form onSubmit={handleSubmitForm} autocomplete="off">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                required
                value={inputs.username}
              />
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
              <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                onChange={handleInputChange}
                required
                value={inputs.confirmPassword}
              />
              <p
                style={
                  !isMatching
                    ? {
                        color: "rgb(228 84 84 / 81%)",
                        display: "block",
                        textDecoration: "underline",
                      }
                    : { visibility: "hidden" }
                }
              >
                Passwords don't match!
              </p>
              {isLoading ? (
                <div style={{ textAlign: "center", marginTop: "-1px" }}>
                  <CircularProgress color="#00BC87" />
                </div>
              ) : (
                <button
                  style={{ marginTop: "0px" }}
                  type="submit"
                  className={styles.container__art__button}
                >
                  SIGN UP
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
            Error! Email may be already in use!
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
        {success && (
          <Alert onClose={handleClose} severity="success">
            You have registered successfully!
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default Register;
