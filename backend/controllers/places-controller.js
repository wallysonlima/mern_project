const uuid = require('uuid/v4');
const HttpError = require("../models/http-error");
const { json } = require('body-parser');

const DUMMY_PLACES = [
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
    }
];

const getPlaceById = function(req, res, next){
    const placeId = req.params.pid; // { pid: 'p1'}

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404); 
    }
    
    res.json({place}); // => { place } => { place:place}
};

// function getPlaceById() {...}
// const getPlaceById = function() {...}
const getPlaceByUserId = function(req, res, next) {
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    if (!place) {
      return next (
          new HttpError('Could not find a place for the provided user id.')
      );
    }

    res.json({place});
}

const createPlace = function(req, res, next) {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

    res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};
const deletePlace = function(req, res, next) {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;