import app from "./app.js";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
