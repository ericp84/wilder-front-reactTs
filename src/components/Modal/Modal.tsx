import { useState } from "react";
import "./Modal.css";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_WILDERS = gql`
  query Wilders {
    wilders {
      id
      name
      city
      upvotes {
        id
        upvotes
        skill {
          id
          name
        }
      }
    }
  }
`;

const UPDATE_WILDER = gql`
  mutation Mutation($city: String!, $name: String!, $updateWilderId: ID!) {
    updateWilder(city: $city, name: $name, id: $updateWilderId) {
      id
      name
      city
    }
  }
`;

const Modal = (props: {
  show: any;
  id: any;
  refresh: () => void;
  onClose: Function;
}) => {
  const [newName, setNewName] = useState<string>("");
  const [newCity, setNewCity] = useState<string>("");

  const [updateWilder] = useMutation(UPDATE_WILDER, {
    refetchQueries: [{ query: GET_WILDERS }],
  });

  if (!props.show) {
    return null;
  }

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateWilder({
      variables: { name: newName, city: newCity, updateWilderId: props.id },
    });
    props.refresh();
    props.onClose();
    setNewName("");
    setNewCity("");
  };

  return (
    <div className="modal-update" onClick={(e) => props.onClose(e.target)}>
      <div
        className="modal-content-update"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-header-update">
          <h2>TITLE</h2>
        </div>
        <div className="modal-body-update">
          <form className="form" onSubmit={handleUpdate}>
            <div className="input-container-update">
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
