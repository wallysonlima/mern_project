import React from 'react';
import { useParams} from 'react-router-dom';
import './UpdatePlace.css';
import './PlaceForm.css';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';

const DUMMY_PLACES =  [
    {
        id: 'p1',clear
        title: 'Empire State Building',
        description: 'One of the most famous building in the world',
        imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fquantocustaviajar.com%2Fblog%2Fempire-state-building-em-nova-york%2F&psig=AOvVaw0PmKil5fYvbSQix7dBac1y&ust=1593711777272000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOC4o5bNrOoCFQAAAAAdAAAAABAD'
        address: ' 20 w 34 th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous building in the world',
        imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fquantocustaviajar.com%2Fblog%2Fempire-state-building-em-nova-york%2F&psig=AOvVaw0PmKil5fYvbSQix7dBac1y&ust=1593711777272000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOC4o5bNrOoCFQAAAAAdAAAAABAD'
        address: '20 w 34 th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p => id === placeId);

    if ( !identifiedPlace) {
        return <div className="center">
            <h2>Could not find place!</h2>
        </div>
    }

    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errortext="Please enter a valid title."
                onInput={() => {}}
                value={identifiedPlace.title}
                valid={true}
            />

            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errortext="Please enter a valid description (min. 5 characters)."
                onInput={() => {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Button type="submit" disabled={true}>
                UPDATE PLACE
            </Button>
        </form>
    )};

export default UpdatePlace;