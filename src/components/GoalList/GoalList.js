import React from 'react';

const GoalList = props => {
    return 
        <ul className="goal_list">{
            props.goals.map((goal) => {
            return <li key={goal.id}>{goal.text}</li>
            })
        };

export default GoalList;