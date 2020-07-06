import React, {useState}  from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import { 
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} 
    from '../..shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';

const Auth = () => {
    const [isLogin, setIsLoginMode] = useState(true);
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

    const authSubmitHandler = event => {
        event.preventDefault();
    }
    
    return (
        <Card className="authenticate">
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
    );
};

export default Auth;