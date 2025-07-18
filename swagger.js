const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = swaggerSetup;
