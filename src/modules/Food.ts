// 定义食物类
export default class Food {
    element: HTMLElement
    constructor() {
        this.element  = document.getElementById('foot')! //获取食物节点
    }

    get X () {
        return this.element.offsetLeft
    }

    get Y () {
        return this.element.offsetTop
    }

    change () {
        // 生成一个随机的位置 
        // 食物的位置坐标 最小为(0, 0), 最大为(290, 290)
        // 蛇移动一次就是一格子  一格的大小就是10 所以要求食物的坐标必须是整10

        const left = Math.round(Math.random() * 29) * 10 + 'px'
        const top = Math.round(Math.random() * 29) * 10 + 'px'

        this.element.style.left = left
        this.element.style.top = top
    }
}