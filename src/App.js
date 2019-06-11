import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Provider} from 'mobx-react';

import Home from './Home';

import './App.scss';

import stores from './Stores';
import Board from "./Components/Board";

class App extends Component {
    state = {
        location: 0,
    };

    render() {
        let {location} = this.state;
        return (
            <Provider stores={stores}>
                <BrowserRouter>
                    <header className='app-header'>
                        <ul className='menu-bar'>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/board'>게시판</Link></li>
                        </ul>
                    </header>
                    <section className='app-body'>
                        <Route path='/' exact component={Home}/>
                        <Route path='/board/:command?/:postId?' exact component={Board}/>
                    </section>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
