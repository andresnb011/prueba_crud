const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clientes', itemsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
