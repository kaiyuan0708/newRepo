'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('@hapi/joi');

const init = async () => {

    const server = Hapi.server({
        port: 3020,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/hello/{name}',
        handler: function (request, h) {
    
            return `Hello ${request.params.name}!`;
        },
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    name: Joi.string().min(3).max(10)
                })
            }, description: 'tags to API operation can be handled differently by tools & libraries'
        }
    });

    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                description: 'This is a sample example of API documentation.',
                version: Pack.version,
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);


    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
