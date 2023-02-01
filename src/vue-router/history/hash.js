import History from '@/vue-router/history/base'

function ensureHash() {
    if (!window.location.hash){
        window.location.hash ="/"
    }
}
function getHash(){
    return window.location.hash.slice(1)
}
export default class Hash extends History{
    constructor(router) {
        super(router)
        ensureHash()
    }
    getCurrentLocation(){
        return getHash()
    }
    setUpListener(){
        window.addEventListener("hashchange", ()=> {
            this.transitionTo(getHash())
        })
    }
    pushState(location){
        window.location.hash = location
    }
}
