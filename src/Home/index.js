import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import Board from '../Components/Board'

import './index.scss'

@inject('stores')
@observer
class Home extends Component {

    render() {
        let t = this.props.stores.TimeStore;
        let p = this.props.stores.PostStore;
        return (
            <div>
                <Board/>
            </div>
        );
    }
}

export default Home;