'use strict';
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT = require('jsonwebtoken');

module.exports = [
    {
        method: 'POST',
        path: '/login',
        options: {
            description: 'Login with username and password',
            notes: 'Staff Login',
            tags: ['api', 'try'],
            auth: false,
            validate: {
                payload: Joi.object({
                    logonid: Joi.string().required(),
                    logonpsw: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { logonid, logonpsw } = request.payload
                const checkUser = await request.pgsql.query(
                    `SELECT * FROM "staff" WHERE "logon_id" = $1 LIMIT 1`,
                    [logonid]
                )
                if (checkUser.rowCount == 0) {
                    return new Boom.badRequest('Invalid Username or Password');
                }

                const isPasswordMatched = await bcrypt.compare(logonpsw, checkUser.rows[0].logon_password);
                if (!isPasswordMatched) {
                    return new Boom.badRequest('Invalid Username or Password');
                }

                const ipAddress = request.headers['x-real-ip'] || request.info.remoteAddress;
                const newSession = await request.pgsql.query(
                    `INSERT INTO "session" ("staff_id", "ip_address") VALUES ($1, $2) RETURNING *`,
                    [checkUser.rows[0].staff_id, ipAddress]

                )
                const updateLoginDate = await request.pgsql.query(
                    `UPDATE public.staff SET "last_logon_dt" = CURRENT_TIMESTAMP WHERE staff_id = $1 RETURNING *`,
                    [checkUser.rows[0].staff_id]
                )

                await request.redis.client.set(`session_${newSession.rows[0].session_id}`, JSON.stringify({
                    scope: checkUser.rows[0].user_type,
                    username: checkUser.rows[0].logon_id,
                    staff_id: checkUser.rows[0].staff_id
                }))

                const token = JWT.sign({ session_id: newSession.rows[0].session_id, scope: 'admin' }, process.env.JWT_SECRET);
                return {
                    username: checkUser.rows[0].username,
                    jwt: token
                }
            }
            catch (err) {
                console.log(err);
                return "login function error";
            }
        }
    },
    //login end 
    {
        method: 'POST',
        path: '/register',
        options: {
            description: 'Staff Registration (will be removed)',
            tags: ['api', 'try'],
            auth: false,
            validate: {
                payload: Joi.object({
                    logonid: Joi.string().required(),
                    logonpsw: Joi.string().required(),
                    staffname: Joi.string().required(),
                    email: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { logonid, logonpsw, staffname, email } = request.payload
                const checkUser = await request.pgsql.query(
                    `SELECT * FROM "staff" WHERE "logon_id" = $1`,
                    [logonid]
                )
                if (checkUser.rowCount != 0) {
                    return new Boom.badRequest('Username Exist');
                }
                const hashedPassword = await bcrypt.hash(logonpsw, saltRounds);
                const newUser = await request.pgsql.query(
                    `INSERT INTO "staff" ("logon_id", "logon_password","staff_name","email") VALUES ($1, $2, $3, $4) RETURNING *`,
                    [logonid, hashedPassword, staffname, email]
                )
                return newUser.rows[0]
            }
            catch (err) {
                console.log(err);
                return "register function error";
            }

        }
    },
    //register end
    {
        method: 'POST',
        path: '/changePassword/{logon_id}',
        options: {
            description: 'Staff change password',
            tags: ['api', 'try'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    logon_id: Joi.string().required()
                }),
                payload: Joi.object({
                    currentPassword: Joi.string().required(),
                    newPassword: Joi.string().required(),
                    confirmPassword: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { logon_id } = request.params
            const { currentPassword, newPassword, confirmPassword } = request.payload
            const checkUser = await request.pgsql.query(
                `SELECT * FROM "staff" WHERE "logon_id" = $1 LIMIT 1`,
                [logon_id]
            )
            if (checkUser.rowCount == 0) {
                return new Boom.badRequest('Invalid Username or Password');
            }

            const isPasswordMatched = await bcrypt.compare(currentPassword, checkUser.rows[0].logon_password);
            if (!isPasswordMatched) {
                return new Boom.badRequest('Invalid Username or Password');
            }

            if (newPassword==confirmPassword){
                const hashedNewPassword = await bcrypt.hash(request.payload.confirmPassword, saltRounds);
                const updatepassword = await request.pgsql.query(
                    `UPDATE public.staff SET "logon_password" = $1 , "updated_dt" = CURRENT_TIMESTAMP WHERE staff_id = $2 RETURNING *`,
                    [hashedNewPassword, checkUser.rows[0].staff_id]
                )
                /*const updateDate = await request.pgsql.query(
                    `UPDATE public.staff SET "updated_dt" = CURRENT_TIMESTAMP WHERE staff_id = $1 RETURNING *`,
                    [checkUser.rows[0].staff_id]
                )*/
                return updatepassword.rows[0]
            }
            else
            {
                return new Boom.badRequest('New password is different with Confirm password');
            }


        }
    },
    //change password end
    {
        method: "GET", path: "/", config: { auth: false },
        handler: function (request, h) {
            return 'Welcome';
        }
    
    }


];