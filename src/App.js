import react from 'react';
import { render } from 'react-dom';
import GoalList from './components/GoalList'
//const App {} => {
    //return <h1>A React App!</h1>;
//    return React.createElement('h1', {}, 'Hi, this is React!');
//};

class App extends React.Component {
    render() {
        return <div>
            <h3>Course Goals</h3>
            <GoalList />
        </div>
    }
}

export default App;