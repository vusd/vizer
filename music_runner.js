const canvasWidth = 1280;
const canvasHeight = 720;
let mainCanvas;

let slider1, slider2, slider3, slider4;
let songButton;

let editorMode = true;          // false when in song mode
let songLoadStatus = "loading"; // "error", "loaded"
let song;
let songIsPlaying = false;
let songEpoch = 0;              // millis when song starts
let table;

SMOOTHING;

function songLoadedError() {
  songButton.elt.innerHTML = "Song: Load Error";
  print(songButton.elt.innerHTML);
  songLoadStatus = "error";
}

function songLoaded() {
  print("Song loaded");
  songLoadStatus = "loaded";
  songButton.elt.innerHTML = "run song";
  songButton.elt.disabled = false;
  // let now = millis();
  // songEpoch = now + 5000;
}

function songLoadedSoFar(soFar) {
  let loaded = int(100 * soFar);
  songButton.elt.innerHTML = "Song: " + loaded + "% loaded";
  print(songButton.elt.innerHTML);
}

function preload() {
  table = loadTable('volumes.csv', 'csv');
}

function setup() {
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');
  song = loadSound('out0_all.mp3', songLoaded, songLoadedError, songLoadedSoFar);  
  frameRate(60);

  //table to integers
  let smoothing = SMOOTHING !== undefined ? SMOOTHING : 0.1
  const updateFactor = max(0.001, min(1, 1-smoothing))
  let smoothedRow = []

  table.rows.forEach((row, rowI) => {
    row.arr = row.arr.map(elm => Number(elm))

    if(smoothedRow.length === 0)
      smoothedRow = row.arr
    else {
      smoothedRow = smoothedRow.map((smoothed, i) => smoothed + (row.arr[i]-smoothed)*updateFactor)
      row.arr = smoothedRow
    }
  })

  // create sliders
  slider1 = createSlider(0, 100, 50);
  slider2 = createSlider(0, 100, 50);
  slider3 = createSlider(0, 100, 50);
  slider4 = createSlider(0, 100, 50);

  slider1.parent('slider1Container');
  slider2.parent('slider2Container');
  slider3.parent('slider3Container');
  slider4.parent('slider4Container');

  songButton = createButton('(music loading)');
  songButton.mousePressed(switchRunMode);
  songButton.parent('button1Container');
  songButton.elt.disabled = true;
}

function switchRunMode() {
  if(editorMode) {
    if(songLoadStatus == "loading") {
      alert("Song still loading...");
      return;
    }
    else if (songLoadStatus == "error") {
      alert("Cannot switch mode, there was a problem loading the audio")
      return;
    }
    slider1.elt.disabled = true;
    slider2.elt.disabled = true;
    slider3.elt.disabled = true;
    slider4.elt.disabled = true;

    editorMode = false;
    let now = millis();
    songEpoch = now + 5000;
    songButton.elt.innerHTML = "stop music";
  }
  else {
    if(songIsPlaying) {
      song.stop();
      songIsPlaying = false;
    }
    slider1.elt.disabled = false;
    slider2.elt.disabled = false;
    slider3.elt.disabled = false;
    slider4.elt.disabled = false;

    editorMode = true;
    songButton.elt.innerHTML = "start music";
  }
}

function draw() {
  if (editorMode) {
    let s1 = slider1.value();
    let s2 = slider2.value();
    let s3 = slider3.value();
    let s4 = slider4.value();

    draw_one_frame(s1, s2, s3, s4);
  }
  else {
    if(songEpoch > 0) {
      background(30);
      let now = millis();
      let songOffset = now - songEpoch;
      if(songOffset < 0) {
        let secondsRemaining = songOffset / -1000.0;
        let intSecs = int(secondsRemaining);
        if(intSecs > 0) {
          let remainder = secondsRemaining - intSecs;
          let curAngle = map(remainder, 0, 1, 630, 270);
          angleMode(DEGREES);
          // print(secondsRemaining, intSecs, remainder, curAngle);
          noStroke();
          fill(200);
          arc(width/2, height/2, 400, 400, curAngle, curAngle+10);
          stroke(255);
          fill(255);
          textSize(200);
          textAlign(CENTER, CENTER);
          text(intSecs, width/2, height/2);
        }
        // text("Song starting in: " + secondsRemaining, width/2, height/2)      
      }
      else if (!songIsPlaying) {
        song.play();
        songIsPlaying = true;
        songEpoch = millis();
      }
    }
    if(songIsPlaying) {
      let curMillis = millis();
      let timeOffset = curMillis - songEpoch;
      let curSlice = int(60 * timeOffset / 1000.0);
      if (curSlice < table.getRowCount()) {
        // print("Processing " + curSlice + " of " + table.getRowCount())
        let row = table["rows"][curSlice].arr
        // draw_one_frame(row);
        // print(row);
        slider1.value(row[1]);
        slider2.value(row[2]);
        slider3.value(row[3]);
        slider4.value(row[4]);
        draw_one_frame(row[1], row[2], row[3], row[4], curSlice);
      }
    }
  }
}

function keyTyped() {
  if (key == '1') {
    song.setVolume(0.1);
  }
  if (key == '2') {
    song.setVolume(0.2);
  }
  if (key == '3') {
    song.setVolume(0.3);
  }
  if (key == '4') {
    song.setVolume(0.4);
  }
  if (key == '5') {
    song.setVolume(0.5);
  }
  if (key == '6') {
    song.setVolume(0.6);
  }
  if (key == '7') {
    song.setVolume(0.7);
  }
  if (key == '8') {
    song.setVolume(0.8);
  }
  if (key == '9') {
    song.setVolume(0.9);
  }
  if (key == '0') {
    song.setVolume(1.0);
  }
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
