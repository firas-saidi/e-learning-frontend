import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GET_SECTIONS, ADD_COMMENT, GET_COMMENTS, GET_LECTURES, GET_SPECIFIC_ORDER, GET_USER, GET_RATING, GET_RATING_EXCEPT, GET_TUTORIAL, GET_CURRENT_USER } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import moment from "moment";
import StarRatingComponent from 'react-star-rating-component';

class CourseDetail extends Component {
    state = {
        cart: JSON.parse(localStorage.getItem('cart') || "[]"),
        cartp: localStorage.getItem('cart'),
        ID: this.props.match.params.id,
        CourseName: this.props.location.state.name,
        picture: this.props.location.state.image,
        isAdded: false,
        commentarea: '',
        rating: 0,
        RatingAverage: 0
    }

    addToCart = () => {
        let id = this.state.ID;
        this.setState(state => {
            const cart = [...state.cart, id];
            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                cart,
                isAdded: true,
            };
        });
    }

    clearState() {
        this.setState({
            commentarea: '',
            rating: 0
        })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, addRatingAndComment) {
        event.preventDefault();
        addRatingAndComment().then(async () => {
            this.clearState();
        })
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({
            rating: nextValue,
            ratingModif: true
        });
    }

    render() {
        console.log(this.props.match)
        console.log(this.state.cart)
        console.log(this.props.location.state)
        const { ID, commentarea, CourseName, rating, picture } = this.state;
        console.log(rating)
        return (
            <div className="container coursesdetail-section">
                <div className="section-padding"></div>
                <div className="row">
                    <div className="col-md-9 col-sm-8 event-contentarea">
                        <div className="coursesdetail-block">
                            {picture && <img src={picture} alt={CourseName} width="825" height="500" />}
                            <div className="course-description">
                                <h3 className="course-title">Courses Description</h3>
                                <Query
                                    query={GET_TUTORIAL}
                                    variables={{ TutorialID: ID }}
                                >
                                    {({ data }) => {
                                        if (data.getTutorial) {
                                            return data.getTutorial.map((tutorial, i) => {
                                                return (
                                                    <p key={i}>{tutorial.description}</p>
                                                )
                                            })
                                        }
                                        return null
                                    }}
                                </Query>
                            </div>
                            <div className="courses-curriculum">
                                <h3 className="course-title">Courses curriculum</h3>
                                <Query
                                    query={GET_SECTIONS}
                                    variables={{ TutorialID: ID }}
                                >
                                    {({ data, loading, error }) => {
                                        if (loading) return <div>fetching</div>
                                        if (error) return <div>{error.toString()}</div>
                                        const AllSections = data.getSections;
                                        console.log(AllSections)
                                        if (AllSections !== null) {
                                            return AllSections.map((section, i) => {
                                                let c = i + 1;
                                                if (ID === section.TutorialID) {
                                                    return (
                                                        <div className="courses-sections-block" key={section._id}>
                                                            <h3>Section {c}: <span>{section.name}</span></h3>
                                                            <Query
                                                                key={i}
                                                                query={GET_LECTURES}
                                                                variables={{ SectionID: section._id }}
                                                            >
                                                                {({ data }) => {
                                                                    const lectures = data.getLectures;
                                                                    console.log(data)
                                                                    if (lectures) {
                                                                        return lectures.map((lecture, i) => {
                                                                            return (
                                                                                <div className="courses-lecture-box" key={i}>
                                                                                    <i className="far fa-file"></i>
                                                                                    <span className="lecture-no">Lecture {c}.{i + 1}</span>
                                                                                    <span className="lecture-title">{lecture.name}</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    return null
                                                                }}
                                                            </Query>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            })
                                        }
                                        return null
                                    }}
                                </Query>
                            </div>
                            <div className="courses-review">
                                <h3 className="course-title">Courses Review</h3>
                                <div className="reviewbox">
                                    <h3>Average Rating</h3>
                                    <div className="average-review">
                                        <Query
                                            query={GET_RATING_EXCEPT}
                                            variables={{ TutorialID: ID }}
                                        >
                                            {({ data }) => {
                                                if (data.getRatingsAndCommentsExcept) {
                                                    const ratingEx = data.getRatingsAndCommentsExcept;
                                                    const RatingTotal = ratingEx.reduce((rating, rate) => rating + rate.rating, 0);
                                                    const AverageRating = RatingTotal / ratingEx.length;
                                                    if (!AverageRating) {
                                                        return <h2>0</h2>
                                                    }
                                                    return <h2>{AverageRating.toFixed(1)}</h2>
                                                }
                                                return null
                                            }}
                                        </Query>
                                        <span>5 Rating</span>
                                    </div>
                                </div>
                                <div className="reviewbox">
                                    <h3>Detailed Rating</h3>
                                    <div className="detail-review">
                                        <ul>
                                            <Query
                                                query={GET_RATING}
                                                variables={{ TutorialID: ID, rating: 5 }}
                                            >
                                                {({ data }) => {
                                                    if (data.getRatingAndComment) {
                                                        return <li><Link to="#" title="5 stars">5 stars</Link><span>{data.getRatingAndComment.length}</span></li>
                                                    }
                                                    return null
                                                }}
                                            </Query>
                                            <Query
                                                query={GET_RATING}
                                                variables={{ TutorialID: ID, rating: 4 }}
                                            >
                                                {({ data }) => {
                                                    if (data.getRatingAndComment) {
                                                        return <li><Link to="#" title="4 stars">4 stars</Link><span>{data.getRatingAndComment.length}</span></li>
                                                    }
                                                    return null
                                                }}
                                            </Query>
                                            <Query
                                                query={GET_RATING}
                                                variables={{ TutorialID: ID, rating: 3 }}
                                            >
                                                {({ data }) => {
                                                    if (data.getRatingAndComment) {
                                                        return <li><Link to="#" title="3 stars">3 stars</Link><span>{data.getRatingAndComment.length}</span></li>
                                                    }
                                                    return null
                                                }}
                                            </Query>
                                            <Query
                                                query={GET_RATING}
                                                variables={{ TutorialID: ID, rating: 2 }}
                                            >
                                                {({ data }) => {
                                                    if (data.getRatingAndComment) {
                                                        return <li><Link to="#" title="2 stars">2 stars</Link><span>{data.getRatingAndComment.length}</span></li>
                                                    }
                                                    return null
                                                }}
                                            </Query>
                                            <Query
                                                query={GET_RATING}
                                                variables={{ TutorialID: ID, rating: 1 }}
                                            >
                                                {({ data }) => {
                                                    if (data.getRatingAndComment) {
                                                        return <li><Link to="#" title="1 stars">1 stars</Link><span>{data.getRatingAndComment.length}</span></li>
                                                    }
                                                    return null
                                                }}
                                            </Query>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 event-sidebar">
                        <div className="courses-features">
                            <div className="text-center">
                                <h3>{CourseName}</h3>
                            </div>

                            <Query
                                query={GET_CURRENT_USER}
                            >
                                {(data, loading, error) => {

                                    if (data.data.getCurrentUser) {
                                        const userName = data.data.getCurrentUser.userName;
                                        console.log(ID)
                                        console.log(userName)
                                        return (
                                            <Query
                                                query={GET_TUTORIAL}
                                                variables={{ TutorialID: ID }}
                                            >
                                                {({ data }) => {
                                                    if (data.getTutorial) {
                                                        return data.getTutorial.map((tutorial) => {
                                                            if (userName === tutorial.User.userName) {
                                                                return (
                                                                    <div className="featuresbox text-center" key={tutorial._id}>
                                                                        <button className="btn bg-black btn-round btn-sm">
                                                                            <Link to={`/my-courses/${ID}`}><strong>START</strong></Link>
                                                                        </button>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Query
                                                                        query={GET_SPECIFIC_ORDER}
                                                                        variables={{ TutorialID: ID, userName }}
                                                                        key={tutorial._id}
                                                                    >
                                                                        {(data) => {
                                                                            const allOrders = data.data.getSpecificOrder;
                                                                            console.log(data)
                                                                            if (allOrders) {
                                                                                return (
                                                                                    <div>
                                                                                        {allOrders.length !== 0 ? (allOrders.map((order) => {
                                                                                            console.log(order)
                                                                                            return (
                                                                                                <div className="featuresbox text-center" key={order._id}>
                                                                                                    <button className="btn bg-black btn-round btn-sm">
                                                                                                        <Link to={`/my-courses/${ID}`}><strong>START</strong></Link>
                                                                                                    </button>
                                                                                                </div>
                                                                                            )
                                                                                        })) : (
                                                                                                <div className="featuresbox text-center">
                                                                                                    <button className="btn bg-black btn-round btn-sm "
                                                                                                        onClick={this.addToCart}
                                                                                                        disabled={this.state.cart.includes(ID)}
                                                                                                    >
                                                                                                        {!this.state.isAdded && !this.state.cart.includes(ID) ? "ADD TO CART" : "✔ ADDED"}
                                                                                                    </button>
                                                                                                </div>
                                                                                            )}
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            return null
                                                                        }}
                                                                    </Query>
                                                                )
                                                            }
                                                        })
                                                    }
                                                    return null
                                                }}
                                            </Query>
                                        )
                                    }
                                    return (
                                        <div className="featuresbox text-center">
                                            Signin Or Signup
                                            <button className="btn bg-black btn-round btn-sm "
                                                onClick={this.addToCart}
                                                disabled={true}
                                            >
                                                {!this.state.isAdded && !this.state.cart.includes(ID) ? "ADD TO CART" : "✔ ADDED"}
                                            </button>
                                        </div>
                                    )
                                }}
                            </Query>

                            <Query
                                query={GET_TUTORIAL}
                                variables={{ TutorialID: ID }}
                            >
                                {({ data }) => {
                                    if (data.getTutorial) {
                                        return data.getTutorial.map((tutorial, i) => {
                                            return (
                                                <React.Fragment
                                                    key={i}
                                                >
                                                    <div className="featuresbox"><img src={window.location.origin + "/images/dolar-ic.png"} alt="dolar-ic" width="27" height="27" /><h3>Price : </h3><span> {tutorial.price}</span></div>
                                                    <div className="featuresbox"><img src={window.location.origin + "/images/clock-ic.png"} alt="clock-ic" width="24" height="24" /><h3>Duration : </h3><span> {tutorial.duration}</span></div>
                                                    <div className="featuresbox"><img src={window.location.origin + "/images/cup-ic.png"} alt="cup-ic" width="24" height="23" /><h3>Lectures : </h3><span> 10</span></div>
                                                    <div className="featuresbox"><img src={window.location.origin + "/images/user-ic.png"} alt="user-ic" width="22" height="22" /><h3>Students : </h3><span> 50</span></div>
                                                    <div className="featuresbox"><img src={window.location.origin + "/images/cap-ic.png"} alt="cap-ic" width="24" height="20" /><h3>Certificate of Completion</h3></div>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    return null
                                }}
                            </Query>
                        </div>
                        <div className="courses-staff">
                            <img src={this.props.location.state.User.profileImage} alt="staff" width="275" height="288" />
                            <h3>{this.props.location.state.User.userName}</h3>
                        </div>
                    </div>
                </div>
                <Query
                    query={GET_CURRENT_USER}
                >
                    {(data, loading, error) => {

                        if (data.data.getCurrentUser) {
                            const userName = data.data.getCurrentUser.userName;
                            return (
                                <Mutation
                                    mutation={ADD_COMMENT}
                                    variables={{ comment: commentarea, TutorialID: ID, userName, rating }}
                                    refetchQueries={() => {
                                        return [{
                                            query: GET_COMMENTS,
                                            variables: { TutorialID: ID }
                                        },
                                        {
                                            query: GET_RATING_EXCEPT,
                                            variables: { TutorialID: ID }
                                        },
                                        {
                                            query: GET_RATING,
                                            variables: { TutorialID: ID, rating: 5 }
                                        },
                                        {
                                            query: GET_RATING,
                                            variables: { TutorialID: ID, rating: 4 }
                                        },
                                        {
                                            query: GET_RATING,
                                            variables: { TutorialID: ID, rating: 3 }
                                        },
                                        {
                                            query: GET_RATING,
                                            variables: { TutorialID: ID, rating: 2 }
                                        },
                                        {
                                            query: GET_RATING,
                                            variables: { TutorialID: ID, rating: 1 }
                                        }]
                                    }}
                                >
                                    {(addRatingAndComment) => {
                                        return (
                                            <Query
                                                query={GET_SPECIFIC_ORDER}
                                                variables={{ TutorialID: ID, userName }}
                                            >
                                                {(data) => {
                                                    const allOrders = data.data.getSpecificOrder;
                                                    console.log(data)
                                                    if (allOrders) {
                                                        return (
                                                            <div>
                                                                {allOrders.length !== 0 ? (allOrders.map((order) => {
                                                                    console.log(order)
                                                                    return (
                                                                        <form
                                                                            className="comment-form"
                                                                            onSubmit={event => this.handleSubmit(event, addRatingAndComment)}
                                                                            key={order._id}>
                                                                            <h3 className="block-title">Post a Comment</h3>
                                                                            <div className="row">
                                                                                <div className="form-group col-md-12 mt-4">
                                                                                    <StarRatingComponent
                                                                                        name="1"
                                                                                        className="RatingComment"
                                                                                        starCount={5}
                                                                                        value={rating}
                                                                                        onStarClick={this.onStarClick}
                                                                                    />
                                                                                </div>
                                                                                <div className="form-group col-md-12">
                                                                                    <textarea className="form-control msg"
                                                                                        rows="5"
                                                                                        placeholder="Write your comment here..."
                                                                                        name="commentarea"
                                                                                        value={commentarea} onChange={this.handleChange}
                                                                                    ></textarea>
                                                                                </div>
                                                                                <div className="form-group col-md-12">
                                                                                    <input type="submit" title="Submit" name="Submit" value="Submit" />
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    )
                                                                })) : (
                                                                        null
                                                                    )}
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            </Query>
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
                        query={GET_COMMENTS}
                        variables={{ TutorialID: ID }}
                    >
                        {({ data }) => {
                            if (data.getRatingsAndComments) {
                                return <h3 className="block-title">{data.getRatingsAndComments.length} Comments</h3>
                            }
                            return <h3 className="block-title">0 Comments</h3>
                        }}
                    </Query>
                    <Query
                        query={GET_COMMENTS}
                        variables={{ TutorialID: ID }}
                    >
                        {({ data, stopPolling }) => {
                            console.log(data)
                            if (data.getRatingsAndComments) {
                                return data.getRatingsAndComments.map((comment, i) => {
                                    let dateComponent = moment(comment.createdDate).utc().format('YYYY-MM-DD');
                                    let timeComponent = moment(comment.createdDate).utc().format('HH:mm');
                                    return (
                                        <div className="media" key={comment._id}>
                                            <div className="media-left">
                                                <Query
                                                    query={GET_USER}
                                                    variables={{ userName: comment.userName }}
                                                >
                                                    {({ data }) => {
                                                        if (data.getUser) {
                                                            console.log(data.getUser)
                                                            return (
                                                                <Link title="Martin Guptil" to="#">
                                                                    <img width="112" height="112" className="media-object" src={data.getUser.profileImage} alt="Martin Guptil" />
                                                                    {stopPolling(1000)}
                                                                </Link>
                                                            )
                                                        }
                                                        return null
                                                    }}
                                                </Query>
                                            </div>
                                            <div className="media-body">
                                                <div className="media-content">
                                                    <h3 className="media-heading">
                                                        {comment.userName}<span> {dateComponent} {timeComponent}</span>
                                                    </h3>
                                                    {comment.rating === 0 ? null : (<StarRatingComponent
                                                        name="rate1"
                                                        starCount={5}
                                                        value={comment.rating}
                                                        editing={false}
                                                    />)}
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
                <div className="section-padding"></div>
            </div>
        );
    }
}

export default CourseDetail;