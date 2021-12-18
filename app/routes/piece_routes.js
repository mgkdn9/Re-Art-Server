// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for pieces
const Piece = require('../models/piece')
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
const { Router } = require('express')
// // passing this as a second argument to `router.<verb>` will make it
// // so that a token MUST be passed for that route to be available
// // it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX all pieces
// GET /pieces
router.get('/pieces', (req, res, next) => {
	Piece.find()
		// .populate('tags')
		.then((pieces) => {
			// `pieces` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return pieces.map((piece) => piece.toObject())
		})
		// respond with status 200 and JSON of the pieces
		.then((pieces) => res.status(200).json({ pieces: pieces }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// INDEX pieces matching profile tags
// GET /pieces/profile
router.get('/pieces/profile/:profileId', (req, res, next) => {
	let tagIds = []// Array holding profile's tagIds
	// let tagNames = []// Array holding profile's tagNames
	Profile.findById(req.params.profileId)
	// .populate('tags')
	.then(handle404)
	// respond with status 200 and JSON of the profiles
	.then((profile) => {
		tagIds = profile.tags
		// res.status(200).json({ tagIds: tagIds.toObject() })// This proved that we are getting tags
		Piece.find({'tags': {$in: tagIds } })//This works just not dynamic
		// Piece.find({$or:[{'tags':tagIds[0]}, {'tags':tagIds[1]}]  })//This works just not dynamic
		// Piece.find({ "tags":["61b7af937a8985ab2413ebfe"] })
		// Piece.find({ 'title':'Cloud' })
		.then(handle404)
		.then(pieces => res.status(200).json({ pieces: pieces}))
		.catch(next)
	})
	// if an error occurs, pass it to the handler
	.catch(next)
})

// SHOW one piece
// GET /pieces
router.get('/pieces/:id', (req, res, next) => {
	Piece.findById(req.params.id)
		.then(handle404)
		// respond with status 200 and JSON of the pieces
		.then((piece) => res.status(200).json({ piece: piece.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /pieces
router.post('/pieces', (req, res, next) => {

	Piece.create(req.body)
		// respond to succesful `create` with status 201 and JSON of new "tag"
		.then((piece) => {
			res.status(201).json(piece)
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// DESTROY
// DELETE /pieces/5a7db6c74d55bc51bdf39793
router.delete('/pieces/:id', (req, res, next) => {
	Piece.findById(req.params.id)
		.then(handle404)
		.then((piece) => {
			// delete the tag ONLY IF the above didn't throw
			piece.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// UPDATE
// PATCH /pieces/5a7db6c74d55bc51bdf39793
router.patch('/pieces/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	// delete req.body.piece.owner

	Piece.findById(req.params.id)
		.then(handle404)
		.then((piece) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// requireOwnership(req, piece)

			// pass the result of Mongoose's `.update` to the next `.then`
			return piece.updateOne(req.body.piece)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router