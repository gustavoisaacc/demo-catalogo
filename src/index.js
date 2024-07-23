import { app } from "./app.js";
import { PORT } from "./config/config.js";
import { connectDB } from "./config/db.js";

//db
connectDB();

//server configuration
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
