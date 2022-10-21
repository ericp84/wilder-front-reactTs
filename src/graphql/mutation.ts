import { gql } from "@apollo/client";

export const DELETE_WILDER = gql`
  mutation Mutation($deleteOneWilderId: ID!) {
    deleteOneWilder(id: $deleteOneWilderId) {
      id
      name
      city
      upvotes {
        id
      }
    }
  }
`;

export const UPDATE_WILDER = gql`
  mutation Mutation($city: String!, $name: String!, $updateWilderId: ID!) {
    updateWilder(city: $city, name: $name, id: $updateWilderId) {
      id
      name
      city
    }
  }
`;

export const CREATE_WILDER = gql`
  mutation CreateWilder($city: String!, $name: String!) {
    createWilder(city: $city, name: $name) {
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

export const CREATE_SKILL = gql`
  mutation Mutation($name: String!) {
    createSkill(name: $name) {
      id
      name
    }
  }
`;
