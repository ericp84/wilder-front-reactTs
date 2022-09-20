import React, { useState } from "react";

const Skill = (props: {
  skills: { id: number; skill: { name: string }; upvote: number }[];
}) => {
  const [stackId, setStackId] = useState(0);

  const upcount = (id: number): void => {
    setStackId(id);
    handleUpvote();
  };
  const handleUpvote = async () => {
    await fetch(`http://localhost:3000/api/upvotes/${stackId}/upvote`);
  };

  return (
    <>
      <ul className="skills">
        {props.skills.map(
          (skill: { id: number; skill: { name: string }; upvote: number }) => {
            return (
              <li key={skill.id}>
                {skill.skill.name}
                <span
                  className="votes"
                  onClick={() => {
                    upcount(skill.id);
                  }}
                >
                  {skill.upvote}
                </span>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
};

export default Skill;
