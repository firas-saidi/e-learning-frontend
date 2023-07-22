import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_SECTIONS } from '../../../../queries';
import SectionDetail from './sectionDetail';

class SectionList extends Component {
    state = {
        id: this.props.section.id
    }
    render() {
        console.log(this.props.section.id)
        const { id } = this.state;
        return (
            <div>
                <Query
                    query={GET_SECTIONS}
                    variables={{ TutorialID: id }}
                >
                    {({ data, loading, error }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const AllTutSections = data.getSections;
                        console.log(AllTutSections)
                        const AllLectures = () => {
                            if (AllTutSections) {
                                return AllTutSections.map(
                                    (section) => {
                                        return <SectionDetail key={section._id} section={section} />
                                    }
                                )
                            }
                        }
                        return (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Tutorial Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllLectures()}
                                </tbody>
                            </table>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default SectionList;


