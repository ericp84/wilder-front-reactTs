import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation Mutation($deleteOneUserId: ID!) {
    deleteOneUser(id: $deleteOneUserId) {
      id
      name
      city
      upvotes {
        id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($city: String!, $name: String!, $updateUserId: ID!) {
    updateUser(city: $city, name: $name, id: $updateUserId) {
      id
      name
      city
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($city: String!, $name: String!) {
    createUser(city: $city, name: $name) {
      id
      name
      city
    }
  }
`;

export const CREATE_UPVOTE = gql`
  mutation Mutation($skillId: ID!, $wilderId: ID!) {
    createUpvote(skillId: $skillId, wilderId: $wilderId) {
      id
      upvotes
    }
  }
`;

export const UPVOTE = gql`
  mutation Mutation($skillId: ID!, $wilderId: ID!, $upvoteId: ID!) {
    upVote(skillId: $skillId, wilderId: $wilderId, upvoteId: $upvoteId) {
      id
      upvotes
    }
  }
`;

export const ADD_UPVOTE = gql`
  mutation Mutation($upvoteId: ID!) {
    upVote(upvoteId: $upvoteId) {
      id
      upvotes
    }
  }
`;

export const CREATE_SKILL = gql`
  mutation Mutation($name: String!) {
    createSkill(name: $name) {
      id
      name
    }
  }
`;
