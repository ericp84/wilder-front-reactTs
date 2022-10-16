import { useEffect, useState } from "react";
import "./ModalCreate.css";

const ModalCreate = (props: {
  show: boolean;
  onWilderAdded: () => Function;
  onClose: Function;
}) => {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stackName, setStackName] = useState<string>("");
  // const [stackList, setStackList] = useState<[]>([]);
  const [stackId, setStackId] = useState<number>(1);
  const [wilderId, setWilderId] = useState<number>(1);

  // const handleStackList = async (): Promise<void> => {
  //   const stackRequest = await fetch(`http://localhost:3000/api/skills`);
  //   const stackResponse = await stackRequest.json();
  //   setStackList(stackResponse);
  // };
  // useEffect(() => {
  //   handleStackList();
  // }, []);
  const handleUpvote = async () => {
    await fetch(`http://localhost:3000/api/upvotes`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `wilderId=${wilderId}&skillId=${stackId}`,
    });
    props.onWilderAdded();
  };

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const request = await fetch(`http://localhost:3000/api/wilders/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&city=${city}`,
    });
    const response = await request.json();
    setWilderId(response.id);
    handleUpvote();
    await handleCreateStack();
    props.onClose();
    setName("");
    setCity("");
  };

  const handleCreateStack = async (): Promise<void> => {
    const request = await fetch(`http://localhost:3000/api/skills/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${stackName}`,
    });
    const response = await request.json();
    setStackId(response.id);
    setStackName("");
    await handleUpvote();
  };

  const handleUpload = async () => {
    await fetch(`http://localhost:3000/api/upload`, {
      method: "POST",
    });
  };

  // useEffect(() => {
  //   props.onWilderAdded();
  // }, [props, stackId, wilderId]);

  if (!props.show) {
    return null;
  }

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
          <form
            className="form"
            action="POST"
            encType="multipart/form-data"
            onSubmit={handleCreate}
          >
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
              <label htmlFor="stack">add stack</label>
              <input
                type="text"
                className="stack"
                value={stackName}
                onChange={(e) => {
                  setStackName(e.target.value);
                }}
              />
              <form
                action="/api/upload"
                method="post"
                encType="multipart/form-data"
                className="upload"
              >
                <label htmlFor="avatar">add avatar</label>
                <input
                  type="file"
                  name="avatar"
                  className="file-upload"
                  onChange={handleUpload}
                />
              </form>
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
