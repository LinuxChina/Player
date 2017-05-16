/**
 * Created by liuyujing on 2017/5/16.
 */

window.player = window.player||{};

(function () {

    //todo: 音频播放的核心代码 (注意 封装核心代码 尽量减少入口 添加有必要的（接口）出口（不需把所有接口公开）)
    /*
    * AudioPlayer:音频播放的核心代码 （逻辑部分）
    * urls:音频url的数组 -> 需要让播放器核心 知道 要播放的内容 （可以进行下一曲 随机）
    * */
    function AudioPlayer(urls) {
        this.urls = urls;

        this.init();
    }

    //初始化 音频播放器的函数
    AudioPlayer.prototype.init = function () {

        //当前播放音频的下标 随机播放 下一曲 通过currentSongIndex来控制
        this.currentSongIndex = 0;

    //    音频播放器的dom元素
        this.audioEle = document.createElement("audio");
        document.body.appendChild(this.audioEle);

        //设置 音频播放的 资源文件路径
        this.audioEle.src = this.urls[this.currentSongIndex];

        this.audioEle.autoplay = true;

        /*
        * 播放类型
        * 0：单曲循环
        * 1：随机播放
        * 2：顺序播放
        * */
        this.PlayType = {
            single:0,
            random:1,
            order:2
        };

        //null  undefind 0 -> false
        //获得 保存过的状态
        this.currentPlayType = this.PlayType[localStorage.getItem("loopType")?localStorage.getItem("loopType"):"single"];


        this.listenEnd();

    };

    /*
    * playControl:播放暂停的控制方法
    * 返回值 是播放暂停的状态
    * */
    AudioPlayer.prototype.playControl = function () {
        this.audioEle.paused?this.audioEle.play():this.audioEle.pause();

        return this.audioEle.paused;
    };

    /*
    * setPlayType:设置播放的类型
    * 0：单曲循环
    * 1：随机播放
    * 2：顺序播放
    * */
    AudioPlayer.prototype.setPlayType = function (type) {
        this.currentPlayType = this.PlayType[type];
    //    保存 设置循环状态到本地
        localStorage.setItem("loopType",type);
    };

    AudioPlayer.prototype.next = function () {
        /*
        * 两种情况
        * 1. 单曲0 顺序播放2 -> 音频列表的下一曲
        * 2. 随机播放 -> 下一曲 是随机的
        *
        *
        * currentSongIndex 是用于 获取或者设置 当前播放音乐的下标
        * urls 整个音乐播放列表的数组
        *
        * 获得当前的音乐 ：this.urls[this.currentSongIndex]
        * */

        if (this.currentPlayType != 1){
        //    单曲 数序 播放 -> 让 currentSongIndex 自加 -> 下一曲
            this.currentSongIndex++;

            this.currentSongIndex = this.currentSongIndex>=this.urls.length ? 0:this.currentSongIndex;
        }else {
            this.currentSongIndex = parseInt(Math.random()*this.urls.length);
        }

        /*
        * 获得currentSongIndex（处理过的 《顺序、随机》）
        * 就可以 获得到  下一曲 需要播放的音乐
        * 需要播放的音乐：this.urls[this.currentSongIndex]
        * 重新给 播放器 资源文件 this.audioEle.src = this.urls[this.currentSongIndex]
        * */

        this.audioEle.src = this.urls[this.currentSongIndex];
    };

    AudioPlayer.prototype.last = function () {
        if (this.currentPlayType != 1){

            this.currentSongIndex--;

            this.currentSongIndex = this.currentSongIndex<0 ? this.urls.length-1:this.currentSongIndex;
        }else {
            this.currentSongIndex = parseInt(Math.random()*this.urls.length);
        }

        this.audioEle.src = this.urls[this.currentSongIndex];

    };

    // 监听播放完成的状态
    AudioPlayer.prototype.listenEnd = function () {
        this.audioEle.addEventListener("ended",function () {
            this.next();
        }.bind(this));
    };



    // var obj = {
    //     name:"12",
    //     age:20
    // };
    //
    // for (key in obj) {
    //     console.log(obj[key]);
    // }


    window.player.AudioPlayer = AudioPlayer;

})();