import { GameCanvas } from "./main/gameCanvas/GameCanvas";
import { Main } from "./main/main/Main";
import { Arena } from "./main/arena/Arena";
import { Snake } from "./main/snake/Snake";

const canvas = new GameCanvas("snakeCanvasID");
const arena = new Arena();
const snake = new Snake();
const main = new Main(canvas, [arena, snake]);

main.bootstrap();

// canvas.try();
