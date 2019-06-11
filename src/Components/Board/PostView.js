import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from 'react-router-dom';

@inject('stores')
@observer
class PostView extends Component {

    state = {
        goToList: false
    }

    componentDidMount() {
        this.props.stores.PostStore.fetchItem(this.props.postId)
    }

    deletePost = async () => {
        if (window.confirm('삭제하시겠습니까?') === false) return;

        let id = this.props.postId;
        if (await this.props.stores.PostStore.deletePost(id)) {
            await this.props.stores.PostStore.fetchItems();
            this.setState({
                goToList: true
            })
        }
    }

    render() {
        if (this.state.goToList)
            return <Redirect to='/board'/>
        let p = this.props.stores.PostStore;
        if (!p.item)
            return (<div>로딩 중..</div>)
        return (<div>
            <div>
                제목: {p.item.title}
            </div>
            <div>
                내용:
                <div dangerouslySetInnerHTML={{__html: p.item.content}}>
                </div>
            </div>
            <div>
                작성시간: {p.item.created}
            </div>
            <div className='footer'>
                <Link to='/board'>
                    <span>목록</span>
                </Link>
                <span onClick={this.deletePost}>삭제</span>
                <Link to={'/board/edit/' + this.props.postId}>
                    <span>수정</span>
                </Link>
            </div>
        </div>)
    }
}

export default PostView