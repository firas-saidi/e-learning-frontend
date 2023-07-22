import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import { GET_BLOGS } from '../../queries';
import moment from "moment";
import { Breadcrumb, Icon, Spin } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 44 }} />;

class Blogs extends Component {
	render() {
		console.log(moment()._d)
		return (
			<div>
				<div className="breadcrumbs">
					<div className="container">
						<Breadcrumb>
							<Breadcrumb.Item href="/">
								<Icon type="home" />
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								Blog
                            </Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
				<div className="container blog">
					<div className="section-padding"></div>
					<div className="row">
						<div className="col-md-9 col-sm-8 content-area">
							<Query
								query={GET_BLOGS}
							>
								{(data, loading, error) => {
									if (loading) return <Spin indicator={antIcon} className="text-center" />
									if (error) return <div>{error}</div>
									console.log(data);
									const allblogs = data.data.getBlogs
									if (allblogs) {
										console.log(allblogs)
										return allblogs.map((blog) => {
											let dateComponent = moment(blog.createdDate).utc().format('YYYY-MM-DD');
											return (
												<article className="type-post" key={blog._id}>
													<div className="entry-cover">
														<Link title="Cover" to={`/post/${blog._id}`}>
															<img width="800" height="470" alt="latestnews" src={blog.image} />
														</Link>
													</div>
													<div className="entry-block">
														<div className="entry-contentblock">
															<div className="entry-meta"  >
																<span className="postby">By : <Link to="#" title="Andreanne Turcotte" >{blog.User.userName}</Link></span>
																<span className="postcatgory">Category : <Link to="#" title="News Posted">{blog.category}</Link></span>
																<span className="postdate">Date : <Link to="#" title="25th May 2016">{dateComponent}</Link></span>
															</div>
															<div className="entry-block">
																<div className="entry-title">
																	<Link title="Along Communicate Directly With Experienced Teachers" to={`/post/${blog._id}`}><h3>{blog.title} </h3></Link>
																</div>
																<div className="entry-content">
																	<p dangerouslySetInnerHTML={{ __html: blog.content }} className="elip"/>
																</div>
															</div>
															<Link to={`/post/${blog._id}`} title="Read More" className="anchor-black">Read More</Link>
														</div>
														<div className="post-ic"><span className="icon icon-Pencil"></span></div>
													</div>
												</article>
											)
										})
									}
									return null
								}}
							</Query>
						</div>
						<div className="col-md-3 col-sm-4 widget-area">
							<aside className="widget_categories">
								<h3 className="widget-title">Categories</h3>
								<ul>
									<li><Link title="Language Science" to="#" className="anchor-grey"> Web development </Link><span>(10)</span></li>
									<li><Link title="Student Guidance" to="#" className="anchor-grey"> mobile development </Link><span>(12)</span></li>
									<li><Link title="School Psychology" to="#" className="anchor-grey"> Robotics </Link><span>(08)</span></li>
									<li><Link title="Vocational Counselling" to="#" className="anchor-grey"> Data science </Link><span>(18)</span></li>
								</ul>
							</aside>
							<aside className="widget widget_latestnews">
								<h3 className="widget-title">Latest Articles</h3>
								<div className="latestnews-box">
									<Link to="blogpost-page.html" title="Along Communicate Directly With Experienced Teachers" className="anchor-grey">ttt</Link>
									<span>20th April 2021</span>
								</div>
								<div className="latestnews-box">
									<Link to="blogpost-page.html" className="anchor-grey" title="Why Should Read Every Day">ttt</Link>
									<span>20th April 2021</span>
								</div>
							</aside>
						</div>
					</div>
					<div className="section-padding"></div>
				</div>
			</div>
		);

	}
}

export default Blogs;