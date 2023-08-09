import { faker } from "@faker-js/faker";

export class CartsMock {
  constructor() {}

  cart() {
    const cart = {
      id: faker.random.uuid(),
      user_id: faker.random.uuid(),
      total: faker.random.number(),
      items: [
        {
          product_id: faker.random.uuid(),
          quantity: faker.random.number(),
        },
      ],
    };
    return cart;
  }
}
