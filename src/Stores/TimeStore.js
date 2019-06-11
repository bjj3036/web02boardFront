import {observable, action, computed} from "mobx"

class TimeStore {
    static _instance = null;

    static getInstance() {
        if (TimeStore._instance === null)
            TimeStore._instance = new TimeStore();
        return TimeStore._instance;
    }

    constructor() {
        TimeStore._instance = this;
    }

    //@observable 변수에 붙임
    @observable current_time = null;
    //@action 함수에 붙임
    @action getTime = async () => {
        this.current_time = await new Date();
    }
    //@computed 계산이 필요할 때
    @computed get ms() {
        return this.current_time ? this.current_time.getMilliseconds() : 'not set'
    }
}

export default TimeStore.getInstance();