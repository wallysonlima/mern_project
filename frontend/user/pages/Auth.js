import React from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from '../..shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';

const Auth = () => {
    return (
        <Card> className="authenticate"
            <h2>Login Required</h2>
            <hr />
            <form>
                <Input 
                    element="input"
                    id="email"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onChange
                >

                </Input>
            </form>
        </Card>
    );
};

export default Auth;