import React, { Component } from 'react';
import BlogsList from '../BlogList';
import Editor from './addBlogs';

class AddBlogsHome extends Component {
    state = { visible: false }

    showAddBlogs = () => {
        this.setState({
            visible: true
        });
    }
    hideAddBlogs = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Blogs <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                        {this.state.visible ? (<button type="button" onClick={this.hideAddBlogs} className="btn btn-info add-new"><i className="fa fa-minus"></i> Hide</button>): (<button type="button" onClick={this.showAddBlogs} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>)}
                        </div>
                    </div>
                </div>
                {this.state.visible ? <Editor /> : null}
                <BlogsList/>
              
            </div>
        );
    }
}

export default AddBlogsHome;