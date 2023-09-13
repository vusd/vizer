let lastWords = "...";
let wordBrightness = 255;
let yOffset = 0;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other) {
  background(0);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(40);

  if(words == "") {
    wordBrightness = int(wordBrightness * 0.95);
    words = lastWords;
    if (yOffset < height/4) {
      yOffset = yOffset + 1;
    }
  }
  else {
    wordBrightness = 255;
    yOffset = 0;
    lastWords = words;
  }

  fill(wordBrightness);
  text(words, width/2, height/5 + yOffset);

  textSize(24);

  let bar_spacing1 = width/5;
  let bar_spacing = height/10;
  let bar_width = width/6;
  let bar_height = width/12;
  let bar_pos_y = height/2;
  let bar_pos_x = width/2;

  // vocal bar is red
  fill(200, 0, 0);
  rect(bar_pos_x, height/2 + 1 * bar_spacing, 4 * vocal, bar_height);
  fill(0);
  text("vocals", bar_pos_x, height/2 + 1 * bar_spacing + 8);

  // drum bar is green
  fill(0, 200, 0);
  rect(bar_pos_x, height/2 + 2 * bar_spacing, 4 * drum, bar_height);
  fill(0);
  text("drums", bar_pos_x, height/2 + 2 * bar_spacing + 8);

  // bass bar is blue
  fill(50, 50, 240);
  rect(bar_pos_x, height/2 + 3 * bar_spacing, 4 * bass, bar_height);
  fill(0);
  text("bass", bar_pos_x, height/2 + 3 * bar_spacing + 8);

  // // other bar is white
  fill(200, 200, 200);
  rect(bar_pos_x, height/2 + 4 * bar_spacing, 4 * other, bar_height);
  fill(0);
  text("other", bar_pos_x, height/2 + 4 * bar_spacing + 8);
}
