import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'

import withSession from './HOC/withSession';

import Home from './pages/home';
import About from './pages/about';
import Courses from './pages/courses/';
import Blog from './pages/Blog/blog';
import Contact from './pages/contact';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Dashboard from "./pages/dashboard/dashboard";
import MainLayout from './layouts/mainLayout';
import SentryError from './raven';
import * as Sentry from '@sentry/browser';
import { Integrations } from "@sentry/tracing";
import UserProfile from './pages/dashboard/user_profile';
import NotFound from './pages/error_404';
import FAQ from './pages/Policies_and_conditions/faq';
import ForgotPassword from './pages/Auth/resetPassword';
import EditTutorial from './pages/dashboard/Tutorials/editTutorial/editTutorial';
import EditSection from './pages/dashboard/Tutorials/editSection/editSection';
import EditLecture from './pages/dashboard/Tutorials/editLecture/editLecture';
import Messages from './pages/chat/messages';
import CourseDetail from './pages/courses/courseDetail';
import Cart from './pages/cart/Cart';
import MyCoursesList from './pages/dashboard/myCourses';
import Course from './pages/dashboard/myCourses/course';
import EditQuiz from './pages/dashboard/Tutorials/editQuiz/editQuiz';
import EditBlogs from './pages/dashboard/Blog/EditBlog/editBlogs';
import BlogPost from './pages/Blog/blogPost';
import EditCamp from './pages/dashboard/Bootcamp/editCamp';
import UnderConstruction from './underConstruction';
import SingleClaim from './pages/dashboard/Claim/singleClaim';
import HowToBuy from './HowToBuy';

Sentry.init({
    dsn: "https://0374d978a9864a2080fb75d7dfd27d08@o563236.ingest.sentry.io/5703015",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

const App = ({ refetch, session }) => {
    console.log(session)
    return (
        <SentryError>
            <Switch>
                <Route path="/" exact render={props => (
                    <MainLayout session={session}>
                        <Home {...props} />
                    </MainLayout>
                )} />

                <Route path="/about" render={props => (
                    <MainLayout session={session}>
                        <About {...props} />
                    </MainLayout>
                )} />
                

                <Route path="/courses" render={props => (
                    <MainLayout session={session}>
                        <Courses {...props} />
                    </MainLayout>
                )} />

                <Route path="/blog" render={props => (
                    <MainLayout session={session}>
                        <Blog {...props} />
                    </MainLayout>
                )} />

                <Route path="/contact" render={props => (
                    <MainLayout session={session}>
                        <Contact {...props} />
                    </MainLayout>
                )} />

                <Route path="/faq" render={props => (
                    <MainLayout session={session}>
                        <FAQ {...props} />
                    </MainLayout>
                )} />

                <Route path="/login" render={props => (
                    <MainLayout>
                        <Login {...props} refetch={refetch} />
                    </MainLayout>
                )} />

                <Route path="/register" render={props => (
                    <MainLayout session={session}>
                        <Register {...props} refetch={refetch} />
                    </MainLayout>
                )} />

                <Route path="/account-recovery" render={props => (
                    <MainLayout>
                        <ForgotPassword {...props} refetch={refetch} />
                    </MainLayout>
                )} />

                <Route path="/courses" render={props => (
                    <MainLayout session={session}>
                        <Courses {...props} refetch={refetch} />
                    </MainLayout>
                )} />

                <Route exact path="/shopping-cart" render={props => (
                    <MainLayout session={session}>
                        {session.getCurrentUser && session.getCurrentUser.isUser ? <Cart {...props} refetch={refetch} /> : 'no permission'}
                    </MainLayout>
                )} />

                <Route exact path="/course/:id" render={props => (
                    <MainLayout session={session}>
                        <CourseDetail {...props} refetch={refetch} />
                    </MainLayout>
                )} />

                <Route exact path="/my-courses/:id" render={props => (
                    <MainLayout session={session}>
                        <Course {...props} refetch={refetch} session={session} />
                    </MainLayout>
                )} />

                <Route exact path="/dashboard"
                    render={props =>
                        <MainLayout session={session}>
                            <Dashboard {...props} session={session} />
                        </MainLayout>
                    } />
                <Route exact path="/edit-blog/:id"
                    render={props =>
                        <MainLayout session={session}>
                            <EditBlogs {...props} refetch={refetch} />
                        </MainLayout>
                    } />
                <Route path="/messages"
                    render={props =>
                        <MainLayout session={session}>
                            <Messages {...props} refetch={refetch} session={session} />
                        </MainLayout>
                    } />

                <Route exact path="/profile/:userName"
                    render={props =>
                        <MainLayout session={session}>
                            <UserProfile {...props} refetch={refetch} session={session} />
                        </MainLayout>
                    } />

                <Route exact path="/my-courses"
                    render={props =>
                        <MainLayout session={session}>
                            <MyCoursesList {...props} refetch={refetch} />
                        </MainLayout>
                    } />

                <Route exact path="/edit-quiz/:id" render={props => (
                    <MainLayout session={session}>
                        <EditQuiz {...props} refetch={refetch} />
                    </MainLayout>
                )} />

                <Route exact path="/claim/:id" render={props => (
                    <MainLayout session={session}>
                        <SingleClaim {...props} refetch={refetch} />
                    </MainLayout>
                )} />

                <Route exact path="/edit-tutorial/:id"
                    render={props =>
                        <MainLayout session={session}>
                            <EditTutorial {...props} refetch={refetch} />
                        </MainLayout>
                    } />

                <Route exact path="/edit-tutorial/:id/edit-section/:id"
                    render={props =>
                        <MainLayout session={session}>
                            <EditSection {...props} refetch={refetch} />
                        </MainLayout>
                    } />

                <Route exact path="/edit-section/:id/edit-lecture/:id"
                    render={props =>
                        <MainLayout session={session}>
                            <EditLecture {...props} refetch={refetch} />
                        </MainLayout>
                    } />

                <Route exact path="/post/:id"
                    render={props =>
                        <MainLayout session={session}>
                            <BlogPost {...props} refetch={refetch} />
                        </MainLayout>
                    } />

                <Route exact path="/edit-LiveSession/:id"
                    render={props =>
                        <MainLayout session={session}>
                            <EditCamp {...props} refetch={refetch} />
                        </MainLayout>
                    } />

                <Route exact path="/bootcamp"
                    render={props =>
                        <MainLayout session={session}>
                            <UnderConstruction />
                        </MainLayout>
                    } />

                <Route exact path="/how-to-buy"
                    render={props =>
                        <MainLayout session={session}>
                            <HowToBuy />
                        </MainLayout>
                    } />

                <Route exact path="/delivery"
                    render={props =>
                        <MainLayout session={session}>
                            <UnderConstruction />
                        </MainLayout>
                    } />

                <Route exact path="/press"
                    render={props =>
                        <MainLayout session={session}>
                            <UnderConstruction />
                        </MainLayout>
                    } />

                <Route exact path="/order-history"
                    render={props =>
                        <MainLayout session={session}>
                            <UnderConstruction />
                        </MainLayout>
                    } />

                <Route exact path="/Privacy-Policy"
                    render={props =>
                        <MainLayout session={session}>
                            <UnderConstruction />
                        </MainLayout>
                    } />

                <Route path="/" render={props => (
                    <MainLayout session={session}>
                        <NotFound {...props} />
                    </MainLayout>
                )} />
            </Switch>
        </SentryError>
    );
};



const AppComponent = withSession(App);

export default AppComponent;
