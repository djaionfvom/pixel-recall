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
let previewTimer = null;
let lastResult = null;

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
  lastResult = null;
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
      event.preventDefault();
      isDrawing = true;
      activePointerId = event.pointerId;
      toggleCell(i, cell);
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

function fillCell(i, cell) {
  selected.add(i);
  cell.classList.add("selected");
}

function toggleCell(i, cell) {
  if (!canDraw) return;

  if (selected.has(i)) {
    selected.delete(i);
    cell.classList.remove("selected");
  } else {
    fillCell(i, cell);
  }
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

  lastResult = {
    mode: resultMode,
    level: resultLevel,
    dailyNumber: resultDailyNumber,
    accuracy
  };

  scoreBox.textContent = `${accuracy}%`;
  message.textContent = `Correct: ${correct} · Missed: ${missed} · Extra: ${extra}`;

  canDraw = false;
  clearBtn.disabled = true;
  checkBtn.disabled = true;
  shareBtn.disabled = false;
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
}

function resultLine(accuracy) {
  const filled = Math.max(0, Math.min(5, Math.round(accuracy / 20)));
  return `${"🟨".repeat(filled)}${"⬜".repeat(5 - filled)}`;
}

function shareText() {
  if (!lastResult) return "";

  const heading = lastResult.mode === "daily"
    ? `Pixel Recall Daily #${lastResult.dailyNumber}`
    : `Pixel Recall Journey · Level ${lastResult.level}`;

  const pageUrl = window.location.protocol.startsWith("http") ? `\n${window.location.href}` : "";

  return `🧠 ${heading}\n${resultLine(lastResult.accuracy)}\n${lastResult.accuracy}% accuracy\n\nCan you beat me?${pageUrl}`;
}

async function shareResult() {
  if (!lastResult) return;

  const text = shareText();

  try {
    if (navigator.share) {
      await navigator.share({ title: "Pixel Recall", text });
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    shareBtn.textContent = "Copied!";
    setTimeout(() => {
      shareBtn.textContent = "Share result";
    }, 1600);
  } catch (error) {
    if (error?.name !== "AbortError") {
      message.textContent = "Sharing did not work. Please try again.";
    }
  }
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

  fillCell(Number(cell.dataset.index), cell);
});

function stopDrawing(event) {
  if (activePointerId !== null && event.pointerId !== activePointerId) return;
  isDrawing = false;
  activePointerId = null;
}

document.addEventListener("pointerup", stopDrawing);
document.addEventListener("pointercancel", stopDrawing);

startBtn.addEventListener("click", startGame);
clearBtn.addEventListener("click", clearDrawing);
checkBtn.addEventListener("click", checkAnswer);
shareBtn.addEventListener("click", shareResult);
dailyModeBtn.addEventListener("click", () => setMode("daily"));
journeyModeBtn.addEventListener("click", () => setMode("journey"));
window.addEventListener("resize", () => sizeGrid(currentPuzzle()));

updateModeButtons();
buildGrid();
