import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_BLOGS, GET_BLOGS } from '../../../../queries';
import { Link } from 'react-router-dom';
import { message } from 'antd';

class BlogDelete extends Component {

    render() {
        const { _id, title, content, category, subject, User } = this.props.blog;
        const handleDelete = deleteBlogs => {
            const confirmDelete = window.confirm(
                `Are you sure to delete: ${title}`
            );
            if (confirmDelete) {
                deleteBlogs(_id.toString()).then(({ data }) => {
                    message.success(`Blog ${title} was deleted`)
                });
            }
        };
        console.log(this.props.blog)
        return (
            <tr>
                <td className="rowElip">{title}</td>
                <td>{category}</td>
                <td className="rowElip">{content}</td>
                <td>{User.userName}</td>
                <Mutation
                    mutation={DELETE_BLOGS}
                    variables={{ _id }}
                    refetchQueries={() => {
                        return [{
                            query: GET_BLOGS
                        }];
                    }}
                >

                    {(deleteBlogs, attrs) => (
                        <td>
                            <Link className="editBtn" to={{
                                pathname: `/edit-blog/${_id}`,
                                state: {
                                    title,
                                    category,
                                    subject,
                                    content,
                                    userName:User.userName 
                                }
                            }}><i className="fas fa-edit" />Edit</Link>
                            <span>|</span>
                            {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteBlogs)} > Delete </i>}
                        </td>
                    )}

                </Mutation>
            </tr>
        );
    }
}

export default BlogDelete;