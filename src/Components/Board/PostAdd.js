import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostAdd extends Component {
    state = {
        title: '',
        content: '',
        userId: 1,
        goToList: false
    }

    constructor(props) {
        super(props);
        if (this.props.postId && this.props.stores.PostStore.item)
            this.state = {
                ...this.state,
                title: this.props.stores.PostStore.item.title,
                content: this.props.stores.PostStore.item.content,
                id: this.props.stores.PostStore.item.id,
            }
    }

    onTitleChanged = e => {
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }

    onContentChanged = (e, editor) => {
        console.log(e.target)
        this.setState({
            ...this.state,
            content: editor.getDate()
        })
    }

    addNewPost = async () => {
        if (this.props.postId && await this.props.stores.PostStore.updatePost(this.state)) {
            await this.props.stores.PostStore.fetchItems();
            this.setState({
                ...this.state,
                goToPost: true
            });
        } else if (await this.props.stores.PostStore.addNewPost(this.state)) {
            await this.props.stores.PostStore.fetchItems();
            this.setState({
                ...this.state,
                goToList: true
            });
        }
    }

    render() {
        if (this.state.goToList)
            return <Redirect to='/board'/>;

        if (this.state.goToPost)
            return <Redirect to={`/board/view/${this.props.postId}`}/>;
        return (
            <div>
                <div>
                    <div>제목</div>
                    <div><input value={this.state.title} onChange={this.onTitleChanged}/></div>
                </div>
                <div>
                    내용
                    <div>
                        <CKEditor editor={ClassicEditor}
                                  data={this.state.content}
                                  onChange={this.onContentChanged}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={this.addNewPost}>확인</button>
                </div>
            </div>
        );
    }
}

export default PostAdd;