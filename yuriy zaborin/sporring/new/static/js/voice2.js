const socketAudio = io.connect('http://127.0.0.1:5000');

//window.onload = init;
var context;    // Audio context
var buf;        // Audio buffer
var iconStart = document.querySelector('#start2');
var iconMute = document.querySelector('#mute2');

var fightId = document.querySelector('#fightId').textContent;

var myName = document.querySelector('#me').textContent;

var audio1 = document.querySelector('#audio1');
var audio2 = document.querySelector('#audio2');

var video1 = document.querySelector('#video1');
var video2 = document.querySelector('#video2');

iconMute.style.cursor = 'pointer';
iconStart.style.cursor = 'pointer';

var iconVideoStart = document.querySelector('#startvideo2');
var iconVideoMute = document.querySelector('#mutevideo2');

iconVideoStart.style.cursor = 'pointer';
iconVideoMute.style.cursor = 'pointer';

context = new AudioContext();


socketAudio.on("message", data => {
    if (data.type == "audio") {
        if (data.data.fightId == fightId && data.data.author != myName){
            console.log('!')
            var myblob = new Blob([data.data.voice], {type: "audio/webm; codecs=pcm"});
            var url = window.URL.createObjectURL(myblob);
            audio1.src = url;
            audio1.play();
        }
    }
    if (data.type == "video1"){
      if (data.data.fightId == fightId){
          var binaryData = [];
          binaryData.push(data.data.video);
          const url = window.URL.createObjectURL(new Blob(binaryData, {type: "video/webm"}));
          video1.src = url;
          video1.play();
      }
    }
    if (data.type == 'video2'){
          var binaryData = [];
          binaryData.push(data.data.video);
          const url = window.URL.createObjectURL(new Blob(binaryData, {type: "video/webm"}));
          video2.src = url;
          video2.play();
    }
    if (data.type == "resetIcons"){
        if (data.resetIcons == "audio"){
          if (data.fightId == fightId){
              var resetIcon_on = document.querySelector(data.on);
              var resetIcon_off = document.querySelector(data.off);
              resetIcon_on.style.display = "inline";
              resetIcon_off.style.display = "none";
          }
        }
        if (data.resetIcons == "video"){
          if (data.fightId == fightId){
              var resetIcon_video_on = document.querySelector(data.on);
              var resetIcon_video_off = document.querySelector(data.off);
              resetIcon_video_on.style.display = "inline";
              resetIcon_video_off.style.display = "none";
          }
        }
    }
});

navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
        const mediaRecorderA = new MediaRecorder(stream);
        let voice = [];
        document.querySelector('#start2').addEventListener('click', function(){
            socketAudio.send({'type': 'resetIcons', 'resetIcons': 'audio', 'on': '#mute2', 'off': '#start2', 'fightId': fightId})
            console.log("Запись началась!");
            mediaRecorderA.start();
        });

        mediaRecorderA.addEventListener("dataavailable",function(event) {
            voice.push(event.data);
        });

        mediaRecorderA.addEventListener("stop", function() {
            const voiceBlob = new Blob(voice, {type: 'audio/webm; codecs=pcm'});
            
            const audioURL = window.URL.createObjectURL(voiceBlob);

            socketAudio.send({"voice": voiceBlob, "action": "mp3", "voiceUrl": audioURL, 'fightId': fightId, "author": myName});
            voice = [];
        });
        document.querySelector('#mute2').addEventListener('click', function(){
            socketAudio.send({'type': 'resetIcons', 'resetIcons': 'audio', 'on': '#start2', 'off': '#mute2', 'fightId': fightId})
            console.log("Запись приостановлена!");
            mediaRecorderA.stop();
        });

});
navigator.mediaDevices.getUserMedia({ video: true})
    .then(stream => {
        const mediaRecorderV = new MediaRecorder(stream);
        let video = [];
        document.querySelector('#startvideo2').addEventListener('click', function(){
            socketAudio.send({'type': 'resetIcons', 'resetIcons': 'video', 'on': '#mutevideo2', 'off': '#startvideo2', 'fightId': fightId})
            console.log("Запись началась!");
            mediaRecorderV.start();
        });

        mediaRecorderV.addEventListener("dataavailable",function(event) {
          video.push(event.data);
        });

        mediaRecorderV.addEventListener("stop", function() {
            const videoBlob = new Blob(video, {type: 'video/webm'});
            
            const videoURL = window.URL.createObjectURL(videoBlob);

            socketAudio.send({"video": videoBlob, "action": "mp4", "voiceUrl": videoURL, 'fightId': fightId});
            video = [];
        });
        document.querySelector('#mutevideo2').addEventListener('click', function(){
          socketAudio.send({'type': 'resetIcons', 'resetIcons': 'video', 'on': '#startvideo2', 'off': '#mutevideo2', 'fightId': fightId})
          console.log("Запись приостановлена!");
          mediaRecorderV.stop();
        });

});
