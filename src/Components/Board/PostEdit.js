import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "./PostAdd";

@inject('stores')
@observer
class PostEdit extends Component {
    state = {
        title: '',
        content: '',
        id: 1,
        goToPost: false
    }

    async componentDidMount() {
        await this.props.stores.PostStore.fetchItem(this.props.postId)
        this.setState({
            ...this.props.stores.PostStore.item
        })
    }

    onTitleChanged = e => {
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }

    onContentChanged = (e, editor) => {
        this.setState({
            ...this.state,
            content: editor.getData()
        })
    }

    updatePost = async () => {
        let p = this.props.stores.PostStore;
        if(await p.updatePost(this.state)){
            this.setState({
                goToPost: true
            })
        }
    }

    render() {
        if (this.state.goToPost)
            return <Redirect to={'/board/view/'+this.state.id}/>
        return (
            <div>
                <div>
                    제목<input placeholder='제목' value={this.state.title} onChange={this.onTitleChanged}/>
                </div>
                <div>
                    내용
                    <div>
                        <CKEditor editor={ClassicEditor}
                                  data={this.state.content}
                                  onChange={this.onContentChanged}></CKEditor>
                    </div>
                </div>
                <div className='footer'>
                    <span onClick={this.updatePost}>확인</span>
                    <Link to={'/board/view/' + this.state.id}>
                        <span>취소</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default PostEdit;