import { faker } from "@faker-js/faker";

export class SessionsMock {
  constructor() {}

  session = () => {
    const session = {
      id: faker.random.uuid(),
      username: faker.internet.username(),
      password: faker.internet.password(),
      expiresAt: faker.date.future(),
    };
    return session;
  };
}
