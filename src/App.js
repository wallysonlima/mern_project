import react from 'react';
import { render } from 'react-dom';

//const App {} => {
    //return <h1>A React App!</h1>;
//    return React.createElement('h1', {}, 'Hi, this is React!');
//};

class App extends React.Component {
    render() {
        return <div>
            <h3></h3>
            <ul className="goal_list">
                <li>Finish the Course</li>
                <li>Lean all about the Course Main Topic</li>
                <li>Jelp other students in the Course</li>
            </ul>
        </div>
    }
}

export default App;