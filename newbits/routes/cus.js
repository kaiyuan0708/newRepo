'use strict';
const Joi = require('@hapi/joi');

module.exports = [
    {
        method: 'PUT',
        path: '/addCustomer',
        options: {
            description: 'Add a new customer',
            tags: ['api', 'cus'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                payload: Joi.object({
                    customer_full_name: Joi.string().required(),
                    company_name: Joi.string().required(),
                    company_type: Joi.string().required(),
                    customer_designation: Joi.string().required(),
                    country_code: Joi.string().required(),
                    contact: Joi.string().required(),
                    email: Joi.string().required(),
                    address: Joi.string().required(),
                    website_type: Joi.string().required(),
                    website_url: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const addCus = await request.pgsql.query(
                `INSERT INTO customer ("customer_full_name","company_name","company_type","customer_designation","country_code","contact","email","address","website_type","website_url") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
                [request.payload.customer_full_name, request.payload.company_name, request.payload.company_type, request.payload.customer_designation, request.payload.country_code, request.payload.contact, request.payload.email, request.payload.address, request.payload.website_type, request.payload.website_url]
            )
            //return addCus.rows[0]

            const checkCustomer = await request.pgsql.query(
                `SELECT * FROM "customer" WHERE "customer_full_name" = $1 AND "company_name" = $2 LIMIT 1`,
                [request.payload.customer_full_name,request.payload.company_name]
            )

            const addAddress = await request.pgsql.query(
                `INSERT INTO address ("address","customer_id") VALUES ($1, $2) RETURNING *;`,
                [request.payload.address,checkCustomer.rows[0].customer_id]
            )
            //return addAddress.rows[0]

            const addContact = await request.pgsql.query(
                `INSERT INTO contact ("contact_number","customer_id","country_code") VALUES ($1, $2, $3) RETURNING *;`,
                [request.payload.contact,checkCustomer.rows[0].customer_id,request.payload.country_code]
            )
            
            const addEmail = await request.pgsql.query(
                `INSERT INTO email ("email_address","customer_id") VALUES ($1, $2) RETURNING *;`,
                [request.payload.email,checkCustomer.rows[0].customer_id]
            )

            const addWebsite = await request.pgsql.query(
                `INSERT INTO website ("website_url","website_type","customer_id") VALUES ($1, $2, $3) RETURNING *;`,
                [request.payload.website_url,request.payload.website_type,checkCustomer.rows[0].customer_id]
            )
            return "Add Customer successful"

        }
    },
    //add customer end
    {
        method: 'GET',
        path: '/customer',
        options: {
            description: 'Customer list',
            tags: ['api', 'cus'],
            /*auth: {
                scope: ['admin']
            },*/
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            }
        },
        handler: async (request, h) => {
            const getCustomerList = await request.pgsql.query(`SELECT * FROM customer`)
            return getCustomerList.rows
        }
    },
    //get customer list end
    {
        method: 'POST',
        path: '/deleteCustomer/{customer_id}',
        options: {
            description: 'Delete customer',
            tags: ['api', 'cus'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    customer_id: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const todos = await request.pgsql.query(
                `UPDATE public.customer SET "delete_flag" = true WHERE customer_id = $1 RETURNING *`,
                [request.params.customer_id]
            )
            return todos.rows[0]
        }
    },
    //delete customer end (update delete flag)
    {
        method: 'POST',
        path: '/updateCustomerInfo/{customer_id}',
        options: {
            description: 'Update customer information',
            tags: ['api', 'cus'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    customer_id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    customer_full_name: Joi.string(),
                    company_name: Joi.string(),
                    company_type: Joi.string(),
                    customer_designation: Joi.string(),
                    country_code: Joi.string(),
                    contact: Joi.string(),
                    email: Joi.string(),
                    address: Joi.string(),
                    website_type: Joi.string(),
                    website_url: Joi.string()
                })
            }
        },
        handler: async (request, h) => {
            const checkCustomer = await request.pgsql.query(
                `SELECT * FROM "customer" WHERE "customer_id" = $1 LIMIT 1`,
                [request.params.customer_id]
            )
            if (request.payload.customer_full_name == null) //1
            {
                request.payload.customer_full_name = checkCustomer.rows[0].customer_full_name;
                //request.payload.customer_full_name="try customer name";
            }
            if (request.payload.company_name == null) //2
            {
                request.payload.company_name = checkCustomer.rows[0].company_name;
            }
            if (request.payload.company_type == null) //3
            {
                request.payload.company_type = checkCustomer.rows[0].company_type;
            }
            if (request.payload.customer_designation == null) //4
            {
                request.payload.customer_designation = checkCustomer.rows[0].customer_designation;
            }
            if (request.payload.country_code == null) //5
            {
                request.payload.country_code = checkCustomer.rows[0].country_code;
            }
            if (request.payload.contact == null) //6
            {
                request.payload.contact = checkCustomer.rows[0].contact;
            }
            if (request.payload.email == null) //7
            {
                request.payload.email = checkCustomer.rows[0].email;
            }
            if (request.payload.address == null) //8
            {
                request.payload.address = checkCustomer.rows[0].address;
            }
            if (request.payload.website_type == null) //9
            {
                request.payload.website_type = checkCustomer.rows[0].website_type;
            }
            if (request.payload.website_url == null) //10
            {
                request.payload.website_url = checkCustomer.rows[0].website_url;
            }


            const todos = await request.pgsql.query(
                `UPDATE public.customer SET "customer_full_name" = $1 , "company_name" = $2, "company_type" = $3,"customer_designation" = $4,"country_code" = $5, "contact" = $6, "email" = $7, "address" = $8, "website_type" = $9, "website_url" = $10, "updated_dt" = CURRENT_TIMESTAMP WHERE customer_id = $11 RETURNING *`,
                [request.payload.customer_full_name, request.payload.company_name, request.payload.company_type, request.payload.customer_designation, request.payload.country_code, request.payload.contact, request.payload.email, request.payload.address, request.payload.website_type, request.payload.website_url, request.params.customer_id]
            )
            /*const updateDate = await request.pgsql.query(
                `UPDATE public.customer SET "updated_dt" = CURRENT_TIMESTAMP WHERE customer_id = $1 RETURNING *`,
                [request.params.customer_id]
            )*/
            return todos.rows[0]
        }
    }
    //update customer info end
]
