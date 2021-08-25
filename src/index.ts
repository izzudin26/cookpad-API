import express, { Application, application } from "express";

const port = process.env.PORT || 8080;

class App {
  constructor(public app: Application = express()) {
    this.plugins();
    this.routes();
  }

  plugins() {
    this.app.use(express.json());
  }

  routes() {}
}

const app = new App().app;
app.listen(port, () => {
  console.log(`Running on http://[::]:${port}`);
});
