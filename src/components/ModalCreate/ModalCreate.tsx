import { useState } from "react";
import "./ModalCreate.css";
import { useMutation, gql } from "@apollo/client";
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

const CREATE_WILDER = gql`
  mutation CreateWilder($city: String!, $name: String!) {
    createWilder(city: $city, name: $name) {
      id
      name
      city
    }
  }
`;
// const CREATE_UPVOTE = gql`
//   mutation CreateUpvote($skillId: ID!, $wilderId: ID!) {
//     createUpvote(skillId: $skillId, wilderId: $wilderId) {
//       id
//       upvotes
//     }
//   }
// `;
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
  // const [stackList, setStackList] = useState<[]>([]);
  // const [stackId, setStackId] = useState<number>(1);
  // const [wilderId, setWilderId] = useState<number>(1);

  const [createWilder] = useMutation(CREATE_WILDER, {
    refetchQueries: [{ query: GET_WILDERS }],
  });
  // const [createUpvote] = useMutation(CREATE_UPVOTE, {
  //   refetchQueries: [{ query: GET_WILDERS }],
  // });

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createWilder({ variables: { name, city } });
    props.onWilderAdded();
    props.onClose();
  };
  // const handleUpvote = async () => {
  //   await fetch(`http://localhost:3000/api/upvotes`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `wilderId=${wilderId}&skillId=${stackId}`,
  //   });
  //   props.onWilderAdded();
  // };

  // const handleCreateStack = async (): Promise<void> => {
  //   createUpvote({variables: {skillId: stackId, wilderId: wilderId}})
  //   setStackName("");
  //   await handleUpvote();
  // };

  // const handleUpload = async () => {
  //   await fetch(`http://localhost:3000/api/upload`, {
  //     method: "POST",
  //   });
  // };

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
