import React, { useEffect, useState } from "react";
import { Iskill } from "../../interfaces";

// interface Iskill {
//   skills: {
//     id: number;
//     skill: { name: string };
//     upvote: number;
//     upvotes: number;
//   }[];
//   // onUpvote: Function;
// }

const Skill = (props: Iskill) => {
  const [stackId, setStackId] = useState<number>(0);

  const upcount = (id: number): void => {
    props.refresh();
    setStackId(id);
    handleUpvote();
  };

  const handleUpvote = async (): Promise<void> => {
    await fetch(`http://localhost:3000/api/upvotes/${stackId}/upvote`, {
      method: "PUT",
    });
  };

  return (
    <>
      <ul className="skills">
        {props.skills.map((skill: any) => {
          return (
            <li key={skill.id}>
              {skill.skill.name}
              <span
                className="votes"
                onClick={() => {
                  upcount(skill.id);
                }}
              >
                {skill.upvotes}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Skill;
