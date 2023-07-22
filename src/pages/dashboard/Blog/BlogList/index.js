import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_BLOGS } from '../../../../queries';
import BlogDelete from './deleteBlogs';

class BlogsList extends Component {
    render() {
        return (
            <div>
                <Query
                    query={GET_BLOGS}
                >
                    {({ data }) => {
                        const AllBlg = data.getBlogs;
                        console.log(data)
                        const AllBlogs = () => {
                            if (AllBlg) {
                                return AllBlg.map((blog) => <BlogDelete key={blog._id} blog={blog} />)
                            }
                            return null
                        }
                        return (

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Blog title</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Content</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllBlogs()}
                                </tbody>
                               
                            </table>

                        )

                    }}
                </Query>
               
            </div>
        );
    }
}

export default BlogsList;