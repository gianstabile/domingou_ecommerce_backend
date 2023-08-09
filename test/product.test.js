import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import config from "../src/config/config.js";
import { ProductsMock } from "./mocks/products.mocks.js";

const {
  database: { dbTest },
  server: { port },
} = config;

const expect = chai.expect;
const api = supertest.agent(`http://localhost:${port}`);
const productsMock = new ProductsMock();

describe("Pruebas del router de productos", () => {
  before(async function () {
    await mongoose.connect(dbTest);
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("Debe obtener todos los productos", async function () {
    const response = await api.get("/api/products");

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.length(0);
  });

  it("Debe obtener un producto por su ID", async function () {
    const product = productsMock.productWithId();

    await api.post("/api/products").send(product);

    const response = await api.get(`/api/products/${product._id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("_id", product._id);
  });

  it("Debe crear un nuevo producto", async function () {
    const product = productsMock.product();

    const response = await api.post("/api/products").send(product);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("_id");

    const productFromDb = await productsMock.getProductById(response.body._id);
    expect(productFromDb).to.deep.equal(product);
  });

  it("Debe actualizar un producto existente", async function () {
    const product = productsMock.productWithId();
    const updatedProduct = { ...product, price: 2000 };

    await api.post("/api/products").send(product);

    const response = await api.put(`/api/products/${product._id}`).send(updatedProduct);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("price", 2000);

    const productFromDb = await productsMock.getProductById(response.body._id);
    expect(productFromDb.price).to.equal(2000);
  });

  it("Debe eliminar un producto existente", async function () {
    const product = productsMock.productWithId();

    await api.post("/api/products").send(product);

    const response = await api.delete(`/api/products/${product._id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");

    const productFromDb = await productsMock.getProductById(product._id);
    expect(productFromDb).to.be.null;
  });
});
