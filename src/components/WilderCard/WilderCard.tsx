import Blank_Profile from "../../assets/Blank_Profile.png";
import Skill from "../Skill/Skill";
import Modal from "../Modal/Modal";
import "./WilderCard.css";
import GET_WILDERS from "../../graphql/queries";
import { DELETE_WILDER } from "../../graphql/mutation";
import { useState } from "react";
import { Iwilder } from "../../interfaces";
import { useQuery, useMutation } from "@apollo/client";

const WilderCard = (props: Iwilder): JSX.Element => {
  const [id, setId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data } = useQuery(GET_WILDERS);
  console.log("🚀 ~ file: WilderCard.tsx ~ line 16 ~ WilderCard ~ data", data);

  const [deleteWilder] = useMutation(DELETE_WILDER, {
    refetchQueries: [{ query: GET_WILDERS }],
  });

  const handleDelete = async (id: number) => {
    deleteWilder({ variables: { deleteOneWilderId: id } });
    props.onWilderDeleted();
    const { idFromWilder } = props;
    idFromWilder(id);
  };

  const handleUpdate = async (id: number) => {
    setId(id);
    setShowModal(true);
  };

  return (
    <section className="card-row">
      <Modal
        id={id}
        onClose={() => setShowModal(!showModal)}
        show={showModal}
        refresh={() => props.onWilderDeleted()}
      />
      {data?.wilders.map((wild: Iwilder) => {
        console.log(
          "🚀 ~ file: WilderCard.tsx ~ line 85 ~ {data?.wilders.map ~ wild",
          wild
        );

        return (
          <article className="card" key={wild.id}>
            <img src={Blank_Profile} alt="Jane Doe Profile" />
            <h2>{wild.name}</h2>
            <h4>{wild.city}</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h4>Wild Skills</h4>
            {/* <Skill skills={wild.upvotes} onUpvote={props.onWilderDeleted()} /> */}
            <Skill
              skills={wild.upvotes}
              id={0}
              name={""}
              upvote={0}
              upvotes={0}
              refresh={() => props.onWilderDeleted()}
            />
            <div className="btn-cont">
              <button
                className="btn"
                onClick={() => {
                  handleDelete(wild.id);
                }}
              >
                Delete
              </button>
              <button
                className="btn"
                onClick={() => {
                  handleUpdate(wild.id);
                }}
              >
                Update
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default WilderCard;
