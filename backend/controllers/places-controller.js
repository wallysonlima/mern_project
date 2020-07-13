const uuid = require('uuid/v4');
const HttpError = require("../models/http-error");
const { json } = require('body-parser');
const { validationResult } = require('express-validator');
const Place = require('../models/place');


let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: "One of the most famous sky scrapers in the world",
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 w 34 th St, New Yorkm NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Brasil',
        description: "One of the most famous sky scrapers in the world",
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 w 34 th St, New Yorkm NY 10001',
        creator: 'u2'
    }
];

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

    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch(err) {
        const erro = new HttpError(
            'Fetching places failed, please trye again later', 500);

        return next(error);
    }

    if (!places || places.length === 0) {
      return next (
          new HttpError('Could not find places for the provided user id.')
      );
    }

    res.json({places: places.map(place => place.toObject({ getters:true }))});
}

const createPlace = function(req, res, next) {
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

    try {
        await createdPlace.save();
    } catch(err) {
        const error = new HttpError('Creating place failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({place: createdPlace});
};

const updatePlace = async function (req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
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
        place = await Place.findById(placeId);
    } catch (err){
        const error = new HttpError('Something went wrong, coul not delete place.', 500);
        return next(error);
    }

    try {
        await place.remove();
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