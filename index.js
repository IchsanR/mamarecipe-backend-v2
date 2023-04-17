const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const { PORT } = require("./src/helper/env");
const userRouter = require("./src/routes/user.routes");
const recipeRouter = require("./src/routes/recipe.routes");

const app = express();

app.use(
	cors({
		origin: "localhost",
	})
);
app.use(helmet());
app.use(xss());
app.use(bodyParser.json());
app.use(userRouter);
app.use(recipeRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
