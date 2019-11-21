import React from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import { AuthContext } from "../state/Auth";

export const Signup = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
    successMessage: false
  };

  const history = useHistory();

  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
      successMessage: false
    });
    fetch(`${config.apiUrl}/api/users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.email,
        email: data.email,
        password: data.password
      })
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw resp;
      })
      .then(respJson => {
        dispatch({
          type: "SIGNUP",
          payload: respJson
        });
        setData({
          successMessage: true
        });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };

  return (
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="card">
          <div className="card-content">
            <div className="title">Signup</div>

            <form onSubmit={handleFormSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left">
                  <input
                    className={data.errorMessage ? "input is-danger" : "input"}
                    type="email"
                    name="email"
                    placeholder="johndoe77@gmail.com"
                    onChange={handleInputChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input
                    className={data.errorMessage ? "input is-danger" : "input"}
                    name="password"
                    type="password"
                    // value={data.password}
                    onChange={handleInputChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              {data.errorMessage && (
                <article className="message is-danger">
                  <div className="message-body">{data.errorMessage}</div>
                </article>
              )}
              {data.successMessage && (
                <article className="message is-success">
                  <div className="message-body">
                    You're now registered, redirecting to login...
                  </div>
                </article>
              )}
              <div className="field">
                <p className="control">
                  <button
                    className={
                      data.isSubmitting
                        ? "button is-warning is-loading"
                        : "button is-warning"
                    }
                    disabled={data.isSubmitting}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
