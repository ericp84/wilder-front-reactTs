import { useState } from "react";
import "./Modal.css";

const Modal = (props: {
  show: any;
  id: any;
  refresh: () => void;
  onClose: Function;
}) => {
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");

  if (!props.show) {
    return null;
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/wilders/update/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${newName}&city=${newCity}`,
    });
    props.refresh();
    props.onClose();
    setNewName("");
    setNewCity("");
  };

  return (
    <div className="modal">
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-header">
          <h2>TITLE</h2>
        </div>
        <div className="modal-body">
          <form className="form" onSubmit={handleUpdate}>
            <div className="input-container">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="name"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
              <label htmlFor="city">city</label>
              <input
                type="text"
                className="city"
                onChange={(e) => {
                  setNewCity(e.target.value);
                }}
              />
              {/* <label htmlFor="stack">stack</label>
                        <input type="text" className="stack" /> */}
              <button
                type="submit"
                value="Valider"
                onClick={(e) => {
                  handleUpdate(e);
                }}
              >
                {" "}
                Valider{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
