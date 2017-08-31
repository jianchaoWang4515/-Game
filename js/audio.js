// audio.js
// 用来管理页面上所有音效

function Audio(){

    // 把jquery集合中所有的DOM元素恢复成一个数组
    this.audios = $('audio').toArray()

    // 背景音乐
    this.music = this.audios[0];
    // 点击音效
    this.click = this.audios[1];
    // 过关音效
    this.pass = this.audios[2];
    // 超时音效
    this.timeout = this.audios[3]
    // 通关音效
    this.complete = this.audios[4];
}

Audio.prototype.pauseAll = function(){
    this.audios.forEach(function(audio){
        audio.pause()
    })
}

// 播放背景音乐
Audio.prototype.playMusic = function(only){
    // 播放背景音乐时  先暂停所有音乐
    // 在单独播放背景音效
    if(only){
        this.pauseAll()
    }
    // 加载
    this.music.load();
    // 播放
    this.music.play();
}

// 播放点击音效
Audio.prototype.playClick = function(){
    // 播放点击音效时 为了让音效更清晰 应该暂停背景音乐(静音)   
    this.muteMusic()
    // 播放点击音效
    this.click.load();
    this.click.play()

    // 0.5秒后恢复背景音乐
    setTimeout(function(){
        this.recoverMusic()
    }.bind(this),500)
}

// 播放过关音效
Audio.prototype.playPass = function(){
    this.muteMusic(true)

    this.pass.load()
    this.pass.play()

    // 在过关音效播放时  阻止恢复背景音乐
    // 在防止点击鼠标时背景音乐提前恢复
    // 6秒后恢复背景音乐
    setTimeout(function(){
        this.recoverMusic(true)
    }.bind(this),6 * 1000)
}

// 播放通关音效
Audio.prototype.playComplete = function(){
    this.muteMusic(true)

    this.complete.load()
    this.complete.play()

    setTimeout(function(){
        this.recoverMusic(true)
    }.bind(this), 8 * 1000)
}

// 播放超时音效
Audio.prototype.playTimeout = function(){
    this.muteMusic(true)

    this.timeout.load()
    this.timeout.play()

    setTimeout(function(){
        this.recoverMusic(true);
    }.bind(this), 4 * 1000)
}


// 让背景音乐静音
// preventRecover 表示是否阻止恢复背景静音
Audio.prototype.muteMusic = function(preventRecover){
    // 音量变为零
    this.music.volume = 0
    this.preventRecover = preventRecover;
}

// 恢复背景音乐
// force 表示强制恢复
Audio.prototype.recoverMusic = function(force){
    if(force){
        // 强制恢复时将preventRecover设置为false
        this.preventRecover = false
    }
    // 判断是否阻止恢复 如果阻止恢复直接返回
    if(this.preventRecover) return
    // 让背景音乐变为1

    this.music.volume = 1
}