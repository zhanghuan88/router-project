export function createRouteMap(routes, oldPathMap) {
    let pathMap = oldPathMap || {};


    routes.forEach(route => {
        addRouteRecord(route, pathMap)
    })
    return {
        pathMap
    }

}

function addRouteRecord(route, pathMap, parentRecord) {
    let path =parentRecord?`${parentRecord.path}/${route.path}`: route.path;
    let record = { // path匹配的记录
        path,
        component: route.component,
        props: route.props || {},
        parent:parentRecord
    }
    pathMap[path] = record;
    route.children && route.children.forEach(childRoute => {
        addRouteRecord(childRoute, pathMap, record); //在循环儿子的时候同时传递父路径记录
    })
}

