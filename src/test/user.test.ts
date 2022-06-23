import { GraphQLResponse } from "apollo-server-core";

import { User } from "../entities/User";
import { initServer, server } from "../server";

beforeAll(async () => {
  await initServer();
});

it('user CRUD', async () => {
  const user = new User();
  user.name = 'test user';
  user.phone = '01000000000';

  const result: GraphQLResponse = await server.executeOperation({
    query: `
    mutation ($data: CreateUserInput!) {
      createUser(data: $data) {
        name
        phone
      }
    }
    `,
    variables: { 
      data: {
        name: user.name, 
        phone: user.phone  
      } 
    }
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).toBeTruthy();
  if (result.data) {
    expect(result.data.createUser.name).toBe(user.name);
  }
}); 