
function draw_one_frame(vocal, drum, bass, other) {
  rectMode(CENTER);

  // print(vocal, drum, bass, other);

  background(20);

/*
  let vol1 = map(volumes[0], 0, 100, 0, height, true);
  let vol2 = map(volumes[1], 0, 100, 0, height, true);
  let vol3 = map(volumes[2], 0, 100, 0, height, true);
  let vol4 = map(volumes[3], 0, 100, 0, height, true);
  let vol5 = map(volumes[4], 0, 100, 0, height, true);
*/
  let vol2 = map(vocal, 0, 100, 0, height, true);
  let vol3 = map(drum, 0, 100, 0, height, true);
  let vol4 = map(bass, 0, 100, 0, height, true);
  let vol5 = map(other, 0, 100, 0, height, true);

  // fill(200, 200, 0);
  // rect(1*width/10, height/2, width/6, vol1);
  fill(200, 0, 0);
  rect(2*width/10, height/2, width/6, vol2);
  fill(0, 200, 0);
  rect(4*width/10, height/2, width/6, vol3);
  fill(200, 200, 200);
  rect(6*width/10, height/2, width/6, vol4);
  fill(0, 0, 200);
  rect(8*width/10, height/2, width/6, vol5);
}
