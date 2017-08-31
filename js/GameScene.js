
// 游戏关卡场景

function GameScene(game,datas){

    this.datas = datas
    this.index = 0

    // 当前正在进行的游戏数据 开始是第一个（this.index = 0）
    this.data = datas[this.index]
    // 调用父构造函数来构造自己
    Scene.call(this,game,this.data.src)

}

// 创建原型链实现继承
GameScene.prototype = Object.create(Scene.prototype)
GameScene.prototype.constructor = GameScene;

// 重写“父类”load方法
GameScene.prototype.load = function(prevScene){
    this.differences = new Differences(this.game,this.data.diffs)
    this.fullScreen = new FullScreen(this.game.box)
    // 添加倒计时和几处不同 标签
    this.secondManager = new SecondManager(this.game.box,this.data.seconds)
    this.label = new Label(this.game.box)

    this.fullScreen.show()
    this.secondManager.show()
    this.label.show()

    // 调用“父类”原型中的load方法传递this
    Scene.prototype.load.call(this);


    // 根据游戏数据设置数字标签的初始值及回调函数
    // 根据游戏数据设置倒计时的初始值及回调函数
    this.label.set(this.pass.bind(this), this.data.diffs.length);
    this.secondManager.set(this.timeout.bind(this), this.data.seconds); 

   

    // 当进入“游戏场景”后要退出“开始场景”
    prevScene.$ele.fadeOut(1500,function(){
        prevScene.unload()

        this.secondManager.start()  
    }.bind(this));
    // 注意 要得到开始场景  把它退出
    // 在进入游戏
}

// 重写点击的监听函数
GameScene.prototype.clickListener = function(x,y){
    if(this.differences.check(x,y)){
        // 调用SecondManager.js里的decrease（）方法
        this.label.decrease()
    }
}

// 添加重置游戏场景方法
GameScene.prototype.reset = function(start){
    this.label.set(this.pass.bind(this),this.data.diffs.length)
    this.secondManager.set(this.timeout.bind(this),this.data.seconds)

    // 重置不同
    this.differences.reset()
      // 从超时场景返回时需要再次将游戏的点击监听函数切换成游戏场景的监听函数
    this.game.clickListener = this.clickListener.bind(this);

    if(start) this.secondManager.start();

}

// 游戏超时的方法
GameScene.prototype.timeout = function(){
    this.game.audio.playTimeout()
    var scene = new TimeoutScene(this.game, this)
    scene.load(true)
}

// 游戏过关时的方法
GameScene.prototype.pass = function(label,preview){
    if (preview) {
        // 当数字标签里的数字变为0的时候
        // 停止倒计时并播放过关音效
        this.secondManager.stop();

        if (this.index < this.datas.length - 1) {
            // 播放过关音效
            this.game.audio.playPass();
        } else this.game.audio.playComplete();
        return;
    }
    // 载入下一个游戏场景
    // 判断是否还有游戏数据 如果还有就加载下一个游戏数据
    if(++this.index < this.datas.length){
        this.data = this.datas[this.index];
        var ele = this.$ele
        // 添加下一个 不同 的游戏图片到页面上
        this.$ele = $('<img>').attr('src',this.data.src).prependTo(this.game.box)
        // 将上一个 不同 的游戏图片淡出
        ele.fadeOut(1500,function(){
            // 开始倒计时
            this.secondManager.start()
            ele.remove()

           
        }.bind(this))
         // 调用reset
         this.reset()
            // ???

            // 
            this.differences = new Differences(this.game,this.data.diffs)
    }else{
        this.differences.reset()
        this.game.complete()
    }
}