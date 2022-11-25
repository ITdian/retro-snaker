import Food from "./Food";
import Snaker from "./Snaker";
import ScorePanel from "./ScorePanel";
import {DIRECTION_LIST, LANGUAGE} from './config'

interface languageType {
    startGame: string,
    pauseGame: string,
    overGame: string,
    score: string,
    level: string
}

export default class GameControl {
    // 食物
    food: Food;
    // 蛇
    snaker: Snaker;
    // 记分牌
    scorePanel: ScorePanel;
    // 创建一个属性来记录蛇的方向
    direction: string = ''
    // 创建一个属性记录游戏是否结束
    isLive: boolean = false
    startEl: HTMLElement
    pauseEl: HTMLElement
    overEl: HTMLElement
    selectEl: HTMLElement
    isDead: boolean = false
    constructor () {
        this.food = new Food()
        this.snaker = new Snaker()
        // ScorePanel 设置最大级别限制  目标分数升级
        this.scorePanel = new ScorePanel(10, 10)
        this.startEl = document.getElementById('start')!
        this.pauseEl = document.getElementById('pause')!
        this.overEl = document.getElementById('over')!
        this.selectEl = document.getElementById('select')!
    }
    init () {
        document.addEventListener('keydown', this.keydownHandle.bind(this))
        this.startEl.addEventListener('click', this.startGame.bind(this))
        this.pauseEl.addEventListener('click', this.pause.bind(this))
        this.overEl.addEventListener('click', this.overGame.bind(this))
        this.selectEl.addEventListener('change', this.changeLg.bind(this))
    }

    run () {
        // 获取蛇的坐标
        let X = this.snaker.X
        let Y = this.snaker.Y
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
            case 'w':
            case 'W':
                Y -= 10
                break
            case 's':
            case 'S':
            case 'ArrowDown':
            case 'Down':
                Y += 10
                break
            case 'D':
            case 'd':
            case 'ArrowRight':
            case 'Right':
                X += 10
                break
            case 'a':
            case 'A':
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break
        }
        this.cheakFoot(X, Y)
        try {
            // 改变蛇的坐标
            this.snaker.X = X
            this.snaker.Y = Y
        } catch (error: any) {
            alert(error.message)
            this.overGame()
        }
       this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level-1)*30)
    }

    cheakFoot (X: number, Y: number) {
        if (this.food.X === X && this.food.Y === Y) {
            console.log('吃到食物了!!')
            this.food.change()
            this.scorePanel.addScore()
            this.snaker.addBody()
        }
    }

    keydownHandle (event: KeyboardEvent) {
        // 需要检查event.key的值是否合法（用户是否按了正确的按键）
        // 修改direction属性 // 支持wsad  上下左右箭头
        const key = event.key
        if (DIRECTION_LIST.includes(key)) {
            this.direction = key
        }
    }

    changeLanguage (lg: languageType) {
        this.startEl.innerHTML = lg.startGame
        this.pauseEl.innerHTML = lg.pauseGame
        this.overEl.innerHTML = lg.overGame
        this.scorePanel.setScoreName(lg.score)
        this.scorePanel.setLevelName(lg.level)
    }

    startGame () {
        if (this.isLive) return
        this.direction = 'Right'
        this.isLive = true
        this.run()
    }
    pause () {
        this.isLive = !this.isLive
        this.isLive && this.run()
    }
    overGame () {
        this.isDead = true
        this.isLive = false
        this.snaker.initStart()
        this.direction = ''
        this.scorePanel.reset()
    }

    changeLg (event: Event) {
        const val = (event.target as HTMLInputElement).value
        val === 'cn' ? this.changeLanguage(LANGUAGE.CN) : this.changeLanguage(LANGUAGE.EN)
    }
}