
export default {
    //函数式组件，会导致render函数中没有this了
    //正常组件是一个类 this.init() ,如果是函数式组件就是一个普通函数
    functional:true,
    props: {
        to: {
            type: String,
            required: true
        }
    },
    render(h,{props,slots,parent}) {
        const click = () => {
            parent.$router.push(props.to)
        }
        return <a onClick={click}>{slots().default}</a>
    }
}
