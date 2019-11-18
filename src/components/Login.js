import React from "react";
import config from "../config";
import { AuthContext } from "../state/Auth";

export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

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
      errorMessage: null
    });
    fetch(`${config.apiUrl}/api/login/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.username,
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
          type: "LOGIN",
          payload: respJson
        });
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
            <div className="title">Login</div>

            <form onSubmit={handleFormSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <p className="control has-icons-left">
                  <input
                    className={data.errorMessage ? "input is-danger" : "input"}
                    type="text"
                    name="username"
                    // value={data.username}
                    placeholder="johndoe77"
                    onChange={handleInputChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
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
              <div className="field">
                <p className="control">
                  <button
                    className={
                      data.isSubmitting
                        ? "button is-success is-loading"
                        : "button is-success"
                    }
                    disabled={data.isSubmitting}
                    type="submit"
                  >
                    Login
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

export default Login;
