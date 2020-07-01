import React from 'react';
import { Link } from 'reactrouter-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UsersItem = props => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                
                <Link to={`/${props.id}/places`}>
                <div className="user-item_image">
                    <Avatar image={props.image} />
                    <img src={props.image} alt={props.name} />
                </div>
            <div className="user-item_info">
                <h2>{props.name}</h2>
                <h3>
                    {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
                </h3>
            </div>
            </Link>
            </Card>
        </li>
    );
};

export default UsersItem;