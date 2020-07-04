import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';
import Map from '../../shared/components/UIElements/Map';

const PlaceItem = props => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal. setShowConfirmModal] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    };

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log("DELETING...");
    }

    return (
        <React.Fragment>
        <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header={props.address}
            contentClass="place-item__modal-content" 
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>Close</Button>}  
        >
            <div className="map_container">
                <Map center={props.coordinates} zoom={16}/>
            </div>
        </Modal>
        <Modal header= "Are you sure?" footerClass="place-item__modal_actions" footer={
            <ReactFragment>
                <button inverse onClick={cancelDeleteHandler}>Cancel</button>
                <button danger> onClick={confirmDeleteHandler}Delete</button>
            </ReactFragment>
        }>
           <p>Do you want to proceed and delete this place? Please note thate it can't be undone thereafter.</p> 
        </Modal>
        <li className="place-item">
        <Card className="place-item__content">
        <div className="place-item__image">
            <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
            <button inverse onClick={openMapHandler}>VIEW ON MAP</button>
            <button to={`places/${props.id}`}>EDIT</button>
            <button danger onClick={showDeleteWarningHandler}>DELETE</button>    
        </div>
        </Card>
        </li> 
        </React.Fragment>
};

export default PlaceItem;