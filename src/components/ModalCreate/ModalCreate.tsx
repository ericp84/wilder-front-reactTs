import { useState } from "react";
import "./ModalCreate.css";

const ModalCreate = (props: {
  show: boolean;
  onWilderAdded: () => Function;
  onClose: Function;
}) => {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stackName, setStackName] = useState<string>("");
  // const [stackId, setStackId] = useState(0);
  // const [wilderId, setWilderId] = useState(0);

  if (!props.show) {
    return null;
  }

  const handleCreateStack = async (): Promise<void> => {
    await fetch(`http://localhost:3000/api/skills/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${stackName}`,
    });
    setStackName("");
  };

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/wilders/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&city=${city}`,
    });
    handleCreateStack();
    props.onWilderAdded();
    props.onClose();
    setName("");
    setCity("");
  };

  return (
    <div className="modal" onClick={(e) => props.onClose(e.target)}>
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
          <form className="form" action="POST" onSubmit={handleCreate}>
            <div className="input-container">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="city">city</label>
              <input
                type="text"
                className="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <label htmlFor="stack">stack</label>
              <input
                type="text"
                className="stack"
                value={stackName}
                onChange={(e) => {
                  setStackName(e.target.value);
                }}
              />
              <button className="btn" type="submit" value="Valider">
                {" "}
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
