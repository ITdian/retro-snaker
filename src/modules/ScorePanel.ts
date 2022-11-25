export default class ScorePanel {
    score = 0
    level = 1
    scoreEl: HTMLElement // 显示分数的节点
    levelEl: HTMLElement // 显示水平的节点
    scoreNameEl: HTMLElement
    levelNameEl: HTMLElement
    maxLevel: number
    upScore: number
    constructor (maxLevel: number = 10, upScore: number = 10) {
        this.scoreEl = document.getElementById('score')!
        this.levelEl = document.getElementById('level')!
        this.scoreNameEl = document.getElementById('score-name')!
        this.levelNameEl = document.getElementById('level-name')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 设置一个加分方法
    addScore () {
        this.scoreEl.innerHTML = ++this.score + ''
        if (this.score % this.upScore === 0) {
            this.addLevel()
        }
    }

    // 设计一个添加级别的方法
    addLevel () {
        if (this.level < this.maxLevel) {
            this.levelEl.innerHTML = ++this.level + ''
        }
    }

    // 重置分数和级别
    reset () {
        this.score = 0
        this.level = 1
        this.scoreEl.innerHTML = this.score + ''
        this.levelEl.innerHTML = this.level + ''
    }

    // 设置中英文分数名字
    setScoreName (name: string) {
        this.scoreNameEl.innerHTML = name
    }
     // 设置中英文级别名字
    setLevelName (name: string) {
        this.levelNameEl.innerHTML = name
    }
}