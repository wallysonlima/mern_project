
import React, { useContext } from 'react';


import Input from '../../shared/components/FormElements/Input';
import './PlaceForm.css';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const NewPlace = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm (
        {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    },
    false);
};


const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const input in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsVAlid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                input: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};


    const placeSubmitHandler = event => {
        event.preventDefault();
        sendRequest(
            'http://localhost:5000/api/places', 
            'POST', 
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: 
            }));
    }
 

    return <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input 
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"/>
            onInput={InputHandler}
            
            <Input 
            id="description"
            element="textarea"
            label="Description"
            validators={VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."/>

<Input 
            id="address"
            element="input"
            label="Address"
            validators={VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address"/>
            onInput={InputHandler}
        <button type="submit" disabled={!formState.isValid}>Add Place</button>
    </form>
}

export default NewPlace;