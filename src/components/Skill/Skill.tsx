import React, { useCallback, useEffect, useState } from "react";
import { Iskill } from "../../interfaces";
// import { useMutation } from "@apollo/client";
// import GET_WILDERS from "../../graphql/queries";
// import { UPVOTE } from "../../graphql/mutation";

const Skill = (props: Iskill) => {
  const [stackId, setStackId] = useState<number>(1);

  // const [upvote, { data, loading, error }] = useMutation(UPVOTE, {
  //   refetchQueries: [{ query: GET_WILDERS }],
  // });

  const handleUpvote = useCallback(async (): Promise<void> => {
    await fetch(`http://localhost:3000/api/upvotes/${stackId}/upvote`, {
      method: "PUT",
    });
  }, [stackId]);

  const upcount = useCallback(
    async (id: number): Promise<void> => {
      await handleUpvote().then(() => props.refresh());
    },
    [handleUpvote, props]
  );

  useEffect(() => {
    upcount(stackId);
    handleUpvote();
  }, [handleUpvote, stackId, upcount]);

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
                  setStackId(skill.id);
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
