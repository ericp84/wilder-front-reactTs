import { useState } from "react";
import "./ModalCreate.css";
import { useMutation } from "@apollo/client";
import { CREATE_WILDER, CREATE_SKILL } from "../../graphql/mutation";
import GET_WILDERS from "../../graphql/queries";

const ModalCreate = (props: {
  show: boolean;
  onWilderAdded: () => Function;
  onClose: Function;
  id: number;
}) => {
  console.log("🚀 ~ file: ModalCreate.tsx ~ line 166 ~ props", props.id);

  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stackName, setStackName] = useState<string>("");
  const [createWilder] = useMutation(CREATE_WILDER, {
    refetchQueries: [{ query: GET_WILDERS }],
  });
  const [createSkill] = useMutation(CREATE_SKILL, {
    refetchQueries: [{ query: GET_WILDERS }],
  });

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createWilder({ variables: { name, city } });
    createSkill({ variables: { name: stackName } });
    props.onWilderAdded();
    props.onClose();
  };

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
            onSubmit={(e) => {
              handleCreate(e);
            }}
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
                  // onChange={handleUpload}
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
