import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import config from "../src/config/config.js";
import { CartsMock } from "./mocks/carts.mocks.js";

const {
  database: { dbTest },
  server: { port },
} = config;

const expect = chai.expect;
const api = supertest.agent(`http://localhost:${port}`);
const cartsMock = new CartsMock();

describe("Pruebas del router de carritos", () => {
  before(async function () {
    await mongoose.connect(dbTest);
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("Debe obtener todos los carritos", async function () {
    const response = await api.get("/api/carts");

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
  });

  it("Debe obtener un carrito por su ID", async function () {
    const cart = cartsMock.cartWithId();

    await api.post("/api/carts").send(cart);

    const response = await api.get(`/api/carts/${cart._id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("_id", cart._id);
  });

  it("Debe crear un nuevo carrito", async function () {
    const cart = cartsMock.cart();

    const response = await api.post("/api/carts").send(cart);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("_id");
  });

  it("Debe agregar un producto a un carrito", async function () {
    const cart = cartsMock.cartWithId();
    const product = cartsMock.product();

    await api.post("/api/carts").send(cart);

    const response = await api.post(`/api/carts/${cart._id}/products/${product._id}`).send(product);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body.quantity).to.equal(1);
    expect(response.body.total).to.equal(product.price);
  });

  it("Debe actualizar la cantidad de un producto en un carrito", async function () {
    const cart = cartsMock.cartWithId();
    const product = cartsMock.productWithQuantity(2);

    await api.post("/api/carts").send(cart);

    const response = await api.put(`/api/carts/${cart._id}/products/${product._id}`).send({ quantity: 3 });

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body.quantity).to.equal(3);
    expect(response.body.total).to.equal(product.price * 3);
  });

  it("Debe vaciar un carrito", async function () {
    const cart = cartsMock.cartWithId();

    await api.post("/api/carts").send(cart);

    const response = await api.delete(`/api/carts/${cart._id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body.quantity).to.equal(0);
    expect(response.body.total).to.equal(0);
  });

  it("Debe eliminar un producto de un carrito", async function () {
    const cart = cartsMock.cartWithId();
    const product = cartsMock.productWithQuantity(2);

    await api.post("/api/carts").send(cart);
    await api.put(`/api/carts/${cart._id}/products/${product._id}`).send({ quantity: 3 });

    const response = await api.delete(`/api/carts/${cart._id}/products/${product._id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body.quantity).to.equal(0);
    expect(response.body.total).to.equal(0);
  });

  it("Debe realizar la compra de un carrito", async function () {
    const cart = cartsMock.cartWithId();
    const product = cartsMock.productWithQuantity(2);

    await api.post("/api/carts").send(cart);
    await api.put(`/api/carts/${cart._id}/products/${product._id}`).send({ quantity: 3 });

    const response = await api.post(`/api/carts/${cart._id}/purchase`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.equal("Compra realizada exitosamente");
  });
});
