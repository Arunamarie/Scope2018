// Edited based on https://www.npmjs.com/package/mic-recorder-to-mp3
// and https://github.com/bryanjenningz/record-audio

const MicRecorder = require('mic-recorder-to-mp3');

// New instance
const recorder = new MicRecorder({
  bitRate: 128
});



function start() {
  document.getElementById("recordingText").hidden = false;

  for (var i = 1; i <= 10; i++) {
    document.getElementById("audioDiv").innerHTML += "<audio id=\"gordon" +
     i + "\" src=\"audio/gordon" + i + ".mp3\" preload=\"auto\"></audio>"
  }
  // Start recording. Browser will request permission to use your microphone.
  recorder.start().then(() => {
    // something else
  }).catch((e) => {
    console.error(e);
  });
}

function stop() {
  document.getElementById("recordingText").hidden = true;
  // Once you are done singing your best song, stop and get the mp3.
  recorder.stop().getMp3().then(([buffer, blob]) => {
    // do what ever you want with buffer and blob
    // Example: Create a mp3 file and play
    const file = new File(buffer, 'me-at-thevoice.mp3', {
      type: blob.type,
      lastModified: Date.now()
    });

    const li = document.createElement('li');
    const player = new Audio(URL.createObjectURL(file));
    player.play();
    player.controls = true;
    li.appendChild(player);
    document.querySelector('#playlist').appendChild(li);

    player.onended = function() {
      document.getElementById("gordon" + Math.floor((Math.random() * 10) + 1)).play();
    }

  }).catch((e) => {
    alert('We could not retrieve your message');
    console.log(e);
  });

}
