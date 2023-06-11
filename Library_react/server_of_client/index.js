const express = require("express");
const cors = require("cors");

const client = express();
client.use(cors({ origin: '*' }));
client.use(express.static('../library_react/build'));

client.listen(3001);
