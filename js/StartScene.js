// StartScene.js
//游戏的开始场景

function StartScene(game,src){
    src = src || 'images/0.jpg';
    // 调用父类构造函数
    // 调用别人的构造函数来构造自己的对象
    Scene.call(this,game,src)
    console.log(this.game)
  
}

// 构造原型链实现继承
StartScene.prototype = Object.create(Scene.prototype)
StartScene.prototype.constructor = StartScene;

// 实现父类中的clickListener方法
// x,y表示鼠标点击的坐标
StartScene.prototype.clickListener = function(x,y){
    console.log(x + ',StartScene,' + y)
    // 判断点击的是否是’开始游戏‘这个按钮的范围
    // 如果是的话就进入游戏的关卡场景
    if(x > 640 && x < 858 && y > 335 && y < 620){ 
        console.log('a')
        // 移除‘全屏’按钮
        this.fullScreen.remove()
        // 加载游戏场景 进入游戏
        // 加载GameScene.js里的load方法进入游戏 
        // 调用loadGameScene()
        this.game.loadGameScene(this)   
    }
}

// 重写Scene.js中场景加载方法，添加全屏按钮
StartScene.prototype.load = function(){
    this.fullScreen = new FullScreen(this.game.box,{
        left:'auto',
        right:'30px'
    })
    // 显示’全屏‘按钮
    this.fullScreen.show()
    // 调用父构造函数原型中的load方法并传递this
    Scene.prototype.load.call(this)
}