import React, {useState, useContext}  from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { 
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} 
    from '../..shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import {AuthContext} from '../../shared/context/auth-context';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLogin, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
            {   
               ...formState.inputs,
               name: undefined     
            }, formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false
            );
        }
        setIsLoginMode(prevMode => !prevMode );
    };

    const authSubmitHandler = async event => {
        event.preventDefault();
        
        setIsLoading(true);
        
        // Aqui conecta com o backend na função fetch, para criar o usuário
        if ( isLoginMode ) {
            try{
                setIsLoading(true);
                const response = await fetch('http://localohost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
            });

            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            auth.login();
            } catch(err) {
                setIsLoading(false);
                setError(err.message || 'Something went wrong, please try again');
            }   
        }
            
    };
    
    const errorHandler = () => {
        setError(null);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler}/>
        <Card className="authenticate">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && 
                <Input 
                    element="input"
                    id="name"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                />}

                <Input 
                    element="input"
                    id="email"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input 
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH()]}
                    errorText="Please enter a valid password, at least 5 characteres."
                    onInput={inputHandler}
                />
                <button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</button>
            </form>
            <button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode? 'SIGNUP' : 'LOGIN'}</button>
        </Card>
        </React.Fragment>
    );
};

export default Auth;