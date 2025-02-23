// Create user
const UserCreateBodySchema = {
    $id: 'https://ponggame.com/schemas/api/v1/user/body.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'User',
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 3 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
    },
    required: ['username', 'email', 'password'],
};
// Responses:
const UserCreateSuccess201Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/response-201.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserCreateSuccess201Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string', format: 'email' },
            },
            required: ['id', 'username', 'email'],
        }
    },
    required: ['status', 'message', 'data'],
};
const UserCreateBadRequest400Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/response-400.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserCreateBadRequest400Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
        errors: {
            type: 'array',
            items: { type: 'string' }
        }
    },
    required: ['status', 'message'],
};
const UserCreateConflict409Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/response-409.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserCreateConflict409Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
        conflict: { type: 'string' },
    },
    required: ['status', 'message', 'conflict'],
};
// Login user
const LoginBodySchema = {
    $id: 'https://ponggame.com/schemas/api/v1/login/body.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LoginRequest',
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 3 },
        password: { type: 'string', minLength: 8 },
    },
    required: ['username', 'password']
};
// Responses
const LoginSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/login/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LoginSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                token: { type: 'string' }
            },
            required: ['token'],
        },
    },
    required: ['status', 'message', 'data'],
};
const LoginUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/login/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LoginUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
const LoginServerError500Response = {
    $id: 'https://ponggame.com/schemas/api/v1/login/response-500.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LoginServerError500Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// Request to POST /api/logout
// jwt required in header
// Responses:
const LogoutSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/logout/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LogoutSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// missing token or invalid token
const LogoutUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/logout/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LogoutUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// Request to GET /api/user/info
// jwt required in the headers
// Responses:
const UserInfoSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/info/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserInfoSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string', format: 'email' },
                // Add other user info as needed
            },
            required: ['id', 'username', 'email'],
        },
    },
    required: ['status', 'message', 'data'],
};
const UserInfoUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/info/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserInfoUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// Request to POST /api/user/refresh
// JWT included in the header or in the body?
// Open for discussion
const RefreshTokenBodySchema = {
    $id: 'https://ponggame.com/schemas/api/v1/user/refresh/body.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'RefreshTokenRequest',
    type: 'object',
    properties: {
        token: { type: 'string' },
    },
    required: ['token'],
};
// Responses:
const RefreshTokenSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/refresh/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'RefreshTokenSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
            required: ['token'],
        },
    },
    required: ['status', 'message', 'data'],
};
const RefreshTokenUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/refresh/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'RefreshTokenUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// Request to DELETE /api/sessions/logout/all
// jwt token in the header
// Responses:
const LogoutAllSessionsSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/sessions/logoutAll/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LogoutAllSessionsSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
const LogoutAllSessionsUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/sessions/logoutAll/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'LogoutAllSessionsUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// Request to GET /api/sessions
// jwt token in the header
// Responses:
const ListSessionsSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/sessions/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'ListSessionsSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    session_id: { type: 'string' }, // Match DB column
                    user_id: { type: 'integer' }, // Match DB column
                    ip_address: { type: 'string' }, // Match DB column
                    user_agent: { type: 'string' }, // Match DB column
                    created_at: { type: 'string', format: 'date-time' }, // Match DB column
                    expires_at: { type: 'string', format: 'date-time' }, // Match DB column
                    revoked: { type: 'boolean' }, // Match DB column
                },
                required: ['session_id', 'user_id', 'created_at', 'revoked'],
            },
        },
    },
    required: ['status', 'message', 'data'],
};
const ListSessionsUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/sessions/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'ListSessionsUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// Request to DELETE /api/user
// jwt included in the header
// Responses:
const UserDeleteSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/delete/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserDeleteSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
const UserDeleteUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/delete/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserDeleteUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
// Request to PATCH /api/user — Update User
// JWT in the header
const UserPatchBodySchema = {
    $id: 'https://ponggame.com/schemas/api/v1/user/patch/body.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserPatchRequest',
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 4 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
        // some other user info that can be changed - discuss
    },
    // If truly partial, do NOT list 'required'.
    // required: [] but handle validation properly
};
// Responses:
const UserPatchSuccess200Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/patch/response-200.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserPatchSuccess200Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['success'] },
        message: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string', format: 'email' },
                // ...+ some other user data
            },
            required: ['id', 'username', 'email'],
        },
    },
    required: ['status', 'message', 'data'],
};
const UserPatchUnauthorized401Response = {
    $id: 'https://ponggame.com/schemas/api/v1/user/patch/response-401.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'UserPatchUnauthorized401Response',
    type: 'object',
    properties: {
        status: { type: 'string', enum: ['error'] },
        message: { type: 'string' },
    },
    required: ['status', 'message'],
};
export default {
    UserCreateBodySchema,
    UserCreateSuccess201Response,
    UserCreateBadRequest400Response,
    UserCreateConflict409Response,
    LoginBodySchema,
    LoginSuccess200Response,
    LoginUnauthorized401Response,
    LoginServerError500Response,
    LogoutSuccess200Response,
    LogoutUnauthorized401Response,
    UserInfoSuccess200Response,
    UserInfoUnauthorized401Response,
    RefreshTokenBodySchema,
    RefreshTokenSuccess200Response,
    RefreshTokenUnauthorized401Response,
    LogoutAllSessionsSuccess200Response,
    LogoutAllSessionsUnauthorized401Response,
    ListSessionsSuccess200Response,
    ListSessionsUnauthorized401Response,
    UserDeleteSuccess200Response,
    UserDeleteUnauthorized401Response,
    UserPatchBodySchema,
    UserPatchSuccess200Response,
    UserPatchUnauthorized401Response,
};
