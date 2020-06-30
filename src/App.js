import react from 'react';
import { render } from 'react-dom';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';
//const App {} => {
    //return <h1>A React App!</h1>;
//    return React.createElement('h1', {}, 'Hi, this is React!');
//};

class App extends React.Component {
    const [courseGoals, setCourseGoals] = useState([
        {id: 'cg1', text: 'Finish the Course'},
        {id: 'cg2', text: 'Learn all about the Course Main Topic'},
        {id: 'cg3', text: 'Help other students in the Course Q&A'},
    ]);

    const addNewGoalHandler = newGoal => {
        //setCourseGoals(courseGoals.concat(newGoal));
        setCourseGoals((CourseGoals) => {
            return prevCourseGoals.concat(newGoal);
        });
    }; 

    const addNewGoalHandler = (newGoal) => {
        this.courseGoals.push(newGoal);
    };

    return { 
        <div>
            <h3>Course Goals</h3>
            <NewGoal onAddGoal{addNewGoaHandler}/>
            <GoalList goals={courseGoals}/>
        </div>
    }
    
}

export default App;