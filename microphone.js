//82 is the number for r. So they can press r to record. Key codes can be found at
//https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
for (var i = 82; i < 83; i++) {
    document.getElementById("audioDiv").innerHTML += "<audio id=\"" + String.fromCharCode(i) + "\" src=\"sounds/" + String.fromCharCode(i) + ".mp3\" preload=\"auto\"></audio>"
}

//function e is the recording upon pressing r
document.onkeydown = function(e) {
    if (e.keyCode > 47 && e.keyCode < 91) {
        var keyPress = String.fromCharCode(e.keyCode);
        document.getElementById(keyPress).play();
    }
    else {
        console.log("Key is not found!");
    }
};
