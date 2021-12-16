// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for profile
const Profile = require('../models/profile')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { tag: { title: '', text: 'foo' } } -> { tag: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// // passing this as a second argument to `router.<verb>` will make it
// // so that a token MUST be passed for that route to be available
// // it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX all profile
// GET /profile
router.get('/profiles', (req, res, next) => {
	Profile.find()
		.populate('tags')
		.then((profile) => {
			// `profile` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return profile.map((profiles) => profiles.toObject())
		})
		// respond with status 200 and JSON of the profile
		.then((profile) => res.status(200).json({ profile: profile }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW one profile
// GET /profiles
router.get('/profiles/:id', (req, res, next) => {
	Profile.findById(req.params.id)
		.populate('tags')
		.then(handle404)
		// respond with status 200 and JSON of the profiles
		.then((profile) => res.status(200).json({ profile: profile.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW one profile by userid
// GET /profiles
router.get('/profiles/user/:userId', (req, res, next) => {
	Profile.find({ 'userId': req.params.userId })
		.populate('tags')
		.then(handle404)
		// respond with status 200 and JSON of the profiles
		.then((profile) => {
			res.status(200).json({ profile: profile})
		})
		// if an error occurs, pass it to the handler
		.catch(next)
	})

// CREATE

// CREATE edit night 12/15/21
// POST /profile
router.post('/profiles', (req, res, next) => {

	Profile.create(req.body)
		// respond to succesful `create` with status 201 and JSON of new "tag"
		.then((profile) => {
			res.status(201).json({ profile: profile.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// DESTROY
// DELETE /profiles/5a7db6c74d55bc51bdf39793
router.delete('/profiles/:id', (req, res, next) => {
	Profile.findById(req.params.id)
		.then(handle404)
		.then((profile) => {
			// delete the tag ONLY IF the above didn't throw
			profile.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// UPDATE
// PATCH /profiles/5a7db6c74d55bc51bdf39793
router.patch('/profiles/user/:userId', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	// delete req.body.profile.owner
	Profile.find({ 'userId': req.params.userId })
		.then(handle404)
		.then((profile) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// requireOwnership(req, profile)
			// pass the result of Mongoose's `.update` to the next `.then`
			return Profile.updateOne(req.body)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// UPDATE
// PATCH for isSubscribed from checkout
router.patch('/profiles/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	// delete req.body.profile.owner

	Profile.findById(req.params.id)
		.then(handle404)
		.then((profile) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// requireOwnership(req, profile)

			// pass the result of Mongoose's `.update` to the next `.then`
			return profile.updateOne(req.body)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router