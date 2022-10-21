import { gql } from "@apollo/client";

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

export default GET_WILDERS;
