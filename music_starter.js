// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(vocal, drum, bass, other) {
  background(20);
  rectMode(CENTER);

  let bar_spacing1 = width/5;
  let bar_spacing = height/10;
  let bar_width = width/6;
  let bar_height = width/12;
  let bar_pos_y = height/2;
  let bar_pos_x = width/2;

  stroke(0);

  // vocal bar is red
  fill(200, 0, 0);
  rect(bar_pos_x, height/2 + 1 * bar_spacing, 4 * vocal, bar_height);

  // drum bar is green
  fill(0, 200, 0);
  rect(bar_pos_x, height/2 + 2 * bar_spacing, 4 * drum, bar_height);
  // rect(2 * bar_spacing, bar_pos_y, bar_width, 4 * drum);

  // // bass bar is blue
  // fill(0, 0, 200);
  // rect(3 * bar_spacing, bar_pos_y, bar_width, 4 * bass);

  // // other bar is white
  // fill(200, 200, 200);
  // rect(4 * bar_spacing, bar_pos_y, bar_width, 4 * other);
}
