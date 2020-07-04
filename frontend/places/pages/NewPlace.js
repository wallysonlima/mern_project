
import React from 'react';


import Input from '../../shared/components/FormElements/Input';
import './PlaceForm.css';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import '../../shared/hooks/form-hook';

const NewPlace = () => {
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

const NewPlace = () => {
    const placeSubmitHandler = event => {
        event.preventDefault();
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