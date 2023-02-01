import {createRouteMap} from '@/vue-router/create-route-map'

export  function createMatcher(routes){
    let {pathMap} = createRouteMap(routes);
    function match(path){
        return pathMap[path]
    }
    function  addRoutes(routes){
        // 将新的路由添加到pathMap
        createRouteMap(routes,pathMap)
    }
    return {
        match,
        addRoutes
    }
}
