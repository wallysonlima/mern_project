import React from 'react';
import PlaceList from '../components/PlaceList';

const DUMMY_PLACES =  [
    {
        id: 'p1',clear
        title: 'Empire State Building',
        description: 'One of the most famous building in the world',
        imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fquantocustaviajar.com%2Fblog%2Fempire-state-building-em-nova-york%2F&psig=AOvVaw0PmKil5fYvbSQix7dBac1y&ust=1593711777272000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOC4o5bNrOoCFQAAAAAdAAAAABAD'
        address: ' 20 w 34 th St, New York, NY 10001',
        location:  
    }
]

const UserPlaces = props => {
    if (proprs.items.length === 0) {
        return <div className="place-list center">
            <Card>
                <h2>No places found. Maybe create one?</h2>
                <button>Share Place</button>
            </Card>
        </div>
    }
};

export default UserPlaces;
