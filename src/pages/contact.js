import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';

class Contact extends Component {
	render() {
		return (
			<div>
				<div className="breadcrumbs">
					<div className="container">
						<Breadcrumb>
							<Breadcrumb.Item href="/">
								<Icon type="home" />
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								Contact
                            </Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
				<div id="contact" className="section">

					{/* <!-- container --> */}
					<div className="container">

						{/* <!-- row --> */}
						<div className="row">

							{/* <!-- contact form --> */}
							<div className="col-md-6">
								<div className="contact-form">
									<form>
										<h2 className="text-center Playfair-Display-Bold-Font">Contact</h2>
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Name" required="required" />
										</div>
										<div className="form-group">
											<input type="email" className="form-control" placeholder="Email" required="required" />
										</div>
										<div className="form-group">
											<textarea className="form-control" rows="7" placeholder="Enter Your message"></textarea>
										</div>
										<div className="form-group">
											<button type="submit" className="btn passwordButton btn-block">Send</button>
										</div>
									</form>
								</div>
							</div>
							{/* <!-- /contact form --> */}

							{/* <!-- contact information --> */}
							<div className="col-md-5 col-md-offset-1">
								<h4>Contact Information</h4>
								<ul className="contact-details">
									<li><i className="fa fa-envelope"></i>firas@levelupspace.com</li>
									<li><i className="fa fa-phone"></i>122-547-223-45</li>
									<li><i className="fa fa-map-marker"></i>4476 Clement Street</li>
								</ul>

								{/* <!-- contact map --> */}
								<div id="contact-map"></div>
								{/* <!-- /contact map --> */}

							</div>
							{/* <!-- contact information --> */}

						</div>
						{/* <!-- /row --> */}

					</div>
					{/* <!-- /container --> */}
				</div>
			</div>

		);
	}
}

export default Contact;