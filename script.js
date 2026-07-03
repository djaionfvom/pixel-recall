function makePuzzle(name, rows, time) {
  const size = rows.length;
  const cells = [];

  rows.forEach((row, rowIndex) => {
    if (row.length !== size) {
      throw new Error(`${name} must use a square pattern.`);
    }

    [...row].forEach((value, columnIndex) => {
      if (value === "#") cells.push(rowIndex * size + columnIndex);
    });
  });

  return { name, size, time, cells };
}

const puzzles = [
  { name: "The Line", size: 5, time: 3000, cells: [11, 12, 13] },
  { name: "The Cross", size: 5, time: 3000, cells: [7, 11, 12, 13, 17] },
  { name: "The Box", size: 5, time: 2800, cells: [6, 7, 8, 11, 13, 16, 17, 18] },
  { name: "The Arrow", size: 5, time: 2600, cells: [2, 6, 7, 8, 12, 17, 22] },
  { name: "The House", size: 6, time: 2800, cells: [3, 8, 10, 13, 16, 19, 20, 21, 22, 23, 25, 28, 31, 34] },
  { name: "The Smile", size: 6, time: 2600, cells: [8, 9, 14, 15, 25, 28, 31, 32, 33, 34] },
  { name: "The Rocket", size: 7, time: 2600, cells: [3, 9, 10, 11, 16, 17, 18, 23, 24, 25, 30, 31, 32, 37, 39, 43, 47] },
  { name: "The Owl", size: 8, time: 2400, cells: [10, 13, 17, 18, 19, 20, 21, 22, 25, 27, 28, 30, 33, 34, 35, 36, 37, 38, 42, 45, 50, 51, 52, 53] },
  makePuzzle("The Heart", [
    ".##..##.",
    "########",
    "########",
    ".######.",
    "..####..",
    "...##...",
    "........",
    "........"
  ], 2400),
  makePuzzle("The Tree", [
    "...##...",
    "..####..",
    ".######.",
    "...##...",
    "..####..",
    "...##...",
    "..####..",
    "........"
  ], 2350),
  makePuzzle("The Crown", [
    "#..##..#",
    "#..##..#",
    ".#....#.",
    ".######.",
    "..####..",
    ".######.",
    "........",
    "........"
  ], 2300),
  makePuzzle("The Umbrella", [
    "...##...",
    "..####..",
    ".######.",
    "########",
    "...##...",
    "...##...",
    "...##...",
    "..####.."
  ], 2250),
  makePuzzle("The Fish", [
    "........",
    "..####..",
    "######.#",
    "#######.",
    "######.#",
    "..####..",
    "........",
    "........"
  ], 2200),
  makePuzzle("The Flower", [
    "...##...",
    ".######.",
    "########",
    ".######.",
    "...##...",
    "..####..",
    ".##..##.",
    "........"
  ], 2150),
  makePuzzle("The Key", [
    "........",
    ".####...",
    "##..##..",
    ".####...",
    "...##...",
    "...##...",
    "...####.",
    "........"
  ], 2100),
  makePuzzle("The Spiral", [
    "########",
    "#......#",
    "#.####.#",
    "#.#..#.#",
    "#.#.##.#",
    "#.#....#",
    "#.######",
    "########"
  ], 2050),
  makePuzzle("The Camera", [
    ".........",
    "..#####..",
    ".#######.",
    "##.....##",
    "##.###.##",
    "##.###.##",
    "##.....##",
    ".#######.",
    "........."
  ], 2100),
  makePuzzle("The Dice", [
    ".........",
    ".#######.",
    "##.....##",
    "##.#...##",
    "##..#..##",
    "##...#.##",
    "##.....##",
    ".#######.",
    "........."
  ], 2050),
  makePuzzle("The Cat", [
    ".#.....#.",
    "##.....##",
    "#########",
    "##.#.#.##",
    "##.....##",
    ".#######.",
    "..#####..",
    "...###...",
    "........."
  ], 2000),
  makePuzzle("The Balloon", [
    "..#####..",
    ".#######.",
    "##.....##",
    "##.....##",
    "##.....##",
    ".#######.",
    "..#####..",
    "....#....",
    "...###..."
  ], 1950),
  makePuzzle("The Castle", [
    "#..###..#",
    "#########",
    "##.###.##",
    "##.....##",
    "##.###.##",
    "##.###.##",
    "##.....##",
    "#########",
    "........."
  ], 1900),
  makePuzzle("The Anchor", [
    "....#....",
    "...###...",
    "....#....",
    "....#....",
    "#...#...#",
    "#...#...#",
    ".#######.",
    "..#####..",
    "....#...."
  ], 1850),
  makePuzzle("The Crab", [
    ".##...##.",
    "#########",
    "##.###.##",
    "#########",
    "..#####..",
    ".#.....#.",
    "#.......#",
    ".........",
    "........."
  ], 1800),
  makePuzzle("The Snowflake", [
    "....#....",
    "#...#...#",
    ".#..#..#.",
    "..#####..",
    "#########",
    "..#####..",
    ".#..#..#.",
    "#...#...#",
    "....#...."
  ], 1750),
  makePuzzle("The Invader", [
    "..#....#..",
    "...#..#...",
    "..######..",
    ".##.##.##.",
    "##########",
    "#.######.#",
    "#........#",
    ".##....##.",
    "##......##",
    ".........."
  ], 1800),
  makePuzzle("The Skull", [
    "..######..",
    ".########.",
    "##.####.##",
    "##.####.##",
    "##########",
    ".########.",
    "..##..##..",
    "..#.##.#..",
    "...####...",
    ".........."
  ], 1760),
  makePuzzle("The Lighthouse", [
    "....##....",
    "...####...",
    "..######..",
    "...####...",
    "...####...",
    "...####...",
    "..######..",
    ".########.",
    "##########",
    "...####..."
  ], 1720),
  makePuzzle("The Jellyfish", [
    "..######..",
    ".########.",
    "##########",
    "##.####.##",
    "##########",
    "..#.#.#...",
    ".#.#.#.#..",
    "#..#.#..#.",
    "...#.#....",
    ".........."
  ], 1680),
  makePuzzle("The Butterfly", [
    ".##....##.",
    "####..####",
    ".########.",
    "..######..",
    "....##....",
    "..######..",
    ".########.",
    "####..####",
    ".##....##.",
    ".........."
  ], 1640),
  makePuzzle("The Ghost", [
    "...####...",
    "..######..",
    ".########.",
    "###.##.###",
    "##########",
    "##########",
    "##.##.##.#",
    "##......##",
    "#.#.##.#.#",
    ".........."
  ], 1600),
  makePuzzle("The Sailboat", [
    ".....#....",
    "....##....",
    "...###....",
    "..####....",
    ".....#....",
    ".....#....",
    "##########",
    ".########.",
    "..######..",
    ".........."
  ], 1560),
  makePuzzle("The Planet", [
    "....##....",
    "..######..",
    ".########.",
    "##########",
    "##########",
    ".########.",
    "..######..",
    "....##....",
    ".##....##.",
    "##......##"
  ], 1520),
  makePuzzle("The Dragon", [
    ".......#..",
    "...##.###.",
    "#######...",
    "..#####...",
    "...####...",
    "..###.##..",
    ".###...##.",
    "##......##",
    "#........#",
    ".........."
  ], 1490),
  makePuzzle("The Phoenix", [
    "....##....",
    "...####...",
    "#.######.#",
    ".########.",
    "..######..",
    "...####...",
    "..##..##..",
    ".##....##.",
    "##......##",
    ".........."
  ], 1460),
  makePuzzle("The Spider", [
    "#........#",
    ".#..##..#.",
    "..######..",
    "##########",
    "..######..",
    ".#..##..#.",
    "#...##...#",
    "...####...",
    "..#....#..",
    ".........."
  ], 1430),
  makePuzzle("The Maze", [
    "##########",
    "#........#",
    "#.######.#",
    "#.#....#.#",
    "#.#.##.#.#",
    "#.#.##.#.#",
    "#.#....#.#",
    "#.######.#",
    "#........#",
    "##########"
  ], 1400),
  makePuzzle("The Octopus", [
    "...####...",
    "..######..",
    ".########.",
    "##.####.##",
    "##########",
    "..######..",
    ".##.##.##.",
    "##..##..##",
    "#...##...#",
    ".........."
  ], 1370),
  makePuzzle("The Knight", [
    "....###...",
    "...#####..",
    "..#######.",
    "..###.##..",
    "...#####..",
    "....####..",
    "...#####..",
    "..#######.",
    ".########.",
    ".........."
  ], 1340),
  makePuzzle("The Temple", [
    "..#....#..",
    ".###..###.",
    "##########",
    ".########.",
    "..######..",
    "...####...",
    "..######..",
    ".########.",
    "##########",
    ".........."
  ], 1320),
  makePuzzle("The Final Sigil", [
    "#..####..#",
    ".##.##.##.",
    "..######..",
    "###.##.###",
    ".########.",
    "..######..",
    "###.##.###",
    "..######..",
    ".##.##.##.",
    "#..####..#"
  ], 1300),
  makePuzzle("The Beacon", [
    "...........",
    ".....#.....",
    ".#########.",
    "...#.#.#...",
    ".....#.....",
    ".#########.",
    ".....#.....",
    ".....#.....",
    ".#########.",
    ".....#.....",
    "..........."
  ], 1280),
  makePuzzle("The Orbit", [
    "...........",
    "...........",
    "....###....",
    "...#.#.#...",
    "..#.###.#..",
    "..#######..",
    "..#..#..#..",
    "...#.#.#...",
    "....###....",
    "...........",
    "..........."
  ], 1274),
  makePuzzle("The Shield", [
    "...........",
    "..#######..",
    "..##.#.##..",
    "..#######..",
    "..#..#..#..",
    "..#..#..#..",
    "...#.#.#...",
    "...#.#.#...",
    "....###....",
    ".....#.....",
    "..........."
  ], 1267),
  makePuzzle("The Wings", [
    "...........",
    "...........",
    ".....#.....",
    "....###....",
    "..#######..",
    ".#########.",
    "###########",
    "###..#..###",
    "#..#####..#",
    "...........",
    "..........."
  ], 1261),
  makePuzzle("The Compass", [
    "...........",
    ".....#.....",
    "....###....",
    "...#.#.#...",
    "..#..#..#..",
    ".#########.",
    "..#..#..#..",
    "...#.#.#...",
    "....###....",
    ".....#.....",
    "..........."
  ], 1254),
  makePuzzle("The Hourglass", [
    "...........",
    ".#########.",
    "..#.....#..",
    "..#######..",
    "....#.#....",
    ".....#.....",
    "....#.#....",
    "..#######..",
    "..#.....#..",
    ".#########.",
    "..........."
  ], 1248),
  makePuzzle("The Mask", [
    "...........",
    "..#######..",
    ".#.......#.",
    ".#.##.##.#.",
    ".#.......#.",
    ".#.......#.",
    ".#.......#.",
    ".#.......#.",
    ".#.#####.#.",
    "..#######..",
    "..........."
  ], 1241),
  makePuzzle("The Gate", [
    "...........",
    "...........",
    ".#########.",
    ".#.#...#.#.",
    ".#########.",
    ".#.#.#.#.#.",
    ".#.#.#.#.#.",
    ".#.#.#.#.#.",
    ".#.#.#.#.#.",
    ".#########.",
    "..........."
  ], 1235),
  makePuzzle("The Comet", [
    "...........",
    "...........",
    ".......###.",
    ".#.....###.",
    "....#..###.",
    "...##......",
    "..##.#.....",
    "..#.#......",
    ".###.......",
    ".#.#.......",
    "..#........"
  ], 1228),
  makePuzzle("The Crest", [
    "...........",
    ".....#.....",
    ".#..###..#.",
    "...#####...",
    "..#..#..#..",
    ".#...#...#.",
    ".#...#...#.",
    "..#..#..#..",
    "..#######..",
    "...........",
    "..........."
  ], 1222),
  makePuzzle("The Lantern", [
    "...........",
    ".#########.",
    "...........",
    ".#.#####.#.",
    ".#.......#.",
    ".#.#.#.#.#.",
    ".#.....#.#.",
    ".#.###.#.#.",
    ".........#.",
    ".#######.#.",
    "..........."
  ], 1216),
  makePuzzle("The Crowned Eye", [
    "...........",
    ".#...#...#.",
    "..##.#.##..",
    "...#.#.#...",
    "....###....",
    ".#########.",
    "....###....",
    "...#.#.#...",
    "..#..#..#..",
    ".#...#...#.",
    "..........."
  ], 1209),
  makePuzzle("The Harp", [
    "...........",
    ".#...#...#.",
    ".#########.",
    "...#.#.#...",
    ".....#.....",
    ".#########.",
    ".....#.....",
    ".....#.....",
    "..#######..",
    ".....#.....",
    "..........."
  ], 1203),
  makePuzzle("The Falcon", [
    "...........",
    "...........",
    "....###....",
    "...#.#.#...",
    "..#..#..#..",
    "..#######..",
    "..#..#..#..",
    "...#.#.#...",
    ".#..###..#.",
    "...........",
    "..........."
  ], 1196),
  makePuzzle("The Lotus", [
    "...........",
    "..#######..",
    "..#..#..#..",
    "..#######..",
    ".##..#..##.",
    "..#..#..#..",
    "...#.#.#...",
    "...#.#.#...",
    "....###....",
    ".....#.....",
    "..........."
  ], 1190),
  makePuzzle("The Rune", [
    "...........",
    "..#.....#..",
    ".....#.....",
    "....###....",
    "..#######..",
    ".#########.",
    "###########",
    "###..#..###",
    "#..#####..#",
    "...........",
    "..........."
  ], 1183),
  makePuzzle("The Satellite", [
    "...........",
    ".....#.....",
    "....###....",
    "...#.#.#...",
    "..#..#..#..",
    ".#########.",
    "..#..#..#..",
    "...#.#.#...",
    "....###....",
    ".....#.....",
    "..........."
  ], 1177),
  makePuzzle("The Tower", [
    "...........",
    ".#########.",
    "..#.....#..",
    "..#######..",
    "....###....",
    ".....#.....",
    "....###....",
    "..#######..",
    "..#.....#..",
    ".#########.",
    "..........."
  ], 1171),
  makePuzzle("The Serpent", [
    "...........",
    "..#######..",
    ".#..###..#.",
    ".#.##.##.#.",
    ".#.......#.",
    ".#.......#.",
    ".#.......#.",
    ".#..#.#..#.",
    ".#.#####.#.",
    "..#######..",
    "..........."
  ], 1164),
  makePuzzle("The Prism", [
    "...#...#...",
    "..#.....#..",
    ".#########.",
    ".#.......#.",
    ".#########.",
    ".#.#.#.#.#.",
    ".#.#.#.#.#.",
    ".#.#.#.#.#.",
    ".#.#.#.#.#.",
    ".#########.",
    "..........."
  ], 1158),
  makePuzzle("The Eclipse", [
    "............",
    "........###.",
    ".......#####",
    "...#...#####",
    "....########",
    "...##...###.",
    "...#.#......",
    "..###.......",
    "..#.#.......",
    ".###........",
    ".#.#........",
    "..#........."
  ], 1151),
  makePuzzle("The Scorpion", [
    "............",
    ".#...#....#.",
    "....###.....",
    "...######...",
    "..#.###..#..",
    ".#...#....#.",
    ".##..#...##.",
    "..#..#...#..",
    "..#..#...#..",
    "..########..",
    "............",
    "............"
  ], 1145),
  makePuzzle("The Portal", [
    "............",
    ".##########.",
    "............",
    ".#.######.#.",
    ".#........#.",
    ".#.####.#.#.",
    ".#.##..##.#.",
    ".#......#.#.",
    ".#.####.#.#.",
    "..........#.",
    ".########.#.",
    "............"
  ], 1138),
  makePuzzle("The Trident", [
    "............",
    ".#...#....#.",
    "..########..",
    "...#.#..#...",
    ".#..##.#..#.",
    ".##########.",
    "....###.....",
    "....##.#....",
    "...#.#..#...",
    "..########..",
    ".#...#....#.",
    "............"
  ], 1132),
  makePuzzle("The Moth", [
    "............",
    ".....#......",
    ".#########..",
    "...#.#.#....",
    ".....#......",
    ".##########.",
    ".....#......",
    ".#..###...#.",
    ".....#......",
    "..#######...",
    ".....#......",
    "............"
  ], 1125),
  makePuzzle("The Furnace", [
    "............",
    ".....#......",
    "...######...",
    "..##.#..##..",
    "..#.####.#..",
    ".#########..",
    "..#.##.#.#..",
    "..#.####.#..",
    "..##.#..##..",
    "...######...",
    "............",
    "............"
  ], 1119),
  makePuzzle("The Helm", [
    "............",
    "..########..",
    "..#..#...#..",
    "..########..",
    "..####.###..",
    "..#..##..#..",
    ".##..#...##.",
    "...#.#..#...",
    "...#####....",
    "....###.....",
    ".....#......",
    "............"
  ], 1113),
  makePuzzle("The Star Map", [
    "............",
    "............",
    ".....#......",
    "....###.....",
    "..#######...",
    ".#########..",
    "###########.",
    "###..#..####",
    "#....#....##",
    "...#####....",
    "............",
    "............"
  ], 1106),
  makePuzzle("The Labyrinth", [
    "............",
    ".....#......",
    "....###.....",
    "...#.#.##...",
    "..#..#...#..",
    ".##########.",
    "..#..#...#..",
    "...######...",
    "...#.#.#....",
    "....###.....",
    ".....#......",
    "............"
  ], 1100),
  makePuzzle("The Totem", [
    "............",
    ".##########.",
    "..#......#..",
    ".##########.",
    "....###.....",
    ".....#......",
    "....###.....",
    "...#####....",
    "..########..",
    "..#......#..",
    ".##########.",
    "............"
  ], 1093),
  makePuzzle("The Hydra", [
    "............",
    "..########..",
    ".#........#.",
    ".#........#.",
    ".#.##.##..#.",
    ".#...#....#.",
    ".#...#....#.",
    ".#...#....#.",
    ".#..###...#.",
    ".#.######.#.",
    "..########..",
    "............"
  ], 1087),
  makePuzzle("The Astrolabe", [
    "...#....#...",
    "..#.##...#..",
    ".##########.",
    ".#.#.#..#.#.",
    ".##########.",
    ".#.#.#..#.#.",
    ".#.####.#.#.",
    ".#.#.#..#.#.",
    ".#.#.#..#.#.",
    ".#.#.#..#.#.",
    ".##########.",
    "............"
  ], 1080),
  makePuzzle("The Citadel", [
    "............",
    ".#....#.....",
    "..#.....###.",
    ".......#####",
    "....#..#####",
    "...##..#####",
    "...#.#..###.",
    "..#####.....",
    "..#.#.......",
    ".####..#....",
    ".#.#.#......",
    "..#........."
  ], 1074),
  makePuzzle("The Vortex", [
    "............",
    ".#...#..#.#.",
    "....###.....",
    "..########..",
    "..#..#...#..",
    ".#...#....#.",
    ".#...#....#.",
    "..#..#...#..",
    "..#..#...#..",
    "..########..",
    "...#####....",
    "............"
  ], 1067),
  makePuzzle("The Chimera", [
    "#...........",
    ".##########.",
    "............",
    ".#.######.#.",
    ".#..###...#.",
    ".#.#.##.#.#.",
    ".#.#....#.#.",
    ".#......#.#.",
    ".######.###.",
    "..........#.",
    ".########.#.",
    "...........#"
  ], 1061),
  makePuzzle("The Obelisk", [
    "............",
    ".#.#.#....#.",
    "..########..",
    "..##.#..##..",
    "..####.###..",
    ".##########.",
    "..#..##..#..",
    "..#.##.#.#..",
    "..#####.##..",
    "..########..",
    ".#...#..#.#.",
    "............"
  ], 1055),
  makePuzzle("The Constellation", [
    "............",
    ".....#......",
    ".#########..",
    "...###.#....",
    ".....#......",
    ".##########.",
    ".....#......",
    ".....#......",
    "....###.....",
    ".#########..",
    ".#...##..##.",
    "............"
  ], 1048),
  makePuzzle("The Sundial", [
    "............",
    ".....#....#.",
    "...######...",
    "..##.#..##..",
    "..#.####.#..",
    ".#########..",
    "..#.##.#.#..",
    "..#.####.#..",
    "..##.#..##..",
    "...######...",
    ".#....#.....",
    "............"
  ], 1042),
  makePuzzle("The Letter A", [
    "............",
    ".....##.....",
    "....####....",
    "...##..##...",
    "..##....##..",
    "..########..",
    "..##....##..",
    "..##....##..",
    "..##....##..",
    "..##....##..",
    "............",
    "............"
  ], 1035),
  makePuzzle("The Kraken", [
    "............",
    ".....#......",
    ".....#......",
    "....###.....",
    "..#######...",
    ".#########..",
    "###########.",
    "###..#..####",
    "#....#....##",
    "...#####....",
    "...#.##.#...",
    "............"
  ], 1029),
  makePuzzle("The Monolith", [
    ".............",
    "......#.#....",
    ".....###.....",
    "....#.#.#....",
    "...##.#.##...",
    "..#..##...#..",
    ".###########.",
    "..#..###..#..",
    "...##.#.##...",
    "....#.#.#....",
    ".....###.....",
    "....#.#......",
    "............."
  ], 1022),
  makePuzzle("The Storm", [
    ".............",
    ".###########.",
    "..#...#...#..",
    "..#########..",
    "....#...#....",
    ".....###.....",
    ".....###.....",
    ".....###.....",
    "....#...#....",
    "..#########..",
    "..#...#...#..",
    ".###########.",
    "............."
  ], 1016),
  makePuzzle("The Oracle", [
    ".............",
    "..#########..",
    ".#...###...#.",
    ".#.........#.",
    ".#..##.##..#.",
    ".#....#....#.",
    ".#....#....#.",
    ".#....#....#.",
    ".#...###...#.",
    ".#...###...#.",
    ".#..#####..#.",
    "..#########..",
    "............."
  ], 1009),
  makePuzzle("The Sentinel", [
    "...#.....#...",
    "..#...#.#.#..",
    ".###########.",
    ".#...###...#.",
    ".###########.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".###########.",
    "............."
  ], 1003),
  makePuzzle("The Nexus", [
    ".............",
    ".#....#......",
    "..#..###.###.",
    "........#####",
    "........#####",
    ".....#..#####",
    "....##...###.",
    "...##.#......",
    "...#.#.......",
    "..###........",
    ".##.#........",
    ".#.#..#..#...",
    "..#.........."
  ], 997),
  makePuzzle("The Relic", [
    ".............",
    ".#....#..#.#.",
    ".....###.....",
    "....#####....",
    "...#.###.#...",
    "..#...#...#..",
    ".#....#....#.",
    ".#....#....#.",
    "..#...#...#..",
    "..#...#...#..",
    "..#########..",
    "...######....",
    "............."
  ], 990),
  makePuzzle("The Starforge", [
    "#............",
    ".###########.",
    ".............",
    ".#.#######.#.",
    ".#.........#.",
    ".#.#.###.#.#.",
    ".#.#.###.#.#.",
    ".#.#.#.#.#.#.",
    ".#.......#.#.",
    ".#.#####.#.#.",
    "...........#.",
    ".#########.#.",
    "............#"
  ], 984),
  makePuzzle("The Void Gate", [
    ".............",
    ".#...##....#.",
    "..#########..",
    "..##..#..##..",
    "..###.#.###..",
    "..#..###..#..",
    ".###########.",
    "..#..###..#..",
    "..#.#####.#..",
    "..##..#..##..",
    "..#########..",
    ".#....##...#.",
    "............."
  ], 977),
  makePuzzle("The Celestial Key", [
    ".............",
    "......#......",
    "..#########..",
    "....#.#.#....",
    "......#......",
    "......#......",
    ".###########.",
    ".....###.....",
    "..#...#...#..",
    ".....###.....",
    "..#########..",
    ".##...#...##.",
    "............."
  ], 971),
  makePuzzle("The Iron Bloom", [
    ".............",
    "..#........#.",
    "....#####....",
    "...##.#.##...",
    "..##.###.##..",
    "..#.#.#.#.#..",
    "..#########..",
    "..#.#.#.#.#..",
    "..##.###.##..",
    ".#.##.#.##.#.",
    "....#####....",
    ".#........#..",
    "............."
  ], 964),
  makePuzzle("The Twin Serpents", [
    ".............",
    "..#########..",
    "..#...#...#..",
    "..#########..",
    "..##..#..##..",
    "..#.#####.#..",
    "..#...#...#..",
    "...#.###.#...",
    "....#.#.#....",
    "....#.#.#....",
    ".....###.....",
    "......#..#...",
    "............."
  ], 958),
  makePuzzle("The Crystal Crown", [
    ".............",
    "..#...##..#..",
    "......#......",
    ".....###.....",
    "...#######...",
    "..#########..",
    ".###########.",
    "####..#..####",
    "##....#....##",
    "......#......",
    "....#####....",
    ".....##......",
    "............."
  ], 952),
  makePuzzle("The Night Engine", [
    ".............",
    "......#...#..",
    ".....###.....",
    "....#####....",
    "...##.#.##...",
    "..#..##...#..",
    ".###########.",
    "..#...##..#..",
    "...##.#.##...",
    "....#.#.#....",
    ".....###.....",
    "..#...#......",
    "............."
  ], 945),
  makePuzzle("The Astral Mask", [
    ".............",
    ".###########.",
    "..##..#..##..",
    "..#########..",
    "....#...#....",
    ".....###.....",
    "......#......",
    ".....###.....",
    "....#...#....",
    "..#########..",
    "..#...#...#..",
    ".###########.",
    "............."
  ], 939),
  makePuzzle("The Sun Temple", [
    ".............",
    ".###########.",
    ".#.........#.",
    ".#.........#.",
    ".#..##.##..#.",
    ".#....#....#.",
    ".#...###...#.",
    ".#....#....#.",
    ".#....#....#.",
    ".#...###...#.",
    ".#..#####..#.",
    "..#########..",
    "............."
  ], 932),
  makePuzzle("The Deep Signal", [
    "...#.....#...",
    "..#...#...#..",
    ".###########.",
    ".#....#....#.",
    ".###########.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".#.#.###.#.#.",
    ".#.#..#..#.#.",
    ".#.#..#..#.#.",
    ".###########.",
    "............."
  ], 926),
  makePuzzle("The Infinity Seal", [
    ".............",
    ".#......#....",
    ".##......###.",
    ".....########",
    "........#####",
    ".....#..#####",
    "....##...###.",
    "...##.#......",
    "...#.#.......",
    "..###........",
    ".##.#........",
    ".#.##........",
    "..#.........."
  ], 919),
  makePuzzle("The Memory Palace", [
    ".............",
    ".#..#.#....#.",
    ".....###.....",
    "....#####....",
    "...#..#..#...",
    "..#...#...#..",
    ".#....#....#.",
    ".#....#....#.",
    "..#...#...#..",
    "..#...#...#..",
    "..#########..",
    "....#####....",
    "............."
  ], 913),
  makePuzzle("The Last Beacon", [
    "#............",
    ".###########.",
    "....#...#....",
    ".#.#######.#.",
    ".#.........#.",
    ".#.#.###.#.#.",
    ".#.#..#..#.#.",
    ".#.#.###.#.#.",
    ".#.......#.#.",
    ".#.#####.#.#.",
    "...........#.",
    ".#########.#.",
    "............#"
  ], 906),
  makePuzzle("The Apex Sigil", [
    ".............",
    ".#....#....#.",
    "..#########..",
    "..##..#..##..",
    "..#.#.#.#.#..",
    "..#..###..#..",
    ".###########.",
    "..#..###..#..",
    "..#.#.#.#.#..",
    "..###.#.###..",
    "..#########..",
    ".#....#....#.",
    "............."
  ], 900)
];

const dailyPuzzles = puzzles.filter((puzzle) => puzzle.size === 8);

const PASS_SCORE = 80;

const grid = document.querySelector("#grid");
const startBtn = document.querySelector("#startBtn");
const clearBtn = document.querySelector("#clearBtn");
const checkBtn = document.querySelector("#checkBtn");
const shareBtn = document.querySelector("#shareBtn");
const dailyModeBtn = document.querySelector("#dailyModeBtn");
const journeyModeBtn = document.querySelector("#journeyModeBtn");
const message = document.querySelector("#message");
const puzzleName = document.querySelector("#puzzleName");
const levelInfo = document.querySelector("#levelInfo");
const scoreBox = document.querySelector("#scoreBox");
const sharePanel = document.querySelector("#sharePanel");
const sharePanelMessage = document.querySelector("#sharePanelMessage");
const resultPreview = document.querySelector("#resultPreview");
const whatsAppShare = document.querySelector("#whatsAppShare");
const facebookShare = document.querySelector("#facebookShare");
const xShare = document.querySelector("#xShare");
const emailShare = document.querySelector("#emailShare");
const nativeImageShareBtn = document.querySelector("#nativeImageShareBtn");
const copyLinkBtn = document.querySelector("#copyLinkBtn");
const copyImageBtn = document.querySelector("#copyImageBtn");
const downloadImageBtn = document.querySelector("#downloadImageBtn");
const closeSharePanelBtn = document.querySelector("#closeSharePanelBtn");

const DAY_MS = 24 * 60 * 60 * 1000;
const DAILY_EPOCH = Date.UTC(2026, 0, 1);

let mode = "daily";
const JOURNEY_RUN_KEY = "pixelRecallJourneyRunLevelV2";
const storedLevel = Number(localStorage.getItem(JOURNEY_RUN_KEY));
let level = Number.isFinite(storedLevel)
  ? Math.max(0, Math.min(storedLevel, puzzles.length - 1))
  : 0;
let journeyHighScore = Math.max(
  1,
  Math.min(
    puzzles.length,
    Number(localStorage.getItem("pixelRecallJourneyHighScore")) || level + 1
  )
);
let selected = new Set();
let canDraw = false;
let isDrawing = false;
let activePointerId = null;
let strokeMode = null;
let lastStrokeIndex = null;
let previewTimer = null;
let lastResult = null;
let preparedShare = null;
let previewObjectUrl = null;
let sharePreparationPromise = null;

function utcDayStart(date = new Date()) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function dailyInfo() {
  const dayOffset = Math.floor((utcDayStart() - DAILY_EPOCH) / DAY_MS);
  const dailyNumber = Math.max(1, dayOffset + 1);
  const puzzleIndex = ((dayOffset % dailyPuzzles.length) + dailyPuzzles.length) % dailyPuzzles.length;
  return { dailyNumber, puzzleIndex };
}

function currentPuzzle() {
  if (mode === "daily") {
    return dailyPuzzles[dailyInfo().puzzleIndex];
  }
  return puzzles[Math.min(level, puzzles.length - 1)];
}

function currentRoundLabel(puzzle) {
  if (mode === "daily") {
    return `Daily #${dailyInfo().dailyNumber}
${puzzle.size}×${puzzle.size} · ${(puzzle.time / 1000).toFixed(1)}s`;
  }

  const checkpoint = Math.floor(level / 10) * 10 + 1;
  return `Level ${level + 1}
Best ${journeyHighScore} · Restart ${checkpoint}`;
}

function updateModeButtons() {
  const dailyActive = mode === "daily";
  dailyModeBtn.setAttribute("aria-pressed", String(dailyActive));
  journeyModeBtn.setAttribute("aria-pressed", String(!dailyActive));
}

function sizeGrid(puzzle) {
  const gap = puzzle.size >= 7 ? 5 : 7;
  const availableWidth = Math.min(416, Math.max(250, window.innerWidth - 76));
  const calculatedSize = Math.floor((availableWidth - gap * (puzzle.size - 1)) / puzzle.size);
  const cellSize = Math.min(46, calculatedSize);

  grid.style.gap = `${gap}px`;
  grid.style.setProperty("--cell-size", `${cellSize}px`);
  grid.style.gridTemplateColumns = `repeat(${puzzle.size}, ${cellSize}px)`;
}

function resetButtons() {
  startBtn.disabled = false;
  startBtn.textContent = "Start";
  clearBtn.disabled = true;
  checkBtn.disabled = true;
  shareBtn.disabled = true;
  shareBtn.textContent = "Share result";
}

function buildGrid() {
  clearTimeout(previewTimer);
  const puzzle = currentPuzzle();

  selected.clear();
  canDraw = false;
  isDrawing = false;
  activePointerId = null;
  strokeMode = null;
  lastStrokeIndex = null;
  lastResult = null;
  preparedShare = null;
  sharePreparationPromise = null;
  hideSharePanel();
  scoreBox.textContent = "—";
  puzzleName.textContent = puzzle.name;
  levelInfo.textContent = currentRoundLabel(puzzle);
  grid.innerHTML = "";
  sizeGrid(puzzle);

  for (let i = 0; i < puzzle.size * puzzle.size; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", `Square ${i + 1}`);

    cell.addEventListener("pointerdown", (event) => {
      if (!canDraw) return;

      event.preventDefault();
      isDrawing = true;
      activePointerId = event.pointerId;
      strokeMode = selected.has(i) ? "erase" : "paint";
      lastStrokeIndex = null;

      cell.setPointerCapture?.(event.pointerId);
      applyStroke(i, cell);
    });

    grid.appendChild(cell);
  }

  resetButtons();
  message.textContent = "Press Start and memorize the pattern.";
}

function showPattern() {
  const puzzle = currentPuzzle();
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.className = "cell locked";
    if (puzzle.cells.includes(Number(cell.dataset.index))) {
      cell.classList.add("target");
    }
  });
}

function hidePattern() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.className = "cell";
  });
  canDraw = true;
  message.textContent = "Now redraw it from memory. Drag or click squares.";
}

function startGame() {
  buildGrid();
  startBtn.disabled = true;
  checkBtn.disabled = false;
  clearBtn.disabled = false;
  message.textContent = "Memorize...";
  showPattern();
  previewTimer = setTimeout(hidePattern, currentPuzzle().time);
}

function applyStroke(i, cell) {
  if (!canDraw || i === lastStrokeIndex) return;

  if (strokeMode === "erase") {
    selected.delete(i);
    cell.classList.remove("selected");
  } else {
    selected.add(i);
    cell.classList.add("selected");
  }

  lastStrokeIndex = i;
}

function clearDrawing() {
  if (!canDraw) return;
  selected.clear();
  document.querySelectorAll(".cell").forEach((cell) => cell.classList.remove("selected"));
}

function checkAnswer() {
  if (!canDraw) return;

  const puzzle = currentPuzzle();
  const target = new Set(puzzle.cells);
  const resultMode = mode;
  const resultLevel = level + 1;
  const resultDailyNumber = dailyInfo().dailyNumber;
  let correct = 0;

  document.querySelectorAll(".cell").forEach((cell) => {
    const i = Number(cell.dataset.index);
    cell.className = "cell locked";

    if (target.has(i) && selected.has(i)) {
      cell.classList.add("correct");
      correct++;
    } else if (!target.has(i) && selected.has(i)) {
      cell.classList.add("extra");
    } else if (target.has(i) && !selected.has(i)) {
      cell.classList.add("missed");
    }
  });

  const missed = puzzle.cells.length - correct;
  const extra = [...selected].filter((i) => !target.has(i)).length;
  const accuracy = Math.max(0, Math.round((correct / (puzzle.cells.length + extra)) * 100));

  const cellStates = [...document.querySelectorAll(".cell")].map((cell) => {
    if (cell.classList.contains("correct")) return "correct";
    if (cell.classList.contains("extra")) return "extra";
    if (cell.classList.contains("missed")) return "missed";
    return "empty";
  });

  lastResult = {
    mode: resultMode,
    level: resultLevel,
    dailyNumber: resultDailyNumber,
    accuracy,
    puzzleName: puzzle.name,
    size: puzzle.size,
    correct,
    missed,
    extra,
    cellStates
  };

  scoreBox.textContent = `${accuracy}%`;
  message.textContent = `Correct: ${correct} · Missed: ${missed} · Extra: ${extra}`;

  canDraw = false;
  clearBtn.disabled = true;
  checkBtn.disabled = true;
  shareBtn.disabled = true;
  shareBtn.textContent = "Preparing share...";
  startBtn.disabled = false;

  if (resultMode === "daily") {
    startBtn.textContent = "Play Again";
    const bestKey = `pixelRecallDailyBest-${resultDailyNumber}`;
    const previousBest = Number(localStorage.getItem(bestKey)) || 0;
    if (accuracy > previousBest) localStorage.setItem(bestKey, String(accuracy));
  } else {
    journeyHighScore = Math.max(journeyHighScore, resultLevel);

    if (accuracy >= PASS_SCORE) {
      if (resultLevel >= puzzles.length) {
        journeyHighScore = puzzles.length;
        level = 0;
        startBtn.textContent = "Start New Run";
        message.textContent += ` · Journey complete! Best: ${journeyHighScore}`;
      } else {
        level++;
        journeyHighScore = Math.max(journeyHighScore, level + 1);
        startBtn.textContent = "Next";
        message.textContent += ` · Next: Level ${level + 1}`;
      }
    } else {
      level = Math.floor((resultLevel - 1) / 10) * 10;
      startBtn.textContent = `Restart at Level ${level + 1}`;
      message.textContent += ` · Run ended at Level ${resultLevel}. Restart at ${level + 1}. Best: ${journeyHighScore}`;
    }

    localStorage.setItem(JOURNEY_RUN_KEY, String(level));
    localStorage.setItem("pixelRecallJourneyHighScore", String(journeyHighScore));
  }

  prepareShareAsset();
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Image generation timed out."));
    }, 8000);

    canvas.toBlob((blob) => {
      clearTimeout(timeoutId);
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("The browser could not create the PNG image."));
      }
    }, "image/png");
  });
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fitFontSize(ctx, text, maxWidth, initialSize, minSize = 28) {
  let size = initialSize;
  while (size > minSize) {
    ctx.font = `800 ${size}px Inter, system-ui, sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

async function createResultImageBlob() {
  if (!lastResult) throw new Error("No result is available.");

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");

  const background = ctx.createLinearGradient(0, 0, 1080, 1350);
  background.addColorStop(0, "#23294a");
  background.addColorStop(0.48, "#0f1220");
  background.addColorStop(1, "#0a0d18");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  roundedRect(ctx, 60, 55, 960, 1240, 42);
  ctx.fillStyle = "rgba(24, 28, 47, 0.96)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f3c969";
  ctx.font = "700 27px Inter, system-ui, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("PIXEL RECALL", 110, 130);

  const roundHeading = lastResult.mode === "daily"
    ? `Daily #${lastResult.dailyNumber}`
    : `Journey · Level ${lastResult.level}`;

  ctx.fillStyle = "#f7f7fb";
  ctx.font = "800 52px Inter, system-ui, sans-serif";
  ctx.fillText(roundHeading, 110, 208);

  const nameSize = fitFontSize(ctx, lastResult.puzzleName, 570, 38, 26);
  ctx.font = `800 ${nameSize}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#9aa3c7";
  ctx.fillText(lastResult.puzzleName, 110, 264);

  ctx.textAlign = "right";
  ctx.fillStyle = "#f3c969";
  ctx.font = "900 92px Inter, system-ui, sans-serif";
  ctx.fillText(`${lastResult.accuracy}%`, 970, 220);
  ctx.textAlign = "left";

  const gridArea = 760;
  const gap = lastResult.size >= 10 ? 7 : 9;
  const cellSize = Math.floor((gridArea - gap * (lastResult.size - 1)) / lastResult.size);
  const actualGridSize = cellSize * lastResult.size + gap * (lastResult.size - 1);
  const gridX = Math.round((canvas.width - actualGridSize) / 2);
  const gridY = 330;
  const radius = Math.max(4, Math.min(12, Math.floor(cellSize * 0.2)));
  const stateColors = {
    empty: "#2b314f",
    correct: "#47d18c",
    extra: "#ff637d",
    missed: "#5fa8ff"
  };

  lastResult.cellStates.forEach((state, index) => {
    const row = Math.floor(index / lastResult.size);
    const column = index % lastResult.size;
    const x = gridX + column * (cellSize + gap);
    const y = gridY + row * (cellSize + gap);

    roundedRect(ctx, x, y, cellSize, cellSize, radius);
    ctx.fillStyle = stateColors[state] || stateColors.empty;
    ctx.fill();
    ctx.strokeStyle = state === "empty" ? "#3b4267" : "rgba(255,255,255,0.16)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  const gridBottom = gridY + actualGridSize;
  const statsY = Math.min(gridBottom + 82, 1160);

  ctx.fillStyle = "#f7f7fb";
  ctx.font = "800 35px Inter, system-ui, sans-serif";
  ctx.fillText(`Correct ${lastResult.correct}`, 110, statsY);
  ctx.fillText(`Missed ${lastResult.missed}`, 405, statsY);
  ctx.fillText(`Extra ${lastResult.extra}`, 700, statsY);

  const legendY = statsY + 62;
  const legend = [
    ["#47d18c", "Correct"],
    ["#ff637d", "Extra"],
    ["#5fa8ff", "Missed"]
  ];
  let legendX = 110;
  ctx.font = "600 25px Inter, system-ui, sans-serif";
  legend.forEach(([color, label]) => {
    roundedRect(ctx, legendX, legendY - 22, 24, 24, 6);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = "#9aa3c7";
    ctx.fillText(label, legendX + 38, legendY);
    legendX += 255;
  });

  ctx.fillStyle = "#9aa3c7";
  ctx.font = "600 25px Inter, system-ui, sans-serif";
  const siteAddress = window.location.protocol.startsWith("http")
    ? window.location.href.replace(/\/$/, "")
    : "Pixel Recall";
  ctx.fillText(siteAddress, 110, 1250);

  return canvasToPngBlob(canvas);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function withTimeout(promise, milliseconds, label) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} timed out.`)), milliseconds);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

async function copyImageToClipboard(blob) {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    return false;
  }

  try {
    await withTimeout(
      navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]),
      4000,
      "Clipboard copy"
    );
    return true;
  } catch (error) {
    console.warn("Image clipboard is unavailable.", error);
    return false;
  }
}

function filenameForResult() {
  if (!lastResult) return "pixel-recall-result.png";
  const roundName = lastResult.mode === "daily"
    ? `daily-${lastResult.dailyNumber}`
    : `journey-level-${lastResult.level}`;
  return `pixel-recall-${roundName}.png`;
}

async function prepareShareAsset() {
  if (!lastResult) return null;
  if (preparedShare) return preparedShare;
  if (sharePreparationPromise) return sharePreparationPromise;

  const resultBeingPrepared = lastResult;
  sharePreparationPromise = (async () => {
    try {
      const blob = await createResultImageBlob();
      if (lastResult !== resultBeingPrepared) return null;

      const filename = filenameForResult();
      const file = new File([blob], filename, { type: "image/png" });
      preparedShare = { blob, file, filename };
      shareBtn.disabled = false;
      shareBtn.textContent = "Share result";
      return preparedShare;
    } catch (error) {
      console.error("Share image preparation failed.", error);
      if (lastResult === resultBeingPrepared) {
        shareBtn.disabled = false;
        shareBtn.textContent = "Try image again";
        message.textContent = "The result image was not ready. Press the button to try again.";
      }
      return null;
    } finally {
      sharePreparationPromise = null;
    }
  })();

  return sharePreparationPromise;
}

function isProbablyMobileDevice() {
  if (navigator.userAgentData?.mobile === true) return true;

  const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const touchIpad = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return mobileUserAgent || touchIpad;
}

function canNativeShareImage(file) {
  if (!isProbablyMobileDevice()) return false;
  if (window.location.protocol === "file:") return false;
  if (!window.isSecureContext) return false;
  if (typeof navigator.share !== "function") return false;
  if (typeof navigator.canShare !== "function") return false;

  try {
    return navigator.canShare({ files: [file] });
  } catch (error) {
    console.warn("Native image sharing is unavailable.", error);
    return false;
  }
}

function clearPreviewObjectUrl() {
  if (!previewObjectUrl) return;
  URL.revokeObjectURL(previewObjectUrl);
  previewObjectUrl = null;
}

function hideSharePanel() {
  if (!sharePanel) return;
  sharePanel.hidden = true;
  clearPreviewObjectUrl();
  resultPreview.removeAttribute("src");
}

function canonicalShareUrl() {
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString();
  }

  return "https://djaionfvom.github.io/pixel-recall/";
}

function shareMessageText() {
  if (!lastResult) return "Play Pixel Recall";

  const heading = lastResult.mode === "daily"
    ? `Pixel Recall Daily #${lastResult.dailyNumber}`
    : `Pixel Recall Journey · Level ${lastResult.level}`;

  return `${heading} — ${lastResult.accuracy}% accuracy. Can you beat me?`;
}

function configureShareLinks() {
  const url = canonicalShareUrl();
  const text = shareMessageText();
  const combined = `${text}\n${url}`;

  whatsAppShare.href = `https://wa.me/?text=${encodeURIComponent(combined)}`;
  facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  xShare.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  emailShare.href = `mailto:?subject=${encodeURIComponent("Pixel Recall result")}&body=${encodeURIComponent(combined)}`;
}

function showSharePanel(asset) {
  clearPreviewObjectUrl();
  previewObjectUrl = URL.createObjectURL(asset.blob);
  resultPreview.src = previewObjectUrl;
  configureShareLinks();

  const canCopyImage = Boolean(
    window.isSecureContext &&
    navigator.clipboard?.write &&
    typeof ClipboardItem !== "undefined"
  );
  copyImageBtn.disabled = !canCopyImage;
  copyImageBtn.textContent = canCopyImage ? "Copy image" : "Copy unavailable";
  copyLinkBtn.textContent = "Copy link";
  downloadImageBtn.textContent = "Download image";

  const nativeAvailable = canNativeShareImage(asset.file);
  nativeImageShareBtn.hidden = !nativeAvailable;
  nativeImageShareBtn.disabled = false;
  nativeImageShareBtn.textContent = "Share image";

  sharePanelMessage.textContent = nativeAvailable
    ? "Share the screenshot through your phone, share the result link, or copy and download the image."
    : "Share the result link, or copy and download the result image.";

  sharePanel.hidden = false;
  sharePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function shareResult() {
  if (!lastResult) return;

  if (!preparedShare) {
    shareBtn.disabled = true;
    shareBtn.textContent = "Preparing image...";

    const asset = await withTimeout(
      prepareShareAsset(),
      10000,
      "Result image preparation"
    ).catch((error) => {
      console.warn("Result image preparation did not finish.", error);
      return null;
    });

    shareBtn.disabled = false;
    shareBtn.textContent = "Share result";

    if (!asset) {
      message.textContent = "The result image could not be prepared. Press Share result to try again.";
      return;
    }
  }

  showSharePanel(preparedShare);
}

async function nativeSharePreparedImage() {
  if (!preparedShare || !canNativeShareImage(preparedShare.file)) return;

  nativeImageShareBtn.disabled = true;
  nativeImageShareBtn.textContent = "Opening share menu...";

  try {
    await withTimeout(
      navigator.share({ files: [preparedShare.file] }),
      60000,
      "System share"
    );
    sharePanelMessage.textContent = "Result shared.";
  } catch (error) {
    if (error?.name === "AbortError") {
      sharePanelMessage.textContent = "Sharing cancelled.";
    } else {
      console.warn("Native image sharing failed.", error);
      sharePanelMessage.textContent = "The phone share menu could not share the image. Use Copy image or Download image instead.";
    }
  } finally {
    nativeImageShareBtn.disabled = false;
    nativeImageShareBtn.textContent = "Share image";
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn("Clipboard text copy failed.", error);
    }
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    return copied;
  } catch (error) {
    console.warn("Fallback text copy failed.", error);
    return false;
  }
}

async function copyShareLink() {
  const copied = await copyTextToClipboard(canonicalShareUrl());
  if (copied) {
    copyLinkBtn.textContent = "Link copied";
    sharePanelMessage.textContent = "Link copied. Paste it anywhere.";
    setTimeout(() => {
      copyLinkBtn.textContent = "Copy link";
    }, 2200);
  } else {
    sharePanelMessage.textContent = "The browser blocked link copying. Select the address from the browser bar instead.";
  }
}

async function copyPreparedImage() {
  if (!preparedShare) return;

  copyImageBtn.disabled = true;
  copyImageBtn.textContent = "Copying...";
  const copied = await copyImageToClipboard(preparedShare.blob);

  if (copied) {
    copyImageBtn.textContent = "Image copied";
    sharePanelMessage.textContent = "Image copied. Paste it into Gmail, WhatsApp, Discord, or another app.";
    setTimeout(() => {
      copyImageBtn.textContent = "Copy image";
      copyImageBtn.disabled = false;
    }, 2200);
    return;
  }

  copyImageBtn.textContent = "Copy unavailable";
  sharePanelMessage.textContent = "This browser blocked image copying. Use Download image instead.";
}

function downloadPreparedImage() {
  if (!preparedShare) return;
  downloadBlob(preparedShare.blob, preparedShare.filename);
  downloadImageBtn.textContent = "Image downloaded";
  sharePanelMessage.textContent = "The PNG was downloaded and can be attached anywhere.";
  setTimeout(() => {
    downloadImageBtn.textContent = "Download image";
  }, 2200);
}

function setMode(nextMode) {
  if (nextMode === mode) return;
  mode = nextMode;
  localStorage.setItem("pixelRecallMode", mode);
  updateModeButtons();
  buildGrid();
}

grid.addEventListener("pointermove", (event) => {
  if (!isDrawing || !canDraw || event.pointerId !== activePointerId) return;

  const element = document.elementFromPoint(event.clientX, event.clientY);
  const cell = element?.closest?.(".cell");
  if (!cell || !grid.contains(cell)) return;

  applyStroke(Number(cell.dataset.index), cell);
});

function stopDrawing(event) {
  if (activePointerId !== null && event.pointerId !== activePointerId) return;
  isDrawing = false;
  activePointerId = null;
  strokeMode = null;
  lastStrokeIndex = null;
}

document.addEventListener("pointerup", stopDrawing);
document.addEventListener("pointercancel", stopDrawing);

startBtn.addEventListener("click", startGame);
clearBtn.addEventListener("click", clearDrawing);
checkBtn.addEventListener("click", checkAnswer);
shareBtn.addEventListener("click", shareResult);
nativeImageShareBtn.addEventListener("click", nativeSharePreparedImage);
copyLinkBtn.addEventListener("click", copyShareLink);
copyImageBtn.addEventListener("click", copyPreparedImage);
downloadImageBtn.addEventListener("click", downloadPreparedImage);
closeSharePanelBtn.addEventListener("click", hideSharePanel);
dailyModeBtn.addEventListener("click", () => setMode("daily"));
journeyModeBtn.addEventListener("click", () => setMode("journey"));
window.addEventListener("resize", () => sizeGrid(currentPuzzle()));

console.info("Pixel Recall build: custom-link-share-menu-v8");
updateModeButtons();
buildGrid();
