import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from "react-router-dom";

const about: React.FC = () => {
    return (
        <div>About</div>
    );
};

const home: React.FC = () => {
    return (
        <div>Home</div>
    );
};

const news: React.FC = () => {
    return (
        <div>News</div>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to="/">Home</Link> <Link to="/about">About</Link> <Link to="/news">News</Link>
                <br />
                <Route exact path="/" component={home}/>
                <Route exact path="/about" component={about}/>
                <Route exact path="/news" component={news}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
