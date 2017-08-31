
// 表示还有x次不同  中的数字

function Label(box,total,options){

    this.box = box
    // 总共有几处 不同  初始值是5
    this.total = total || 5
    // 还剩几次不同
    this.value = this.total;

    this.options = {
        position:'absolute',
        left:'555px',
        bottom:'25px',
        fontSize:'32px',
        display:'inline-block',
        color:'white'
    }
}

// show（）方法  把数字显示到页面上
Label.prototype.show = function(){
    this.$ele = $('<span>').text(this.value).css(this.options).prependTo(this.box)

}

// 重新设置初始值和值变为0的回调函数
Label.prototype.set = function(complete,total){
    this.complete = complete
    this.total = total || 5
    this.value = this.total
    this.$ele.text(this.value)

}

// 将数值减为1直到0  如果值变为0则调用回调函数
Label.prototype.decrease = function(){
    if(this.value > 0){
        this.value--
        this.$ele.text(this.value)

    }
    // 过关  调用过关方法
    // 过关方法应该载入下一个游戏场景
    if(this.value == 0 && $.isFunction(this.complete)){
        // 两次调用是为了改善动画带来的延迟
        // this.complete实际调用的是Game.Scene.js里的pass方法
        this.complete(this,true);
        // // 第二次调用
        setTimeout(function(){
            this.complete(this)
        }.bind(this),1500)
    }

}