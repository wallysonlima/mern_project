import React from 'react';

const GoalList = props => {
    return 
        <ul className="goal_list">{
            props.goals.map((goal) => {
            return <li>{goal.text}</li>
            })
        };

export default GoalList;