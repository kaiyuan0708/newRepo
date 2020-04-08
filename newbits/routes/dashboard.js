'use strict';
const Joi = require('@hapi/joi');

module.exports = [
    {
        method: 'GET',
        path: '/getOverall',
        options: {
            description: 'Dashboard - overall',
            tags: ['api', 'dashboard'],
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
            const getCustomer = await request.pgsql.query(`SELECT COUNT(customer_id) as Customer FROM customer`)
            const getContact = await request.pgsql.query(`SELECT COUNT(contact_id) as Contact FROM contact`)
            const getEmail = await request.pgsql.query(`SELECT COUNT(email_id) as Email FROM email`)
            const getAddress = await request.pgsql.query(`SELECT COUNT(address_id) as Address FROM address`)
            return JSON.stringify(getCustomer.rows[0]) + JSON.stringify(getContact.rows[0]) + JSON.stringify(getEmail.rows[0]) + JSON.stringify(getAddress.rows[0])
        }
    },
    //dashboard overall end
    {
        method: 'GET',
        path: '/getTopCompany',
        options: {
            description: 'Dashboard - get top company',
            tags: ['api', 'dashboard'],
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
            const TopCompany = await request.pgsql.query(`SELECT company_name, COUNT(company_name) from customer WHERE company_name is not null group by 1 order by 2 DESC limit 10`)
            return TopCompany.rows
        }
    },
    //get top 10 company end
    {
        method: 'GET',
        path: '/getTopCompanyType',
        options: {
            description: 'Dashboard - get top company type ',
            tags: ['api', 'dashboard'],
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
            const TopCompanyType = await request.pgsql.query(`SELECT company_type, COUNT(company_type) from customer WHERE company_type is not null group by 1 order by 2 DESC limit 10`)
            return TopCompanyType.rows
        }
    },
    //get top 10 company type end
    {
        method: 'GET',
        path: '/getTopCustomerDesignation',
        options: {
            description: 'Dashboard - get top customer designation ',
            tags: ['api', 'dashboard'],
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
            const TopCustomerDesignation = await request.pgsql.query(`SELECT customer_designation, COUNT(customer_designation) from customer WHERE customer_designation is not null group by 1 order by 2 DESC limit 10`)
            return TopCustomerDesignation.rows
        }
    },
    //get top 10 customer designation end
    {
        method: 'GET',
        path: '/getTopContactCountry',
        options: {
            description: 'Dashboard - get top contact country ',
            tags: ['api', 'dashboard'],
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
            const TopContactCountry = await request.pgsql.query(`SELECT country_code, COUNT(country_code) from contact group by 1 order by 2 DESC limit 10`)
            return TopContactCountry.rows
        }
    },
    //get top 10 contact country end
]