const app = require("./app");
require ("./bootstrap");

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Aplicacao rodando na porta ${port}`);
});
