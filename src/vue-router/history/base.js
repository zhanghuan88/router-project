import {iterator} from 'core-js/stable/dom-collections'

function createRoute(record, location) {
    const matched = [];
    if (record) { //找层级结构
        while (record) {
            matched.unshift(record);
            record = record.parent;
        }
    }
    return {
        ...location,
        matched
    }
}

function runQueue(queue, iterator, cb) {
    function step(index) {
        if (index == queue.length) return cb();
        let hook = queue[index];
        iterator(hook, () => step(index + 1))
    }

    step(0)
}

//路由的公共方法
export default class History {
    constructor(router) {
        this.router = router;
        //当前没有匹配记录
        this.current = createRoute(null, {
            path: "/"
        });
    }

    listen(cb) {
        this.cb = cb;
    }

    transitionTo(path, cb) {
        let record = this.router.match(path)
        let route = createRoute(record, {
            path
        })
        // 相同的不在跳转
        if (path === this.current.path && route.matched.length === this.current.matched.length) return;
        let queue = this.router.beforeHooks;
        const iterator = (hook, next) => {
            hook(route, this.current, next)
        }
        runQueue(queue, iterator, () => {
            this.updateRoute(route)
            cb && cb()
        })

    }

    updateRoute(route) {
        this.current = route;
        this.cb && this.cb(route);
    }
}
