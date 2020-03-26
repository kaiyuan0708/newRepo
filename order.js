"use strict";

const dotenv = require( "dotenv" );
const Hapi = require( "@hapi/hapi" );
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('@hapi/joi');
const Inert = require('@hapi/inert');
const Pack = require('./package');
const sql = require( "./sql" );
const JWT = require('jsonwebtoken'); 
const lib = require('./hapi-auth-jwt2/lib');
//const redis = require('redis');



const secret = 'NeverShareYourSecret';
const people = { // our "users database"
    1: {
      id: 1,
      name: 'Kai Yuan',
      scope:'admin'
    },
    2: {
        id: 2,
        name: 'Candy Ng',
        scope:'superadmin'
      }
};
const token = JWT.sign(people[1], secret); 
const token2 = JWT.sign(people[2], secret);
console.log(token,people[1]);
console.log(token2,people[2]);




const validate = async function (decoded, request, h) {
    console.log(" - - - - - - - decoded token:");
  console.log(decoded);
  console.log(" - - - - - - - request info:");
  console.log(request.info);
  console.log(" - - - - - - - user agent:");
  console.log(request.headers['user-agent']);

    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};

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

    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: Pack.version,
            },
        };

    await server.register([
        sql,
        Inert,
        Vision,
        lib,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.auth.strategy('jwt', 'jwt',
    { key: 'NeverShareYourSecret', // Never Share your secret key
      validate, // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] }
    });

    server.auth.default('jwt');

    await server.start();
    console.log( "Server running on %s", server.info.uri );

  
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
            description: 'Display All Orders',
            notes: 'Display all order details',
            tags: ['api'],
            auth:{
                strategy: 'jwt',
                access: [{         // you can configure different access for each route
                    scope:[`superadmin`] // each access can define a set of scopes with type prefix ('+','-' or empty)
                  }]
            }
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
            description: 'Display Specific Order Details',
            notes: 'Display order details by getting order id from url',
            tags: ['api'],
            auth:{
                scope:[`admin`,`superadmin`]
            }

        }
    });


    //POST
    server.route({
        method: "POST",
        path: "/addOrder",
        handler: async ( request, h ) => {
            try {
                const { orderid, startDate, endDate } = request.payload;
                //const orderid="order4";
                //const startDate="2020-01-01";
                //const endDate="2020-02-02";
                const addOrder = await h.sql`INSERT INTO public.orders (order_id,s_date,e_date)
                VALUES
                ( ${ orderid }, ${ startDate } , ${ endDate } )` ;
                return addOrder;
            } catch ( err ) {
                console.log( err );
                return "Add order fail";
            }
        },
        options: {
            tags: ['api'],
            auth:{
                mode:'optional'
            },
            validate: {
                payload: Joi.object({
                    orderid: Joi.string(),
                    startDate: Joi.date(),
                    endDate: Joi.date()

                }
                )
            }
        }
    });

    //PUT
    server.route({
        method: "PUT",
        path: "/updateOrder",
        handler: async ( request, h ) => {
            try {
                //const neworderid="modified";
                //const newsdate="1998-01-05";
                //const newedate="1998-07-08";
                const { existorderid,neworderid, newsdate, newedate } = request.payload;
                const updateOrder = await h.sql`UPDATE public.orders 
                SET order_id = ${ neworderid }, s_date = ${ newsdate } , e_date = ${ newedate }
                WHERE order_id = ${ existorderid }`;
                return updateOrder;
            } catch ( err ) {
                console.log( err );
                return "update order fail";
            }
        },options: {
            tags: ['api'],
            auth: {
                mode:`optional`
            },
            validate: {
                payload: Joi.object({
                    existorderid: Joi.string(),
                    neworderid: Joi.string(),
                    newsdate: Joi.date(),
                    newedate: Joi.date()

                }
                )
            }
        }
    });

    //delete
    server.route({
        method: "DELETE",
        path: "/deleteOrder/{order_id}",
        //path: "/deleteOrder",
        handler: async ( request, h ) => {
            try {
                const deleteOrder = await h.sql`DELETE FROM public.orders 
                WHERE order_id = ${request.params.order_id}`;
                //const deleteOrder = await h.sql`DELETE FROM public.orders ` ;
                //return `Delete Order ${ request.params.orderid } sucess`;
                return deleteOrder;
            } catch ( err ) {
                console.log( err );
                return "delete order fail";
            }
        },options: {
            description: 'Delete Order',
            notes: 'Delete order by getting order id from url',
            tags: ['api'],
            auth:{
                scope:['superadmin']
            }
        }
    });

  
    server.route([
        {
            method: "GET", path: "/", config: { auth: false },
            handler: function(request, h) {
            return 'Welcome';
            }
        },
        {
            method: 'GET', path: '/restricted', config: { auth: 'jwt' },
            handler: function(request, h) {
            const response = h.response({text: 'You used a Token!'});
            response.header("Authorization", request.headers.authorization);
            return response;
            }
        }
        ]);
};
  


process.on( "unhandledRejection", ( err ) => {
  console.log( err );
  process.exit( 1 );
} );

init();
