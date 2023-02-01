import History from '@/vue-router/history/base'

export default class HTML5History extends History{
    constructor(router) {
        super(router)
    }
    getCurrentLocation(){
        return window.location.pathname;
    }
    setUpListener(){
        window.addEventListener("popstate",()=>{
            this.transitionTo(window.location.pathname)
        })
    }
    pushState(location){
       history.pushState({},null,location)
    }
}
