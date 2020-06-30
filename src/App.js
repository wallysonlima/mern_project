import react from 'react';
import { render } from 'react-dom';
import GoalList from './components/GoalList'
//const App {} => {
    //return <h1>A React App!</h1>;
//    return React.createElement('h1', {}, 'Hi, this is React!');
//};

class App extends React.Component {
    const courseGoals = [
        {id: 'cg1', text: 'Finish the Course'},
        {id: 'cg2', text: 'Learn all about the Course Main Topic'},
        {id: 'cg3', text: 'Help other students in the Course Q&A'},
    ]

    return { 
        <div>
            <h3>Course Goals</h3>
            <GoalList goals={courseGoals}/>
        </div>
    }
    
}

export default App;