export default class Snaker {
    element: HTMLElement // 蛇的容器
    bodies: HTMLCollection // 蛇身体
    head: HTMLElement // 定义蛇头

    constructor () {
        this.element = document.getElementById('snaker')!
        this.bodies = this.element.getElementsByTagName('div')
        this.head = document.querySelector('#snaker > div') as HTMLElement
    }

    // 获取蛇头的坐标

    get X () {
        return this.head.offsetLeft
    }
    get Y () {
        return this.head.offsetTop
    }

    
    set X(value : number) {
        
        if (this.X === value) return
        if (value<0 || value>290) {
            throw Error('蛇撞墙了! GAME OVER!!!')
        }
        // 修改X时候，是在修改水平坐标， 蛇在左右移动，蛇在向左移动时候， 不能向右调头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            console.log('蛇在左右移动', value, this.X)
            // 如果发生了掉头，让蛇反向移动
            if (value > this.X) {
                // 如果新值大于旧值，则说明原来向左走，突然向右走，应该让旧值减一步（this.X - 10）
                value = this.X  - 10
            } else { //反之 则说明原来向右走，突然向左走，应该让旧值加一步（this.X + 10）
                value = this.X  + 10
            }
        }

        this.moveBody()
        this.head.style.left = value + 'px';  // 先移动再改蛇头位置(蛇头位置最后更改)
        this.checkHeadBody()
    }

    set Y(value : number) {
        if (this.Y === value) return
        if (value<0 || value>290) {
            throw Error('蛇撞墙了! Game Over!!!')
        }
         // 修改Y时候，是在修改垂直坐标， 蛇在上下移动，蛇在向下移动时候， 不能向上调头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            console.log('蛇在上下移动', value, this.X)
            // 如果发生了掉头，让蛇反向移动
            if (value > this.Y) {
                // 如果新值大于旧值，则说明原来向上走，突然向下走，应该让旧值减一步（this.Y - 10） ===> 保持向上走的趋势
                console.log('向上走时候发生↑  向下按键操作')
                value = this.Y  - 10
            } else { //反之 则说明原来向下走，突然向上走，应该让旧值加一步（this.Y + 10） ===> 保持向下走的趋势
                value = this.Y  + 10
            }
        }

        this.moveBody()
        this.head.style.top = value + 'px';
        this.checkHeadBody()
    }

    addBody () {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }
    
    // 添加一个蛇移动的方法
    moveBody () {
        /**
         * 将后面的身体设置为前边身体的位置
         *  // 举例子
         *      第三节 --> 第二节
         *      第二节 ---> 第一节(蛇头位置)
         */
        const bodies = this.bodies
        const len = bodies.length - 1
        for (let i = len; i > 0; i--) {
            const el = bodies[i];
            const beforeEl = bodies[i-1]
            const X = (beforeEl as HTMLElement).offsetLeft 
            const Y = (beforeEl as HTMLElement).offsetTop

            ;(el as HTMLElement).style.left = X +'px'
            ;(el as HTMLElement).style.top = Y +'px'
        }
    }

    checkHeadBody () {
        for (let i = 1; i < this.bodies.length; i++) {
            const body = this.bodies[i] as HTMLElement;
            if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
                throw Error('撞到自己了! GAME OVER!!!')
            }
        }
    }

    initStart () {
        this.element.innerHTML = "<div></div>"
        this.head = document.querySelector('#snaker > div') as HTMLElement
    }

}