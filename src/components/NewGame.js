import React from "react";
import config from "../config";
import { AuthContext } from "../state/Auth";
import { GamesContext } from "../state/Games";

const initialState = {
  name: "",
  rows: 8,
  cols: 8,
  mines: 10
};

const NewGameModal = props => {
  const { state, dispatch } = React.useContext(GamesContext);
  const { state: authState } = React.useContext(AuthContext);

  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const isButtonDisabled = data.name === "" || state.isGameSubmitting;

  const handleFormSubmit = () => {
    dispatch({
      type: "NEW_GAME_REQUEST"
    });
    setData({
      ...data,
      isGameSubmitting: true,
      gameHasError: false
    });
    fetch(`${config.apiUrl}/api/games/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": `application/json`
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => {
        setData({
          initialState,
          isGameSubmitting: false,
          gameHasError: false
        });
        dispatch({
          type: "NEW_GAME_SUCCESS",
          payload: data
        });
        onClose();
      })
      .catch(error => {
        dispatch({
          type: "NEW_GAME_FAILURE"
        });
      });
  };

  const onClose = e => {
    props.onClose && props.onClose(e);
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">New Game</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <form className="form">
            <div className="field">
              <label className="label">Game Name</label>
              <div className="control">
                <input
                  className={data.errorMessage ? "input is-danger" : "input"}
                  type="text"
                  name="name"
                  defaultValue={data.name}
                  placeholder="Super Awesome Game"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Rows</label>
              <div className="control">
                <input
                  className={data.errorMessage ? "input is-danger" : "input"}
                  type="number"
                  step="1"
                  name="rows"
                  min="3"
                  defaultValue={data.rows}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Columns</label>
              <div className="control">
                <input
                  className={data.errorMessage ? "input is-danger" : "input"}
                  type="number"
                  step="1"
                  name="cols"
                  min="3"
                  defaultValue={data.cols}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Mines</label>
              <div className="control">
                <input
                  className={data.errorMessage ? "input is-danger" : "input"}
                  type="number"
                  step="1"
                  name="mines"
                  min="1"
                  defaultValue={data.mines}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-warning"
            onClick={handleFormSubmit}
            disabled={isButtonDisabled}
          >
            Save Game
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewGameModal;
