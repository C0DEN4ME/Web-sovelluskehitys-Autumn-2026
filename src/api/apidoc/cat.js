/**
 * @api {get} /cats Get all cats
 * @apiName GetCats
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} time Time of the request.
 * @apiSuccess {Object[]} data List of cats.
 * @apiSuccess {Number} data.cat_id Cat id.
 * @apiSuccess {String} data.cat_name Name of the cat.
 * @apiSuccess {Number} data.weight Weight in kg.
 * @apiSuccess {Number} data.owner User id of the owner.
 * @apiSuccess {String} data.owner_name Name of the owner.
 * @apiSuccess {String} data.filename Name of the uploaded image file.
 * @apiSuccess {String} data.birthdate Birthdate, YYYY-MM-DD.
 */

/**
 * @api {get} /cats/:id Get cat by id
 * @apiName GetCatById
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Cat's unique ID.
 *
 * @apiSuccess {Number} cat_id Cat id.
 * @apiSuccess {String} cat_name Name of the cat.
 * @apiSuccess {Number} weight Weight in kg.
 * @apiSuccess {Number} owner User id of the owner.
 * @apiSuccess {String} filename Name of the uploaded image file.
 * @apiSuccess {String} birthdate Birthdate, YYYY-MM-DD.
 *
 * @apiUse ValidationError
 * @apiError (404) NotFound Cat not found.
 */

/**
 * @api {get} /cats/user/:user_id Get cats by owner
 * @apiName GetCatsByUserId
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} user_id Owner's user id.
 *
 * @apiSuccess {Object[]} cats List of the user's cats (the response body is the array itself).
 * @apiSuccess {Number} cats.cat_id Cat id.
 * @apiSuccess {String} cats.cat_name Name of the cat.
 * @apiSuccess {Number} cats.weight Weight in kg.
 * @apiSuccess {Number} cats.owner User id of the owner.
 * @apiSuccess {String} cats.filename Name of the uploaded image file.
 * @apiSuccess {String} cats.birthdate Birthdate, YYYY-MM-DD.
 *
 * @apiUse ValidationError
 * @apiError (404) NotFound No cats found for this user.
 */

/**
 * @api {post} /cats Add a cat
 * @apiName PostCat
 * @apiGroup Cats
 * @apiVersion 1.0.0
 * @apiDescription Send as <code>multipart/form-data</code>. The owner is the logged-in user.
 *
 * @apiUse TokenHeader
 *
 * @apiBody {File} image Image or video file, max 10 MB.
 * @apiBody {String{3..50}} cat_name Name of the cat.
 * @apiBody {Number{0.1-100}} weight Weight in kg.
 * @apiBody {String} birthdate Birthdate, YYYY-MM-DD.
 *
 * @apiSuccess (201) {String} message <code>New cat added.</code>
 * @apiSuccess (201) {Object} result Result object.
 * @apiSuccess (201) {Number} result.cat_id Id of the new cat.
 *
 * @apiError (400) BadRequest Validation failed, no file uploaded, wrong file type or file too large.
 * @apiUse TokenErrors
 */

/**
 * @api {put} /cats/:id Update a cat
 * @apiName PutCat
 * @apiGroup Cats
 * @apiVersion 1.0.0
 * @apiDescription Send as JSON. Users can update their own cats, admins any cat. At least one field is required.
 *
 * @apiUse TokenHeader
 *
 * @apiParam {Number} id Cat's unique ID.
 *
 * @apiBody {String{3..50}} [cat_name] Name of the cat.
 * @apiBody {Number{0.1-100}} [weight] Weight in kg.
 * @apiBody {String} [birthdate] Birthdate, YYYY-MM-DD.
 * @apiBody {Number} [owner] User id of the new owner. Ignored unless the logged-in user is an admin.
 *
 * @apiSuccess {String} message <code>Cat updated!</code>
 * @apiSuccess {Object} result Result object.
 * @apiSuccess {String} result.message <code>success</code>
 *
 * @apiError (400) BadRequest Validation failed or no data provided for update.
 * @apiUse TokenErrors
 * @apiError (404) NotFound Not found or not authorized.
 */

/**
 * @api {delete} /cats/:id Delete a cat
 * @apiName DeleteCat
 * @apiGroup Cats
 * @apiVersion 1.0.0
 * @apiDescription Users can delete their own cats, admins any cat.
 *
 * @apiUse TokenHeader
 *
 * @apiParam {Number} id Cat's unique ID.
 *
 * @apiSuccess {String} message <code>Cat removed!</code>
 *
 * @apiUse ValidationError
 * @apiUse TokenErrors
 * @apiError (404) NotFound Not found or not authorized.
 */
