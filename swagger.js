const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
      title: 'My API',
      description: 'Description'
    },
    host: 'localhost:8000'
  };

  const outputFile = './swagger-output.json';
  const routes = ['Routes/adminRoute.js', 'Routes/teacherRoute.js' , 'Routes/childrensRoute.js'];

  swaggerAutogen(outputFile, routes, doc);

  