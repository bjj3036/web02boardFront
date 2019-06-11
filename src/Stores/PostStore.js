import {observable, action} from "mobx"
import axios from "axios"

class PostStore {
    static _instance = null;

    static getInstance() {
        if (PostStore._instance === null)
            PostStore._instance = new PostStore();
        return PostStore._instance;
    }

    constructor() {
        PostStore._instance = this;
    }

    @observable current_time = null;
    @action getTime = async () => this.current_time = await new Date().getTime();

    @observable items = null;
    @action fetchItems = async () => {
        try {

            let response = await axios({
                url: 'http://localhost:8080/api/board',
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.status === 200)
                this.items = response.data
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @observable item = null;
    @action fetchItem = async (postId) => {
        try {
            this.item = null;
            let response = await axios({
                url: 'http://localhost:8080/api/board/findById/' + postId,
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.status === 200)
                this.item = response.data
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @action addNewPost = async (post) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/board/add',
                method: 'post',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: post,
                timeout: 3000
            });
            return (response.status === 200);
        } catch (e) {
            return false;
        }
    }

    @action updatePost = async (post)=>{
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/board/modify',
                method: 'put',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: post,
                timeout: 3000
            });
            return (response.status === 200);
        } catch (e) {
            return false;
        }
    }

    @action deletePost = async (postId)=>{
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/board/delete/'+postId,
                method: 'delete',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            return (response.status === 200);
        } catch (e) {
            return false;
        }
    }
}


export default PostStore.getInstance();