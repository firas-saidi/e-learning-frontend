import { gql } from 'apollo-boost';





// Tutorials Queries
export const GET_ALL_TUTORIALS = gql`
    query {
        getAllTutorials{
            _id
            name
            price
            duration
            description
            createdDate
            User{
                _id
                firstName
                lastName
                joinDate
                userName
                email
                profileImage
                isUser
                isAdmin
                isTeacher
                isMentor
            }
            image
        }
    }
`;

export const GET_TUTORIAL = gql`
    query ($TutorialID: ID){
        getTutorial(_id: $TutorialID){
            _id
            name
            price
            duration
            description
            createdDate
            User{
                _id
                firstName
                lastName
                joinDate
                userName
                email
                profileImage
                isUser
                isAdmin
                isTeacher
                isMentor
            }
            image
        }
    }
`;

export const GET_SECTIONS = gql`
    query ($TutorialID: String!) {
        getSections(TutorialID: $TutorialID){
            _id
            name
            description
            createdDate
            TutorialID
        }
    }
`;

export const GET_LECTURES = gql`
    query ($SectionID: String!){
        getLectures(SectionID: $SectionID){
            _id
            name
            description
            createdDate
            SectionID
            video
        }
    }
`;


// Message Query

export const GET_ALL_MESSAGES = gql`
    query {
        getMessages{
            _id
            User{
                userName
                profileImage
            }
            message
            createdDate
        }
    }
`;

// Message Mutation

export const SEND_MESSAGE = gql`
    mutation($message: String!, $_id: ID!){
        addMessages(message: $message, _id: $_id){
            message
        }
    }
`;


// TutorialMessages Query

export const GET_ALL_TUTORIALMESSAGES = gql`
    query($TutorialID: String!) {
        getTutorialMessages(TutorialID: $TutorialID){
            _id
            userName
            message
            TutorialID
            createdDate
        }
    }
`;


// TutorialMessages Mutation

export const SEND_TUTORIALMESSAGE = gql`
    mutation($TutorialID: String!, $message: String!, $userName: String!){
        addTutorialMessages(TutorialID: $TutorialID, message: $message, userName: $userName){
            message
            userName
            TutorialID
        }
    }
`;

// Tutorials Mutation

export const ADD_TUTORIAL = gql`
    mutation($name: String!, $description: String!, $price: String!, $duration: String!, $userID: ID!, $image: String!){
        addTutorial( name: $name description: $description price:$price duration:$duration UserID: $userID, image: $image){ 
            name
        }
    }
`;

export const DELETE_Tutorial = gql`
  mutation($_id: ID!) {
    deleteTutorial(_id: $_id) {
      _id
    }
  }
`;


export const CHANGE_TUTORIAL_NAME = gql`
    mutation($_id: ID!, $newName: String!, $newDescription: String!){
        changeTutorialName(_id: $_id, newName: $newName, newDescription: $newDescription){
           _id
        }
    }
`;


export const ADD_SECTION = gql`
    mutation($name: String!, $description: String!, $ID: String!){
        addSection( name: $name description: $description, TutorialID:$ID){ 
            name
        }
    }
`;


export const DELETE_SECTION = gql`
  mutation($_id: ID!) {
    deleteSection(_id: $_id) {
      _id
    }
  }
`;


export const EDIT_SECTION = gql`
    mutation($_id: ID!, $newName: String!, $newDescription: String!){
        editSection(_id: $_id, newName: $newName, newDescription: $newDescription){
           _id
        }
    }
`;

export const ADD_LECTURE = gql`
    mutation($name: String!, $description: String!, $ID: String!, $video: String){
        addLecture( name: $name, description: $description, SectionID: $ID, video: $video){ 
            name
        }
    }
`;


export const DELETE_LECTURE = gql`
  mutation($_id: ID!) {
    deleteLecture(_id: $_id) {
      _id
    }
  }
`;


export const EDIT_LECTURE = gql`
    mutation($_id: ID!, $newName: String!, $newDescription: String!){
        editLecture(_id: $_id, newName: $newName, newDescription: $newDescription){
           _id
        }
    }
`;








// User Queries
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            _id
            firstName
            lastName
            joinDate
            userName
            email
            profileImage
            isUser
            isAdmin
            isTeacher
            isMentor
        }
    }
`;

export const GET_ALL_USERS = gql`
    query {
        getAllUsers{
            _id
            firstName
            lastName
            joinDate
            userName
        }
    }
`;

export const GET_USER = gql`
    query ($userName: String!){
        getUser(userName:$userName){
            _id
            firstName
            lastName
            joinDate
            userName
            email
            profileImage
            isUser
            isAdmin
            isTeacher
            isMentor
        }
    }
`;

export const GET_ALL_TEACHERS = gql`
    query {
        getAllTeachers{
            _id
            firstName
            lastName
            userName
        }
    }
`;

export const GET_ALL_MENTORS = gql`
    query {
        getAllMentors{
            _id
            firstName
            lastName
            userName
        }
    }
`;











// User Mutation

export const SIGNUP_USER = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $userName: String!, $password: String!, $isUser:Boolean!, $isAdmin: Boolean!, $isTeacher: Boolean!, $isMentor: Boolean!, $profileImage: String!){
        signupUser(firstName: $firstName, lastName: $lastName, email: $email, userName: $userName, password: $password, isUser:$isUser, isAdmin:$isAdmin, isTeacher:$isTeacher, isMentor:$isMentor, profileImage: $profileImage){ 
            token 
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($email: String!, $password: String!){
        signinUser(email: $email, password: $password){ 
            token 
        }
    }
`;

export const CHANGE_EMAIL = gql`
    mutation($currentEmail: String!, $newEmail: String!){
        changeEmail(currentEmail: $currentEmail, newEmail: $newEmail){
            email
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation($email: String!, $password: String!){
        changePassword(email: $email, password: $password){
            email
        }
    }
`;

export const CHANGE_PROFILE_IMAGE = gql`
    mutation($email: String!, $profileImage: String!){
        editProfileImage(email: $email, profileImage: $profileImage){
           email
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation($email: String!){
        passwordReset(email: $email){
            email
        }
    }
`;

export const DELETE_USER = gql`
  mutation($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;


//Claim mutation
export const ADD_CLAIM = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $subject: String!, $description: String!){
    addClaim(firstName: $firstName, lastName : $lastName, email: $email, subject: $subject, description: $description ){
        email
      }
  }
`;


//Claim Query

export const GET_ALL_CLAIMS = gql`
    query {
        getClaims{
            _id
            firstName
            lastName
            email
            subject
            description
        }
    }
`;

export const GET_CLAIM = gql`
    query ($ClaimID: ID){
        getClaim(_id: $ClaimID){
            _id
            firstName
            lastName
            email
            subject
            description
        }
    }
`;


//Orders Query

export const GET_ALL_ORDERS = gql`
    query {
        getOrders{
            _id
            TutorialID
            userName
            createdDate
        }
    }
`;

export const GET_SPECIFIC_ORDER = gql`
    query ($userName: String!, $TutorialID: String!){
        getSpecificOrder(userName: $userName, TutorialID : $TutorialID ){
            _id
            TutorialID
            userName
            createdDate
        }
    }
`;

//Orders Mutation

export const ADD_ORDER = gql`
  mutation($TutorialID: String!, $userName: String!){
    addOrders(TutorialID: $TutorialID, userName : $userName){
        TutorialID
        userName
      }
  }
`;


//Comments Query

export const GET_COMMENTS = gql`
    query ($TutorialID: String!){
        getRatingsAndComments(TutorialID: $TutorialID){
            _id
            TutorialID
            userName
            createdDate
            comment
            rating
        }
    }
`;

export const GET_RATING_EXCEPT = gql`
    query ($TutorialID: String!){
        getRatingsAndCommentsExcept(TutorialID: $TutorialID){
            rating
        }
    }
`;

export const GET_RATING = gql`
    query ($TutorialID: String!, $rating: Int!){
        getRatingAndComment(TutorialID: $TutorialID, rating: $rating){
            rating
        }
    }
`;

//Comments Mutation

export const ADD_COMMENT = gql`
  mutation($TutorialID: String!, $userName: String!, $comment: String!, $rating: Int!){
    addRatingAndComment(TutorialID: $TutorialID, userName : $userName, comment : $comment, rating: $rating){
        TutorialID
        userName
      }
  }
`;

export const GET_BLOG_COMMENTS = gql`
    query ($BlogID: String!){
        getBlogComments(BlogID: $BlogID){
            _id
            BlogID
            User{
                userName
                profileImage
            }
            createdDate
            comment
        }
    }
`;

//Comments Mutation

export const ADD_BLOG_COMMENT = gql`
  mutation($BlogID: String!, $UserID: ID!, $comment: String!){
    addBlogComment(BlogID: $BlogID, User: $UserID, comment : $comment){
        BlogID
      }
  }
`;

//Quiz Query

export const GET_QUIZZES = gql`
    query ($LectureID: String){
        getQuizzes(LectureID: $LectureID){
            _id
            QuizQuestion
            LectureID
            QuizName 
            answers
            correctAnswer
        }
    }
`;

//Quiz Mutation

export const ADD_QUIZ = gql`
  mutation($LectureID: String!, $QuizName: String!, $QuizQuestion: String!, $answers: [String!], $correctAnswer: String!){
    addQuiz(LectureID: $LectureID, QuizName: $QuizName, QuizQuestion: $QuizQuestion, answers: $answers, correctAnswer: $correctAnswer){
        LectureID
      }
  }
`;

export const EDIT_QUIZ = gql`
    mutation($_id: ID!, $QuizName: String!, $QuizQuestion: String!, $answers: [String!], $correctAnswer: String!){
        editQuiz(_id: $_id, QuizName: $QuizName, QuizQuestion: $QuizQuestion, answers: $answers, correctAnswer: $correctAnswer){
           _id
        }
    }
`;

export const DELETE_QUIZ = gql`
  mutation($_id: ID!) {
    deleteQuiz(_id: $_id) {
      _id
    }
  }
`;

// Blog Queries
export const GET_BLOGS = gql`
    query {
        getBlogs{
            _id
            title
            category
            subject
            content
            User{
                userName
                profileImage
            }
            createdDate
            image
        }
    }
`;

export const GET_BLOG = gql`
    query($_id: ID!) {
        getBlog( _id: $_id){
            _id
            title
            category
            subject
            content
            User{
                userName
                profileImage
            }
            createdDate
            image
        }
    }
`;

//Blog Mutation
export const ADD_BLOGS = gql`
 mutation($title: String!, $category: String!, $subject: String!, $content: String!, $User: ID!, $image: String!){
     addBlogs( title: $title, category:$category, subject:$subject, content:$content, User: $User, image: $image){ 
        title
     }
 }
`;

export const EDIT_BLOGS = gql`
 mutation($_id: ID!, $newTitle: String!, $newSubject: String!, $newContent: String!, $newCategory: String!){
     editBlogs(_id: $_id, newTitle: $newTitle, newSubject: $newSubject, newContent:$newContent, newCategory: $newCategory ){
        _id
     }
 }
`;

export const DELETE_BLOGS = gql`
mutation($_id: ID!) {
 deleteBlogs(_id: $_id) {
   _id
 }
}
`;

// Bootcamp Queries
export const GET_CAMPS = gql`
    query {
        getCamps{
            _id
            DateAndTime
            CampName
            url
            createdDate
            Mentor{
                userName
                isAdmin
                isUser
                isMentor
            }
            Canceled
        }
    }
`;

export const GET_MENTOR_CAMPS = gql`
    query ($MentorUserName: String!){
        getCamps(MentorUserName: $MentorUserName) {
            _id
            DateAndTime
            CampName
            url
            createdDate
        }
    }
`;

//Bootcamp Mutation
export const ADD_CAMP = gql`
 mutation($CampName: String!, $url: String!, $DateAndTime: String!, $_id: ID!){
     addCamp( CampName: $CampName, url: $url, DateAndTime: $DateAndTime, _id: $_id){ 
        CampName
     }
 }
`;

export const CANCEL_CAMP = gql`
 mutation($Canceled: Boolean!, $_id: ID!){
     cancelCamp( Canceled: $Canceled, _id: $_id){ 
        Canceled
     }
 }
`;

export const EDIT_CAMP = gql`
    mutation($CampName: String!, $url: String!, $DateAndTime: String!, $_id: ID!){
        editCamp( CampName: $CampName, url: $url, DateAndTime: $DateAndTime, _id: $_id){
           _id
        }
    }
`;