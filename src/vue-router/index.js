export let Vue;
class VueRouter{
    constructor(options = {}  ) {
    }
}
VueRouter.install=function (_Vue) {
    Vue = _Vue;
    Object.defineProperty(Vue.prototype, '$router', {

    })

}
export default VueRouter;
