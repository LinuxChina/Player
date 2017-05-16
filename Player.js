/**
 * Created by liuyujing on 2017/5/16.
 */

window.player = window.player||{};

(function () {

    //所有音频播放的 界面 、 逻辑  统一在Player中关联
    function Player() {

        var urls = ["res/songs/一次就好.mp3","res/songs/丑八怪.mp3","res/songs/味道.mp3","res/songs/梦一场.mp3","res/songs/董小姐.mp3"];
        this.audioPlayer = new player.AudioPlayer(urls);

        this.playTypes = ["single","random","order"];

        this.curTypeIndex = this.playTypes.indexOf(localStorage.getItem("loopType")?localStorage.getItem("loopType"):"single");

        this.getUI();
        this.addListener();
    }

    Player.prototype.getUI = function () {

        this.playTypeControl = document.querySelector(".playerControlBox :first-child");
        var type = this.playTypes[this.curTypeIndex];
        this.playTypeControl.src = "res/img/"+type+".png";

        this.lastButton = document.querySelector(".playerControlBox :nth-child(2)");

        //:nth-child(3) 获取某个子元素
        this.playButton = document.querySelector(".playerControlBox :nth-child(3)");

        this.nextButton = document.querySelector(".playerControlBox :nth-child(4)");

    };

    Player.prototype.addListener = function () {
        var self = this;
        this.playButton.onclick = function () {
            this.src = self.audioPlayer.playControl()?"res/img/play.png":"res/img/pause.png";
        };

        this.nextButton.onclick = function () {
            self.audioPlayer.next();
        };

        this.lastButton.onclick = function () {
            self.audioPlayer.last();
        };

        this.playTypeControl.onclick = function () {

            self.curTypeIndex++;
            if (self.curTypeIndex > 2){
                self.curTypeIndex = 0;
            }
            var type = self.playTypes[self.curTypeIndex];
            self.audioPlayer.setPlayType(type);

            this.src = "res/img/"+type+".png";
        };
    };

    window.player.Player = Player;
})();