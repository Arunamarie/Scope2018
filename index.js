// Edited based on https://github.com/bryanjenningz/record-audio

const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// ORIGINAL CODE (WORKING)
/*
const handleAction = async () => {
  document.getElementById("audioDiv").innerHTML += "<audio id=\"Gordon\" src=\"Gordon_Ramsay.mp3\" preload=\"auto\"></audio>"
  const recorder = await recordAudio();
  const actionButton = document.getElementById('action');
  actionButton.disabled = true;
  recorder.start();
  await sleep(3000);
  const audio = await recorder.stop();
  audio.play();
  await sleep(3000);
  actionButton.disabled = false;
  document.getElementById("Gordon").play();
}
*/

var recorder;
const start = async () => {
  document.getElementById("audioDiv").innerHTML += "<audio id=\"Gordon\" src=\"Gordon_Ramsay.mp3\" preload=\"auto\"></audio>"
  recorder = await recordAudio();
  const actionButton = document.getElementById('startRecording');
  actionButton.disabled = true;
  recorder.start();
}

const stop = async () => {
  const audio = await recorder.stop();
  audio.play();
  //await sleep(audio.duration);
  audio.onended = function() {
    document.getElementById("Gordon").play();
    actionButton.disabled = false;
    document.getElementById("recordings").innerHTML += audio + "<br />";
  };
}
