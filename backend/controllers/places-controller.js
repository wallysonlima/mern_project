const uuid = require('uuid/v4');
const HttpError = require("../models/http-error");
const { json } = require('body-parser');
const { validationResult } = require('express-validator');
const Place = require('../models/place');
const User = require('../models/user');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const mongoose = require ('mongoose');

const getPlaceById = async function(req, res, next){
    const placeId = req.params.pid; // { pid: 'p1'}

    let place;

    try {
        const place = Place.findById(placeId);
    } catch(err) {
        const error = new HttpError('Something went wrong, could not find a place', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find a place for the provided id.', 404); 
        return next(error);
    }
    

    res.json({ place: place.toObject( {getters: true } )}); // => { place } => { place:place}
};

// function getPlaceById() {...}
// const getPlaceById = function() {...}
const getPlacesByUserId = async function(req, res, next) {
    const userId = req.params.uid;

    //let places;
    let userWithPlaces;
    try {
        userWithPlaces = await (await User.findById(userId)).populated('places');
    } catch(err) {
        const erro = new HttpError(
            'Fetching places failed, please trye again later', 500);

        return next(error);
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
      return next (
          new HttpError('Could not find places for the provided user id.')
      );
    }

    res.json({places: userWithPlaces.places.map(place => place.toObject({ getters:true }))});
}

const createPlace = async function(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image:'https://d168rbuicf8uyi.cloudfront.net/wp-content/uploads/2019/06/13145802/sonhar-com-leao-1024x649.jpg',
        creator
    });

    let user;

    try {
        user = await User.findById(creator);
    } catch( error ) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );

        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not ifnd user for provided id', 404);
        return next(error);
    }

    console.log(user);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess});
        await sess.commitTransaction();
    } catch(err) {
        const error = new HttpError('Creating place failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({place: createdPlace});
};

const updatePlace = async function (req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
       return next (
            new HttpError('Invalid inputs passed, please check your data.', 422)
       );
    }
    
    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    
    try {
        place = Place.findById(placeId);
    } catch( err ) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch(err) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    res.status(200).json({place: (await place).toObject({getters:true})});
};
const deletePlace = async function(req, res, next) {
    const placeId = req.params.pid;
    
    let place;

    try {
        place = await (await Place.findById(placeId)).populate('creator');
    } catch (err){
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find place for this id.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({sessions: sess});
        await sess.commitTransaction();
    } catch (err){
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    res.status(200).json({message: 'Deleted place.'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;