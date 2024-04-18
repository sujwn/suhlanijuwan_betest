module.exports = Object.freeze({
	SUCCESS: {
		code: 200,
		name: 'SUCCESS',
		message: "Success"
	},
	CREATED: {
		code: 201,
		name: 'CREATED',
		message: "Create Success"
	},
	ACCEPTED: {
		code: 202,
		name: 'ACCEPTED',
		message: "Success"
	},
	BAD_REQUEST: {
		code: 400,
		name: 'BAD_REQUEST',
		message: "The provided values are not valid. Check for typos or incorrect values in your request."
	},
	PARAM_ERROR: {
		code: 400,
		name: 'PARAM_ERROR',
		message: "The parameter is of the wrong form or does not have a required value."
	},
	VALIDATION_ERROR: {
		code: 400,
		name: 'VALIDATION_ERROR',
		message: "The parameter is of the wrong form or does not have a required value."
	},
	UNSUPPORTED_MEDIA_TYPE: {
		code: 400,
		name: 'UNSUPPORTED_MEDIA_TYPE',
		message: "The server does not support the media type or format in the request. Please use a supported format."
	},
	UNAUTHORIZED: {
		code: 401,
		name: 'UNAUTHORIZED',
		message: "Permission is denied."
	},
	AUTHENTICATION_REQUIRED: {
		code: 401,
		name: 'AUTHENTICATION_REQUIRED',
		message: "Permission is denied."
	},
	AUTHENTICATION_INVALID: {
		code: 401,
		name: 'AUTHENTICATION_INVALID',
		message: "Authentication failed."
	},
	TOKEN_INVALID: {
		code: 401,
		name: 'TOKEN_INVALID',
		message: "Token is invalid."
	},
	TOKEN_EXPIRED: {
		code: 401,
		name: 'TOKEN_EXPIRED',
		message: "Token is expired."
	},
	REPEATED_ACTION: {
		code: 403,
		name: 'REPEATED_ACTION',
		message: "Duplicate request."
	},
	FORBIDDEN: {
		code: 403,
		name: 'FORBIDDEN',
		message: "Your request has been denied. Please try again later."
	},
	ACCESS_DENIED: {
		code: 403,
		name: 'ACCESS_DENIED',
		message: "Your request has been denied. Please try again later."
	},
	NOT_FOUND: {
		code: 404,
		name: 'NOT_FOUND',
		message: "No relevant data or information found."
	},
	USER_NOT_FOUND: {
		code: 404,
		name: 'USER_NOT_FOUND',
		message: "User not found."
	},
	CONFLICT: {
		code: 409,
		name: 'CONFLICT',
		message: "Resource conflict"
	},
	USERNAME_CONFLICT: {
		code: 409,
		name: 'USERNAME_CONFLICT',
		message: "The chosen username is already in use."
	},
	EMAIL_CONFLICT: {
		code: 409,
		name: 'EMAIL_CONFLICT',
		message: "The chosen email is already in use."
	},
	INTERNAL_SERVER_ERROR: {
		code: 500,
		name: 'INTERNAL_SERVER_ERROR',
		message: "Internal Server Error."
	},
	SERVER_IS_MAINTENANCE: {
		code: 503,
		name: 'SERVER_IS_MAINTENANCE',
		message: "The server is undergoing a maintenance. Please wait."
	}
});