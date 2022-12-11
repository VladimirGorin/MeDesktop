const socketAudio = io.connect('http://127.0.0.1:5000');

//window.onload = init;
var context;    // Audio context
var buf;        // Audio buffer

const join = document.querySelector('#join');
const exit = document.querySelector('#exit');


context = new AudioContext();

socketAudio.on("message", data => {
    if (data.type == "audio") {
        var binaryData = [];
        binaryData.push(data.data.voice);
        var myblob = new Blob(binaryData, {type: 'video/webm'});
        appendToSourceBuffer(myblob);
    }
    if (data.type == "resetIcons"){
        if (data.resetIcons == "audio"){
            var resetIcon_on = document.querySelector(data.on);
            var resetIcon_off = document.querySelector(data.off);
            resetIcon_on.style.display = "inline";
            resetIcon_off.style.display = "none";
        }
        if (data.resetIcons == "video"){
            var resetIcon_video_on = document.querySelector(data.on);
            var resetIcon_video_off = document.querySelector(data.off);
            resetIcon_video_on.style.display = "inline";
            resetIcon_video_off.style.display = "none";
        }
    }

});




async function appendToSourceBuffer(blob) {
  if (
    mediaSource.readyState === "open" &&
    sourceBuffer &&
    sourceBuffer.updating === false
  ) {
    // в оригинале просто передавался просто blob, но у меня не завелось
    // решение найдено было тут: https://stackoverflow.com/a/62122595/14168867
    sourceBuffer.appendBuffer(await blob.arrayBuffer());
  }

  // стараемся не переполнить память
  if (
    video.buffered.length &&
    video.buffered.end(0) - video.buffered.start(0) > 100 &&
    sourceBuffer &&
    sourceBuffer.updating === false
  ) {
    sourceBuffer.remove(0, video.buffered.end(0) - 100);
  }
}

function createVideoEl() {
  let video = document.createElement("video2");
  video.autoplay = true;
  video.width = 300;
  video.height = 300;
  document.body.appendChild(video);

  return video;
}
let video = createVideoEl();
// создаём MediaSource и крепим его к video
let mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

// создаём SourceBuffer в который будем докидывать данные
let sourceBuffer = null;
mediaSource.addEventListener("sourceopen", function () {
  // по умолчанию Chrome использует этот,
  // но в вопросе не было показано что лежит в options, поэтому у вас он может быть другим
  // важно заметить, что если кодек указан не тот, то ничего не заработает
  sourceBuffer = mediaSource.addSourceBuffer("video/webm;codecs=vp8,opus");
});

async function appendToSourceBuffer(blob) {
  if (
    mediaSource.readyState === "open" &&
    sourceBuffer &&
    sourceBuffer.updating === false
  ) {
    // в оригинале просто передавался просто blob, но у меня не завелось
    // решение найдено было тут: https://stackoverflow.com/a/62122595/14168867
    sourceBuffer.appendBuffer(await blob.arrayBuffer());
  }

  // стараемся не переполнить память
  if (
    video.buffered.length &&
    video.buffered.end(0) - video.buffered.start(0) > 100 &&
    sourceBuffer &&
    sourceBuffer.updating === false
  ) {
    sourceBuffer.remove(0, video.buffered.end(0) - 100);
  }
}

// Начинаем получать наш стрим
function createVideoEl() {
  let video = document.createElement("video");
  video.autoplay = true;
  video.width = 300;
  video.height = 300;
  document.body.appendChild(video);

  return video;
}
