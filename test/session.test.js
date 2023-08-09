import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import config from "../src/config/config.js";

const {
  database: { dbTest },
  server: { port },
} = config;

const expect = chai.expect;
const api = supertest.agent(`http://localhost:${port}`);

describe("Pruebas del router de sesiones", () => {
  before(async function () {
    await mongoose.connect(dbTest);
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("Debe registrar un usuario y redirigir al perfil", async function () {
    const user = {
      username: "testuser",
      password: "testpassword",
      email: "testuser@example.com",
    };

    const response = await api.post("/api/sessions/register").send(user).redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/profile$/);
  });

  it("Debe fallar el registro de un usuario y redirigir al registro fallido", async function () {
    const user = {
      username: "existinguser",
      password: "testpassword",
      email: "existinguser@example.com",
    };

    const response = await api.post("/api/sessions/register").send(user).redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/failregister$/);
  });

  it("Debe iniciar sesión y redirigir al perfil", async function () {
    const credentials = {
      username: "testuser",
      password: "testpassword",
    };

    const response = await api.post("/api/sessions/login").send(credentials).redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/profile$/);
  });

  it("Debe fallar el inicio de sesión y redirigir al inicio de sesión fallido", async function () {
    const credentials = {
      username: "nonexistentuser",
      password: "testpassword",
    };

    const response = await api.post("/api/sessions/login").send(credentials).redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/faillogin$/);
  });

  it("Debe cerrar sesión y redirigir al inicio de sesión", async function () {
    const response = await api.get("/api/sessions/logout").redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/login$/);
  });

  it("Debe redirigir al perfil si el usuario ha iniciado sesión", async function () {
    const response = await api.get("/api/sessions/profile").redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/profile$/);
  });

  it("Debe redirigir al inicio de sesión si el usuario no ha iniciado sesión", async function () {
    const response = await api.get("/api/sessions/profile").redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/login$/);
  });

  it("Debe redirigir al inicio de sesión si el usuario ha iniciado sesión y solicita restaurar su contraseña", async function () {
    const response = await api.put("/api/sessions/restore").redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/login$/);
  });

  it("Debe redirigir a GitHub para iniciar sesión", async function () {
    const response = await api.get("/api/sessions/github").redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/https:\/\/github\.com\/login\/oauth\/authorize/);
  });

  it("Debe procesar el callback de GitHub y redirigir al perfil", async function () {
    const response = await api.get("/api/sessions/githubcallback").redirects(1);

    expect(response).to.have.status(200);
    expect(response).to.redirectTo(/\/api\/sessions\/profile$/);
  });
});
