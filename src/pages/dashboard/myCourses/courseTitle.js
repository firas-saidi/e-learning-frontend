import React, { Component } from 'react';

class CourseTitle extends Component {
    render() {
        console.log(this.props)
            return (
                <div>
                    <h3>{this.props.TutorialTitle.name}</h3>
                </div>
            )
    }
}

export default CourseTitle;