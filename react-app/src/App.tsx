import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Helmet} from "react-helmet";

const about: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>About page</title>
                <meta name="description" content="This page explains everything about our react app."/>
            </Helmet>
            <div>About</div>
        </div>
    );
};

const home: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Home page</title>
                <meta name="description" content="This page is the home page."/>
            </Helmet>
            <div>Home</div>
        </div>
    );
};

const news: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>News page</title>
                <meta name="description" content="This page shows the latest news."/>
            </Helmet>
            <div>News</div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to="/">Home</Link> <Link to="/about">About</Link> <Link to="/news">News</Link>
                <br/>
                <Route exact path="/" component={home}/>
                <Route exact path="/about" component={about}/>
                <Route exact path="/news" component={news}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
