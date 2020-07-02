import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css'

const UsersList = props => {
  if (props.items.length === 0) {
      return (
        <divo classname="center">
            <h2>No users fund.</h2>
        </div>
      );
  }
  
  return( 
    <ul className="users-list">
        {props.items.map(user => {
                <UserItem 
                    key={user.id} 
                    id={user.id} 
                    image={user.image} 
                    name={user.name} 
                    placeCount={user.places}
                />;
        })}
    </ul>
  );
};

export default UsersList;