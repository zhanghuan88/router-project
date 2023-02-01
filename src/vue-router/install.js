import RouterLink from '@/vue-router/components/link'
import RouterView from '@/vue-router/components/view'

export let Vue;

 export default function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if (this.$options.router){
                //根组件
                this._router = this.$options.router;//路由实例
                this._routerRoot =this; //  表示根组件上有一个唯一的标识叫_routerRoot 指向了自己

                //  初始化路由逻辑
                this._router.init(this)
                //  路径变化 改变视图
                //  依靠响应式原理,监听current的变化,利用Vue.util.defineReactive()
                // current里面的属性在哪使用，就会收集对应的watcher
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            }else {
                // 子 子孙组件
                this._routerRoot =this.$parent && this.$parent._routerRoot;
            }
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get(){
            return this._routerRoot._router;
        }
    })
    Object.defineProperty(Vue.prototype, '$route', {
        get(){
            return this._routerRoot._route;
        }
    })
    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)
}
