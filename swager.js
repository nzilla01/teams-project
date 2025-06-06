const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Item Store API',
        description: 'API documentation for the Item Store application'
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server/route/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)