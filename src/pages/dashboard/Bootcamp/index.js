import React, { Component } from 'react';
import AddCamp from './addCamp';
import BootCampList from './bootCampList';

class Bootcamp extends Component {
    state = { visible: false }

    showAddCamp = () => {
        this.setState({
            visible: true
        });
    }

    hideAddCamp = () => {
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
                        <div className="col-sm-8"><h2>Live Sessions <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                            {this.state.visible ? (<button type="button" onClick={this.hideAddCamp} className="btn btn-info add-new"><i className="fa fa-minus"></i> Hide</button>): (<button type="button" onClick={this.showAddCamp} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>)}
                        </div>
                    </div>
                </div>
                {this.state.visible ? <AddCamp /> : null}
                <BootCampList {...this.props} />
            </div>
        );
    }
}

export default Bootcamp;