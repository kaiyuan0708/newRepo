"use strict";

const dotenv = require( "dotenv" );
const Hapi = require( "@hapi/hapi" );
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('@hapi/joi');

const sql = require( "./sql" );

const createServer = async () => {
  const server = Hapi.server( {
    port: process.env.PORT || 8080,
    host: process.env.HOST || "localhost"
  } );


  return server;
};

const init = async () => {
    dotenv.config();
    const server = await createServer();
    await server.start();
    console.log( "Server running on %s", server.info.uri );

    await server.register( [ sql ] );
    //select 
    server.route({
        method: "GET",
        path: "/getOrder",
        handler: async ( request, h ) => {
            try {
                const allOrder = await h.sql`SELECT * FROM public.orders`;
                return allOrder;
            } catch ( err ) {
                console.log( err );
                return "order(s) fail to display";
            }
        },options: {
            tags: ['api']
        }
    });

     //select by order id
     server.route({
        method: "GET",
        path: "/getOrder/{orderid}",
        handler: async ( request, h ) => {
            try {
                const orderByID = await h.sql`SELECT * FROM public.orders where order_id = ${request.params.orderid}`;
                return orderByID;
            } catch ( err ) {
                console.log( err );
                return "order entered not found";
            }
        },options: {
            tags: ['api']
        }
    });


};
  

process.on( "unhandledRejection", ( err ) => {
  console.log( err );
  process.exit( 1 );
} );

init();