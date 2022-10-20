import React, { useCallback, useEffect, useState } from "react";
import { Iskill } from "../../interfaces";
import { useMutation, gql } from "@apollo/client";

// interface Iskill {
//   skills: {
//     id: number;
//     skill: { name: string };
//     upvote: number;
//     upvotes: number;
//   }[];
//   // onUpvote: Function;
// }

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

const UPVOTE = gql`
  mutation Mutation($skillId: ID!, $wilderId: ID!, $upvoteId: ID!) {
    upVote(skillId: $skillId, wilderId: $wilderId, upvoteId: $upvoteId) {
      id
      upvotes
    }
  }
`;

const Skill = (props: Iskill) => {
  const [stackId, setStackId] = useState<number>(1);

  const [upvote, { data, loading, error }] = useMutation(UPVOTE, {
    refetchQueries: [{ query: GET_WILDERS }],
  });

  const handleUpvote = useCallback(async (): Promise<void> => {
    await fetch(`http://localhost:3000/api/upvotes/${stackId}/upvote`, {
      method: "PUT",
    });
  }, [stackId]);

  const upcount = useCallback(
    async (id: number): Promise<void> => {
      await handleUpvote().then(() => props.refresh());
    },
    [handleUpvote]
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
