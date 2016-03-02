'use strict';

var settings = {
  fullscreen: false,
  bgColor: 0x0000AA,
  bgColorHTML: '#0000AA',

  godMode: false,
  numLives: 4,
  blocksPerSecond: 8,
  foodPerLevel: 2,

  // blockSize: 1,
  boardColumns: 80,

  // first two rows are for the hud/score
  boardRows: 50,

  debugOn: true,

  levelData: [
    'assets/levels/2_division.png',
    'assets/levels/1_empty.png',

    'assets/levels/3_two_divisions.png',
    'assets/levels/4_s.png',
    'assets/levels/5_box.png',
    'assets/levels/6_teeth.png',
    'assets/levels/7_dotted_center_line.png',
    'assets/levels/8_zigzag.png',
    'assets/levels/9_diag_lines.png',
    'assets/levels/10_dotted_lines.png'
  ]
};

module.exports = settings;
