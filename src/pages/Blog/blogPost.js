import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo';
import { ADD_BLOG_COMMENT, GET_CURRENT_USER, GET_BLOG_COMMENTS, GET_BLOG } from '../../queries';
import moment from "moment";

class BlogPost extends Component {
    state = {
        ID: this.props.match.params.id,
        commentarea: '',

    }

    clearState() {
        this.setState({
            commentarea: ''
        })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, addBlogComment) {
        event.preventDefault();
        addBlogComment().then(async () => {
            this.clearState();
        })
    }

    render() {
        console.log(this.props)
        const { ID, commentarea } = this.state;
        return (
            <div className="container blog blogpost">
                <div className="section-padding"></div>
                <div className="row">
                    <div className="col-md-9 col-sm-8 content-area">
                        <Query
                            query={GET_BLOG}
                            variables={{ _id: ID }}
                        >
                            {({ data }) => {
                                const blog = data.getBlog
                                if (data.getBlog) {
                                    let dateComponent = moment(blog.createdDate).utc().format('YYYY-MM-DD');
                                    return (
                                        <article className="type-post">
                                            <div className="entry-cover">
                                                <img width="860" height="470" alt="blogpost" src={blog.image} />
                                            </div>
                                            <div className="entry-block">
                                                <div className="entry-contentblock">
                                                    <div className="entry-meta">
                                                        <span className="postby">By : <Link to="#" title={blog.User.userName}> {blog.User.userName}</Link></span>
                                                        <span className="postcatgory">Category : <Link to="#" title="News Posted"> {blog.category}</Link></span>
                                                        <span className="postdate">Date : <Link to="#" title="25th May 2016"> {dateComponent}</Link></span>
                                                    </div>
                                                    <div className="entry-block">
                                                        <div className="entry-title">
                                                            <h3>{blog.title}</h3>
                                                        </div>
                                                        <div className="entry-content">
                                                            <p dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-ic"><span className="icon icon-Pencil"></span></div>
                                            </div>
                                        </article>
                                    )
                                }
                                return null
                            }}
                        </Query>
                        <Query
                            query={GET_CURRENT_USER}
                        >
                            {(data, loading, error) => {

                                if (data.data.getCurrentUser) {
                                    const userName = data.data.getCurrentUser.userName;
                                    return (
                                        <Mutation
                                            mutation={ADD_BLOG_COMMENT}
                                            variables={{ comment: commentarea, BlogID: ID, userName }}
                                            refetchQueries={() => {
                                                return [{
                                                    query: GET_BLOG_COMMENTS,
                                                    variables: { BlogID: ID }
                                                }];
                                            }}
                                        >
                                            {(addBlogComment) => {
                                                return (
                                                    <form className="comment-form" onSubmit={event => this.handleSubmit(event, addBlogComment)}>
                                                        <h3 className="block-title">Post a Comment</h3>
                                                        <div className="row">
                                                            <div className="form-group col-md-12">
                                                                <textarea className="form-control msg"
                                                                    rows="5"
                                                                    placeholder="Write your comment here..."
                                                                    name="commentarea"
                                                                    value={commentarea}
                                                                    onChange={this.handleChange}
                                                                    required
                                                                ></textarea>
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <input type="submit" title="Submit" name="Submit" value="Submit" />
                                                            </div>
                                                        </div>
                                                    </form>
                                                )
                                            }}
                                        </Mutation>
                                    )
                                }
                                return null
                            }}
                        </Query>
                        <div className="post-comments">
                            <Query
                                query={GET_BLOG_COMMENTS}
                                variables={{ BlogID: ID }}
                            >
                                {({ data }) => {
                                    if (data.getBlogComments) {
                                        return <h3 className="block-title">{data.getBlogComments.length} Comments</h3>
                                    }
                                    return <h3 className="block-title">0 Comments</h3>
                                }}
                            </Query>
                            <Query
                                query={GET_BLOG_COMMENTS}
                                variables={{ BlogID: ID }}
                            >
                                {({ data }) => {
                                    console.log(data)
                                    if (data.getBlogComments) {
                                        return data.getBlogComments.map((comment, i) => {
                                            let dateComponent = moment(comment.createdDate).utc().format('YYYY-MM-DD');
                                            let timeComponent = moment(comment.createdDate).utc().format('HH:mm');
                                            return (
                                                <div className="media" key={comment._id}>
                                                    <div className="media-left">
                                                        <Link title="Martin Guptil" to="#">
                                                            <img width="112" height="112" className="media-object" src={comment.User.profileImage} alt="Martin Guptil" />
                                                        </Link>
                                                    </div>
                                                    <div className="media-body">
                                                        <div className="media-content">
                                                            <h4 className="media-heading">
                                                                {comment.User.userName}<span> {dateComponent} {timeComponent}</span>
                                                            </h4>
                                                            <p> {comment.comment} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    return null
                                }}
                            </Query>
                        </div>

                    </div>
                    <div className="col-md-3 col-sm-4 widget-area">
                        <aside className="widget widget_categories">
                            <h3 className="widget-title">Categories</h3>
                            <ul>
                                <li><Link title="Language Science" className="anchor-grey" to="#">Language Science</Link><span>(10)</span></li>
                                <li><Link title="Student Guidance" className="anchor-grey" to="#">Student Guidance</Link><span>(12)</span></li>
                                <li><Link title="School Psychology" className="anchor-grey" to="#">School Psychology</Link><span>(08)</span></li>
                                <li><Link title="Vocational Counselling" className="anchor-grey" to="#">Vocational Counselling	</Link><span>(18)</span></li>
                                <li><Link title="Uncategorized" className="anchor-grey" to="#">Uncategorized</Link><span>(11)</span></li>
                                <li><Link title="Youth Science" className="anchor-grey" to="#">Youth Science</Link><span>(10)</span></li>
                            </ul>
                        </aside>
                        <aside className="widget widget_latestnews">
                            <h3 className="widget-title">Latest News</h3>
                            <div className="latestnews-box">
                                <Link to="blogpost-page.html" className="anchor-grey" title="Along Communicate Directly With Experienced Teachers">Along Communicate Directly With Experienced Teachers</Link>
                                <span>25th May 2021</span>
                            </div>
                            <div className="latestnews-box">
                                <Link to="blogpost-page.html" className="anchor-grey" title="Given The Tips To Students Succed In An Online Courses ">Given The Tips To Students Succed In An Online Courses </Link>
                                <span>25th May 2021</span>
                            </div>
                            <div className="latestnews-box">
                                <Link to="blogpost-page.html" className="anchor-grey" title="Why Should Read Every Day">Why Should Read Every Day</Link>
                                <span>25th May 2016</span>
                            </div>
                        </aside>
                        <Query
                            query={GET_BLOG}
                            variables={{ _id: ID }}
                        >
                            {({ data }) => {
                                const blog = data.getBlog
                                if (data.getBlog) {
                                    return (
                                        <aside className="widget courses-staff">
                                            <img src={blog.User.profileImage} alt="staff" width="275" height="288" />
                                            <h3>{blog.User.userName}</h3>
                                        </aside>
                                    )
                                }
                                return null
                            }}
                        </Query>
                    </div>
                </div>
                <div className="section-padding"></div>
            </div>
        );
    }
}

export default BlogPost;