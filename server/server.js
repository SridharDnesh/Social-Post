const express = require("express");

const app = express();

/**
 * ROUTES IMPORT
 */
app.use(require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
