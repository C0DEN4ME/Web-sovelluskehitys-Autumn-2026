// Generated with the help of Claude Code

// Shared blocks, used with @apiUse in cat.js and user.js too.
// All errors are returned as {"error": {"message": "...", "status": 400}}.

/**
 * @apiDefine TokenHeader
 * @apiHeader {String} Authorization Bearer token from <code>POST /auth/login</code>, e.g. <code>Bearer eyJhbGciOi...</code>
 */

/**
 * @apiDefine TokenErrors
 * @apiError (401) Unauthorized No token provided.
 * @apiError (403) Forbidden Invalid or expired token.
 */

/**
 * @apiDefine ValidationError
 * @apiError (400) BadRequest Validation failed, the message lists the invalid fields.
 */

/**
 * @api {post} /auth/login Log in
 * @apiName PostLogin
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiBody {String} username Username.
 * @apiBody {String} password Password.
 *
 * @apiSuccess {Object} user Logged-in user.
 * @apiSuccess {Number} user.user_id User id.
 * @apiSuccess {String} user.name Full name.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email Email address.
 * @apiSuccess {String="user","admin"} user.role Role.
 * @apiSuccess {String} token JWT, valid for 24 hours.
 *
 * @apiUse ValidationError
 * @apiError (401) Unauthorized Invalid username or password.
 */

/**
 * @api {get} /auth/me Get the logged-in user
 * @apiName GetMe
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiUse TokenHeader
 *
 * @apiSuccess {String} message <code>token OK</code>
 * @apiSuccess {Object} user User data from the token.
 * @apiSuccess {Number} user.user_id User id.
 * @apiSuccess {String} user.name Full name.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email Email address.
 * @apiSuccess {String="user","admin"} user.role Role.
 * @apiSuccess {Number} user.iat Token issue time (Unix seconds).
 * @apiSuccess {Number} user.exp Token expiry time (Unix seconds).
 *
 * @apiUse TokenErrors
 */
