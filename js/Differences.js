
// 管理每一张图片上的“不同”数据 画圆及管理圆圈

function Differences(game,diffs){
    this.game = game;
    this.diffs = diffs
}

// 判断x , y 坐标点是否在“不同”的数据中
// 主要功能是用来判断
Differences.prototype.check = function(x,y){
    // 循环每一个不同数据
    for(var i = 0;i < this.diffs.length;i++){
        var diff = this.diffs[i]
        
        
        //防止画多个圆圈
        //  如过已经画过圆圈 用continue跳过下面代码
        if(diff.showed) continue

        // 计算不同区域
        var left = diff.center.x - diff.radius
        var right = diff.center.x + diff.radius
        var top = diff.center.y - diff.radius
        var bottom = diff.center.y + diff.radius

        // 判断点击的范围
        if(x > left && x < right && y > top && y < bottom){
            // 画圆及管理圆圈 
            this.show(diff,left,top)
            return true
        }
    }
    return false
}

// 画圆方法
Differences.prototype.show = function(diff,left,top){
    $('<div class = "diff">').css({
        width:diff.radius * 2 + 'px',
        height:diff.radius * 2 + 'px',
        position:'absolute',
        top:top + 'px',
        left: left + 'px',
        border:'5px solid red',
        borderRadius:'50%',
        animation:'s 1.5s'
    }).appendTo(this.game.box)
    // 返回true
    diff.showed = true
}

// 重置数据
Differences.prototype.reset = function(){
    // 重置游戏数据
    this.diffs.forEach(function(diff){
        diff.showed = false
    });
    // 移除页面上的所有圆
    $(this.game.box).find('.diff').remove()
}