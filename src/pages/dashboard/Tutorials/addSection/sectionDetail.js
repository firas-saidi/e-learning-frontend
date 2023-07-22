import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { DELETE_SECTION, GET_SECTIONS } from '../../../../queries';

class SectionDetail extends Component {
    render() {
        const { _id, name, description, TutorialID } = this.props.section;
        const handleDelete = deleteSection => {
            const confirmDelete = window.confirm(
                `Are sure to delete: ${name}`
            );
            if (confirmDelete) {
                deleteSection(_id.toString()).then(({ data }) => {
                    message.success(`Tutorial ${name} was deleted`)
                });
            }
        };
        return (
            <tr>
                <td>{name}</td>
                <td className="rowElip">{description}</td>

                <Mutation
                    mutation={DELETE_SECTION}
                    variables={{ _id }}
                    refetchQueries={() => {
                        return [{
                            query: GET_SECTIONS,
                            variables: { TutorialID }
                        }];
                    }}
                >
                    {(deleteSection, attrs) => {
                        return (
                            <td>
                                <Link className="editBtn" to={{
                                    pathname: `/edit-tutorial/${TutorialID}/edit-section/${_id}`,
                                    state: {
                                        sectionName: { name },
                                        sectionDescription: { description }
                                    }
                                }}><i className="fas fa-edit" />Edit</Link>
                                <span>|</span>
                                {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteSection)} > Delete </i>}
                            </td>
                        )
                    }}
                </Mutation>

            </tr>
        );
    }
}

export default SectionDetail;