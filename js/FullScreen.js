// 全屏按钮

// FullScreen()是全屏按钮的构造函数
// box：全屏按钮放置的位置  即父元素
// options：覆盖代码中的默认数据 实现样式自定义
function FullScreen(box,options){
    this.box = box
    // this.options表示扩展后的对象
    this.options = $.extend({
        position:'absolute',
        left:'10px',
        bottom:'25px',
        fontSize:'16px',
        backgroundColor:'red',
        display:'inline-block',
        padding:'8px',
        borderRadius:'6px'
    },options)
}

// 添加显示方法
FullScreen.prototype.show =function(){
    this.$ele = $('<span>',{
        on:{
            click:function(){
                // fullScreen()方法来自jquery.fullScreen插件
                // FullScreen.isFullScreen = !FullScreen.isFullScreen表示对isFullScreen赋相反的值
                // 下面这句代码可以让文档对象在全屏和非全屏状态下实现切换
                $(document).fullScreen(FullScreen.isFullScreen = !FullScreen.isFullScreen)
                // 添加span（退出全屏按钮）文本
                if(FullScreen.isFullScreen){
                    $(this).text('退出全屏')
                }else $(this).text('全屏')
            }
        }
    }).text(FullScreen.isFullScreen ? '退出全屏' : '全屏').css(this.options).prependTo(this.box)
}

FullScreen.prototype.remove = function(){
    this.$ele.remove()
}