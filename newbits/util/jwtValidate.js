'use strict'

module.exports = async function (decoded, request, h) {
    try {
        let staff = await request.redis.client.get(`session_${decoded.session_id}`)
        staff = JSON.parse(staff)
        return { 
            isValid: true, 
            credentials: { 
                scope: staff.user_type, 
                username: staff.logon_id,
                staff_id: staff.staff_id
            } 
        };
    } catch (err) {
        return { isValid: false };
    }
};