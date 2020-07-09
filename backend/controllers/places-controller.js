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