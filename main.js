window.onload = function () {
  var audio = new Audio("https://cdn.discordapp.com/attachments/1051721604788404317/1144497629183623178/RETRO_-_I_KNOW_L2C_4.29.23_PRE_MIX.mp3");
  var playButton = document.querySelector("#play");
  var pauseButton = document.querySelector("#pause");

  playButton.addEventListener("click", playAudio, false);

  function playAudio() {
    this.style.display = "none";
    pauseButton.style.display = "block";
    audio.play();
  }

  pauseButton.addEventListener("click", pauseAudio, false);

  function pauseAudio() {
    this.style.display = "none";
    playButton.style.display = "block";
    audio.pause();
  }

  audio.addEventListener("timeupdate", controlTime, false);

  function controlTime() {
    var seeking = this.currentTime;
    var minutes = Math.floor(this.currentTime / 60);
    var seconds = Math.floor(this.currentTime - minutes * 60);
    var calcs = this.duration;
    var total = (this.currentTime / calcs) * 100;
    var progressBarUpdate = document.querySelector(".progress-bar");
    progressBarUpdate.style.width = total + "%";
    progressBarUpdate.style.background = "#FDC0FF";

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    var streamTime = document.querySelector(".current-time");
    streamTime.innerText = minutes + ":" + seconds;
  }

  audio.addEventListener("loadeddata", defaultValues, false);

  function defaultValues() {
    var minutes = Math.floor(this.duration / 60);
    var seconds = Math.floor(this.duration - minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var trackTime = document.querySelector(".track-time");
    trackTime.innerText = minutes + ":" + seconds;
  }

  audio.onended = function () {
    //Reset Play Button
    pauseButton.style.display = "none";
    playButton.style.display = "block";
    //Reset Progress Bar
    var progressBarUpdate = document.querySelector(".progress-bar");
    progressBarUpdate.style.width = "0%";
    //Reset Time
    var streamTime = document.querySelector(".current-time");
    streamTime.innerText = "0" + ":" + "00";
  };

  volumeControls(0.4, 2);

  function volumeControls(volumer, index) {
    var childrens = document.querySelectorAll(".volume div");
    var filled = document.querySelectorAll(".fill");
    if (filled.length > index - 1) {
      for (var j = index; j < childrens.length; j++) {
        if (childrens[j].className == "fill") {
          childrens[j].className = "zero-fill";
        }
      }
    }

    //Volume controls
    audio.volume = volumer;

    var defaultVolume = audio.volume;
    var solidVolume = (defaultVolume * 100) / 10;
    var upDown = document.querySelectorAll(".volume div");

    if (solidVolume % 2 == 0) {
      for (var i = 0; i < solidVolume / 2; i++) {
        upDown[i].className = "fill";
      }
    } else if (solidVolume == 5) {
      for (var i = 0; i < solidVolume; i++) {
        upDown[i].className = "fill";
      }
    } else if (solidVolume == 0) {
      for (var i = 0; i < 5; i++) {
        upDown[i].className = "zero-fill";
      }
    }

    for (var j = 0; j < upDown.length; j++) {
      upDown[j].addEventListener("click", riseUpDown, false);
    }
  }

  function riseUpDown() {
    var currentElement = this;
    var childrens = this.parentElement.children;
    for (var i = 0; i <= childrens.length; i++) {
      if (this == childrens[i]) {
        var index = i + 1;
        var volumer = (index * 2) / 10;
      }
    }
    volumeControls(volumer, index);
  }
};
