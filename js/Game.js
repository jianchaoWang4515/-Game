// Game.js
// 游戏的基本控制

function Game(box){ 
    this.box = box;

    // 创建音效对象 播放背景音乐
    this.audio = new Audio()
    // 播放
    this.audio.playMusic(true);
    // 监听点击事件
    this.listen()
    // 调用loadStartScene()方法加载开始场景
    this.loadStartScene()

}
// 监听事件
Game.prototype.listen = function(){
    // 监听点击<main>标签
    $(this.box).click(function(ev){
        // offsetX,offsetY 表示鼠标相对于事件源元素的x y 坐标
        // 在这里事件源元素是this.box 即main
        var x = ev.offsetX;
        var y = ev.offsetY;
        console.log('x: ' + x + 'y: ' + y);
        // 播放点击音效
        this.audio.playClick() 


        //clickListener()传递鼠标点击位置
        if(typeof this.clickListener == 'function'){ 
            this.clickListener(x,y) //???
        }

    }.bind(this))
}

// 添加加载开始场景方法
Game.prototype.loadStartScene = function(){
    // 创建开始场景对象并传递当前对象
    var scene = new StartScene(this)
    // 调用StartScene.js的load方法
    scene.load()
}

// 加载游戏场景
Game.prototype.loadGameScene = function(prevScene){
    var scene = new GameScene(this,Game.GameSceneDatas)
    
    scene.load(prevScene)
}

// 加载通关场景
Game.prototype.complete = function(){
    var scene = new CompleteScene(this)
    scene.load(true);
}