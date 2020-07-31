if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/.env" });
}

const express = require("express");
require("./db"); //loads the local connection

const app = express();

/**
 * ROUTES IMPORT
 */
app.use(require("./routes"));

/**
 * SERVER LISTEN
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
