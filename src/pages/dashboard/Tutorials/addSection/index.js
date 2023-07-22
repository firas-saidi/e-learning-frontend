import React, { Component } from 'react';
import AddSection from './addSection';
import SectionList from './sectionList';

class Section extends Component {
    state = { visible: false }

    showAddSection = () => {
        this.setState({
            visible: true
        });
    }
    hideAddSection = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Sections <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                        {this.state.visible ? (<button type="button" onClick={this.hideAddSection} className="btn btn-info add-new"><i className="fa fa-minus"></i> Hide</button>): (<button type="button" onClick={this.showAddSection} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>)}
                        </div>
                    </div>
                    {this.state.visible ? <AddSection section={this.props.tutorial} /> : null}
                </div>
                <SectionList section={this.props.tutorial} />
            </div>
        );
    }
}

export default Section;