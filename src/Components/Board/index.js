import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';

import BoardList from './BoardList';
import PostView from './PostView'
import PostAdd from './PostAdd'
import PostEdit from './PostEdit'

import './Board.scss';

@inject('stores')
@observer
class Board extends Component {

    componentDidMount() {
        this.props.stores.PostStore.fetchItems();
    }

    render() {
        //Router로 넘어온 정보들이 this.props.location 이나 this.props.match에 있음
        if (this.props.match && this.props.match.params.command==='view')
            return <PostView postId={this.props.match.params.postId}/>
        if (this.props.match && this.props.match.params.command==='edit')
            return <PostAdd postId={this.props.match.params.postId}/>
        if (this.props.location && this.props.location.pathname === '/board/add')
            return <PostAdd/>
        let p = this.props.stores.PostStore;
        return (
            <div>
                <div>
                    {p.items && <BoardList items={p.items}/>}
                </div>
                <div>
                    <Link to='/board/add'>글 작성</Link>
                </div>
            </div>
        );
    }
}

export default Board;