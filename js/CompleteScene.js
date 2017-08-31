
// 游戏的通关场景
function CompleteScene(game,src){
    src = src || 'images/complete.jpg'
    Scene.call(this,game,src)
}

CompleteScene.prototype = Object.create(Scene.prototype)
CompleteScene.prototype.constructor = CompleteScene

// 重写load方法  添加下滑效果
CompleteScene.prototype.load = function(append){
    Scene.prototype.load.call(this,append)
    // 下滑
    this.$ele.hide().delay(300).slideDown(1000,function(){
        // 删除通关场景后面所有的标签元素
        // 即之前的游戏场景留下的内容 让游戏从头开始
        // prevAll()是jquery方法
        this.$ele.prevAll().remove();
    }.bind(this))

}

// 重写点击事件监听函数 点击重新开始时加载开始场景
// 让游戏通关图片上滑并卸载通关场景
CompleteScene.prototype.clickListener = function(x,y){
    if(x > 350 && x < 550 && y > 480 && y < 550){
        // 加载开始场景
        this.game.loadStartScene()
        this.$ele.slideUp(1000,function(){
            this.unload()
        }.bind(this))
    }
}