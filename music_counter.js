
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  let volume_vocal = map(vocal, 0, 100, 0, 0.7 * height, true);
  let volume_drum  = map(drum, 0, 100, 0, 0.7 * height, true);
  let volume_bass  = map(bass, 0, 100, 0, 0.7 * height, true);
  let volume_other = map(other, 0, 100, 0, 0.7 * height, true);


  background(20);
  rectMode(CENTER);

  fill(200, 0, 0);
  rect(2*width/10, height/2, width/6, volume_vocal);
  fill(0, 200, 0);
  rect(4*width/10, height/2, width/6, volume_drum);
  fill(200, 200, 200);
  rect(6*width/10, height/2, width/6, volume_bass);
  fill(0, 0, 200);
  rect(8*width/10, height/2, width/6, volume_other);

  fill(255, 255, 0);

  textAlign(LEFT);
  // demonstrate use of non-documented "counter" variable
  let seconds = counter/60
  if(seconds > 0) {
    textSize(60);
    text(nf(seconds, 3, 2), 20, height-20);
  }

  textAlign(CENTER);
  textSize(vocal);
  text(words, width/2, height/8);
}
