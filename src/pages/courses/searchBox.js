import React, { Component } from 'react';
import { GET_ALL_TUTORIALS } from '../../queries';
import { Query } from 'react-apollo';

class SearchBox extends Component {
    render() {
        return (
            <div className="search-result">
                <Query
                    query={GET_ALL_TUTORIALS}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const allTutorials = data.getAllTutorials
                        console.log(data.getAllTutorials)
                        if (allTutorials) {
                            return <span>Total {allTutorials.length} courses</span>
                        }
                        return <span>Total 0 courses</span>
                    }}

                </Query>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search courses" onChange={this.props.handleSearch} />
                    <span className="input-group-btn">
                        <button className="btn btn-custom" type="button"><i className="fa fa-search"></i></button>
                    </span>
                </div>
            </div>
        );
    }
}

export default SearchBox;