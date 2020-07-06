import {useCallback, useReducer} from 'react';

const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
        let formIsValid = true;
        for(const inputID in state.inputs) {
            if (!state.inputs[inputId]) {
                continue;
            }
            if (inputId = ) {
                formIsValid = formIsVAlid && action.isValid;
            } else {
                formIsValid = formIsValid && state.inputs[inputId].isValid;
            }
        }

        return {
            ...state,
        }
    }
}



export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    const titleInputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id});
    }, []);

    const descriptionInputHandler = useCallback((id, value, isValid) => {
        
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    }, []);

    return [formState, inputHandler, setFormData];
};