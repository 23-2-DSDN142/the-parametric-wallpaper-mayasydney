// Changeable parameter variables
let rect_width = 17;
let rect_height = 17;
let grid_size = 200;
// Parameters changed for assessment
let line_width = 5;
let line_colour = "#DDB08B";
let colour = "#00000000";
let size = 30;
let gap = 8;
let heartsInRow = 1;
let heartsInColumn = 1;

function setup() {
  createCanvas(200, 200);
  setup_wallpaper(this);
}

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false);

  // Grid settings
  pWallpaper.grid_settings.cell_width = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset = 50;
}

function wallpaper_background() {
  // Define gradient colors
  let gradientColor1 = color(240, 255, 240); // light honeydew green color
  let gradientColor2 = color(255, 200, 200); // light red color

  // Gradient is set from top to bottom
  setGradient(0, 0, width, height, gradientColor1, gradientColor2);
}

// Function to draw the gradient
function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y + size * 1.5);
  bezierVertex(x - size * 1.5, y - size * 2.5, x - size * 3, y - size, x, y + size * 3);
  bezierVertex(x + size * 3, y - size, x + size * 1.5, y - size * 2.5, x, y + size * 1.5);
  endShape(CLOSE);
}

// Function to draw the main symbol on the wallpaper
function my_symbol() {
  // Set parameters
  fill(colour);
  strokeWeight(line_width);
  stroke(line_colour);
  // Draws shape from the center of each cell
  ellipseMode(CENTER);

  // Check if heartsInRow and heartsInColumn are not zero
  if (heartsInRow > 0 && heartsInColumn > 0) {
    // Draw a customizable grid of hearts in the center of each cell
    for (let rows = 0; rows < heartsInColumn; rows++) {
      for (let cols = 0; cols < heartsInRow; cols++) {
        let x = (cols + 0.5) * rect_width * gap; 
        let y = (rows + 0.5) * rect_height * gap; 
        // Call the function to draw a heart shape at the specified position
        drawHeart(x, y, size);
      }
    }
  } else {
    console.error("Invalid value for heartsInRow or heartsInColumn. Please use values greater than 0.");
  }
}