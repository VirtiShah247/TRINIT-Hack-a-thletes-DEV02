import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const customGraphToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

const client = new GraphQLClient(graphqlAPI as string, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${customGraphToken}`,
  },
});

const GetUserByEmail = async (email: string) => {
  const getUserByEmailQuery = gql`
    query MyQuery($email: String!) {
      student(where: { email: $email }) {
        id
        name
        email
        password
      }
    }
  `;

  const getTutorByEmailQuery = gql`
    query MyQuery($email: String!) {
      tutor(where: { email: $email }) {
        id
        name
        email
        password
      }
    }
  `;

  const getUserResponse: any = await client.request(getUserByEmailQuery, {
    email,
  });
  console.log("user response", getUserResponse.student);
  if (getUserResponse.student === null) {
    const getTutorRespose: any = await client.request(getTutorByEmailQuery, {
      email,
    });
    return { user: getTutorRespose.tutor };
  }
  return { user: getUserResponse.student };
};

export { GetUserByEmail };
