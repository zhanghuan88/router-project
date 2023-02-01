export default {
    functional:true,
    render(h,{parent,data}){
        let route = parent.$route; // 获取current对象
        let dept = 0; // 先渲染第一层
        while (parent){
            if(parent.$vnode&& parent.$vnode.data.routerView){
                dept++;
            }
            parent = parent.$parent;
        }
        let record = route.matched[dept]
        if (!record){
            //没找到渲染空
            return h();
        }
        // 找到记录 渲染对应组件,增加标识,渲染过了

        return h(record.component,{
            routerView:true
        })
    }
}
