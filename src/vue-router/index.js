import install from './install'
import {createMatcher} from '@/vue-router/create-matcher'
import Hash from '@/vue-router/history/hash'
import HTML5History from '@/vue-router/history/h5'

class VueRouter {
    constructor(options = {}) {
        const routes = options.routes;
        this.mode = options.mode || "hash";
        this.matcher = createMatcher(routes || []);
        this.beforeHooks = [];
        // 根据模式切换不同的路由系统
        switch (this.mode) {
            case 'hash':
                this.history = new Hash(this);
                break;
            case 'history':
                this.history = new HTML5History(this);
                break;
        }
    }

    match(path) {
        return this.matcher.match(path);
    }

    push(location) {
        this.history.transitionTo(location, () => {
            this.history.pushState(location)
        })
    }

    init(app) {
        let history = this.history;//当前管理路由的实例
        const setUpListener = () => {
            history.setUpListener()
        }
        history.transitionTo(history.getCurrentLocation(), setUpListener);
        history.listen((route) => {
            // 修改app._route的值,_route改变重新更新App视图
            app._route = route;
        })
    }

    beforeEach(cb) {
        this.beforeHooks.push(cb)
    }
}

VueRouter.install = install;
export default VueRouter;
