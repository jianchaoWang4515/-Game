// 用来控制倒计时

function SecondManager(box,total,options){
    this.box = box 
    this.total = total || 60

    this.options = {
        position:'absolute',
        left:'270px',
        bottom:'20px',
        fontSize:'36px',
        display:'inline-block'
    }
}

// 将倒计时显示到页面上
SecondManager.prototype.show = function(){
    this.$ele = $('<span>').text(this.total < 10 ? "0" + this.total : this.total)
    .css(this.options).prependTo(this.box)
}

// 重新设置倒计时的初始值和倒计时到0的回调函数
SecondManager.prototype.set = function(complete,total){
    this.complete = complete
    console.log(this.complete)
    this.seconds = total;

    var text = this.seconds < 10 ? '0' + this.seconds : this.seconds
    this.$ele.text(text);
    // 
     clearInterval(this.timer);
}

// 启动倒计时  当倒计时到0后调用回调函数
SecondManager.prototype.start = function(){
   
    this.timer = setInterval(function(){
        // 让时间递减
        this.seconds--
        text = this.seconds < 10 ? '0' + (this.seconds < 0 ? '0' : this.seconds) : this.seconds;
        this.$ele.text(text);

        if(this.seconds <= -1){
            // 清除定时器
            clearInterval(this.timer);
             if($.isFunction(this.complete)){
                this.complete(this);
            }
        }
    }.bind(this),1000)
}


// 停止倒计时
SecondManager.prototype.stop = function(){
    clearInterval(this.timer)
}