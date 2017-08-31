// Scene.js
// 游戏场景
// 它是所有场景的基类  开始场景 关卡场景 超时场景 通关场景由它来派生

// game表示游戏对象
// img表示场景使用的图片
function Scene(game,img){
    this.game = game
    this.img = img
}

// 场景的加载方法
Scene.prototype.load = function(append){
    // 创建一个img标签用来显示图片
    // this.$ele表示this对象中的一个属性
    // 表示一个封装在jquery对象中的标签元素对象
    // 因为这个标签元素不是一个DOM对象 而是一个jquery封装的对象
    // 所以在名字前面加了$
    // 表示这个是jquery对象 而不是普通的DOM对象
    this.$ele = $('<img>').attr('src',this.img)
    // 把this.$ele放入main
    // prependTo()表示把前一个对象放入后一个里面
    if(append){
        this.$ele.appendTo(this.game.box)
    }else this.$ele.prependTo(this.game.box)

    
     // 让当前场景接收游戏中的点击事件
    // 让事件监听函数中的this指向当前场景，而不是标签元素
    this.game.clickListener = this.clickListener.bind(this)
}

// 表示点击事件监听函数 定义为了一个空方法
// 具体实现由“子类”完成
Scene.prototype.clickListener = function(){

}

// 卸载场景
Scene.prototype.unload = function(){ 
    this.$ele.remove()
}