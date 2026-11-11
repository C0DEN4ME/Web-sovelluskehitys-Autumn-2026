/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} users List of users (the response body is the array itself).
 * @apiSuccess {Number} users.user_id User id.
 * @apiSuccess {String} users.name Full name.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email Email address.
 * @apiSuccess {String="user","admin"} users.role Role.
 */

/**
 * @api {get} /users/:id Get user by id
 * @apiName GetUserById
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {Number} user_id User id.
 * @apiSuccess {String} name Full name.
 * @apiSuccess {String} username Username.
 * @apiSuccess {String} email Email address.
 * @apiSuccess {String="user","admin"} role Role.
 *
 * @apiUse ValidationError
 * @apiError (404) NotFound User not found.
 */

/**
 * @api {post} /users Register a user
 * @apiName PostUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiBody {String{4..100}} name Full name.
 * @apiBody {String{3..20}} username Username, letters and numbers only.
 * @apiBody {String} email Email address.
 * @apiBody {String{6..}} password Password.
 *
 * @apiSuccess (201) {String} message <code>New user added.</code>
 * @apiSuccess (201) {Object} result Result object.
 * @apiSuccess (201) {Number} result.user_id Id of the new user.
 *
 * @apiError (400) BadRequest Validation failed, or the user could not be added (e.g. username already taken).
 */

/**
 * @api {put} /users/:id Update a user
 * @apiName PutUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Users can update their own data, admins any user. At least one field is required.
 *
 * @apiUse TokenHeader
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiBody {String{4..100}} [name] Full name.
 * @apiBody {String{3..20}} [username] Username, letters and numbers only.
 * @apiBody {String} [email] Email address.
 * @apiBody {String{6..}} [password] Password.
 * @apiBody {String="user","admin"} [role] Role. Ignored unless the logged-in user is an admin.
 *
 * @apiSuccess {String} message <code>User updated.</code>
 * @apiSuccess {Object} result Result object.
 * @apiSuccess {String} result.message <code>success</code>
 *
 * @apiError (400) BadRequest Validation failed or no valid fields provided for update.
 * @apiError (401) Unauthorized No token provided.
 * @apiError (403) Forbidden Invalid token, or trying to modify another user without being an admin.
 * @apiError (404) NotFound User not found.
 */

/**
 * @api {delete} /users/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Users can delete their own account, admins any user. The user's cats are deleted too.
 *
 * @apiUse TokenHeader
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} message <code>User deleted.</code>
 * @apiSuccess {Object} result Result object.
 * @apiSuccess {String} result.message <code>success</code>
 *
 * @apiUse ValidationError
 * @apiError (401) Unauthorized No token provided.
 * @apiError (403) Forbidden Invalid token, or trying to delete another user without being an admin.
 * @apiError (404) NotFound User not found.
 */
