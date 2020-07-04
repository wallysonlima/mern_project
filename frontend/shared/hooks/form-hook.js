import {useCallback, useReducer} from 'react';

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


    return [formState, inputHandler];
};