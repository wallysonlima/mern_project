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

const HttpError = require("../models/http-error");

const getPlaceById = function(req, res, next){
    const placeId = req.params.pid; // { pid: 'p1'}

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
        
    res.json({ place }); // => { place } => { place:place}
    }
}

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