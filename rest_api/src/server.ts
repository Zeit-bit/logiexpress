import app from './app.js';
import { connectDatabase } from './config/db.js';

const PORT = 3000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
