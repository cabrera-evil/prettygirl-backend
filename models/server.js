const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { connect } = require("../config/database");
const { config }= require("../config/cloudinary");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      booking: "/api/bookings",
      users: "/api/users",
      bags: "/api/bags"
    };

    // Connect to database
    this.connectToDatabase();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Body Parser
    this.app.use(express.json());

    // Public folder
    this.app.use(express.static("public"));

    // File Upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  async connectToDatabase() {
    await connect();
    await config();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.booking, require("../routes/bookings"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.bags, require("../routes/bags"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
