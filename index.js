require("dotenv").config();
const app = require('./src/server');

const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV}`));