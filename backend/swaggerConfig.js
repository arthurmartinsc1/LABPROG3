import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API do Sistema de Self-Order",
            version: "1.0.0",
            description: "Documentação da API usando Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor Local",
            },
        ],
    },
    apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
