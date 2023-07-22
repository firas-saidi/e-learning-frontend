import React, { Component } from 'react';
import TutorialsList from './tutorialsList';
import AddTutorialsHome from './addTutorial';

class Tutorials extends Component {
    render() {
        return (
            <div>
                <AddTutorialsHome />
                <TutorialsList />
            </div>
        );
    }
}

export default Tutorials;