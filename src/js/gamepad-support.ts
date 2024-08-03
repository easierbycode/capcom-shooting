// Gamepad support
const MAX_PLAYERS = 4;
const haveEvents = "ongamepadconnected" in window;
let controllers: {
  [property: number]: Gamepad;
} = (window.controllers = {});
// D-PAD AND BUTTONS - DualSense (PS5) controller
// square: 2, cross: 0, circle: 1, triangle: 3
let buttons = {
  U: 12,
  D: 13,
  L: 14,
  R: 15,
  LEFT_BTN: 2,
  BOTTOM_BTN: 0,
  RIGHT_BTN: 1,
  TOP_BTN: 3,
  START: 9,
  SELECT: 8,
};
let buttonValues = Object.values(buttons);
let buttonKeys = Object.keys(buttons);
// KeyboardEvent keyCode mappings by gamepad
// i.e. - keyCodes[0] maps to the first gamepad,
// pressing (S)TART triggers a keypress for 83 (SPACE)
const keyCodes: {
  [property: string]: number;
}[] = [
  {
    U: 87, //(W)  //38,
    D: 83, //(S)  //40,
    L: 37, //(LEFT) //(A)  //65
    R: 39, //(RIGHT) //(D)  //68,
    LEFT_BTN: 32, //(SPACE)
    BOTTOM_BTN: 32,
    RIGHT_BTN: 32,
    TOP_BTN: 32,
    START: 13, //(ENTER)  //83
    SELECT: 8,
  },

  // PLAYER 2

  {
    U: 87, //(W)  //38,
    D: 83, //(S)  //40,
    L: 37, //(LEFT) //(A)  //65
    R: 39, //(RIGHT) //(D)  //68,
    LEFT_BTN: 32, //(SPACE)
    BOTTOM_BTN: 32,
    RIGHT_BTN: 32,
    TOP_BTN: 32,
    START: 13, //(ENTER)  //83
    SELECT: 8,
  },

  // PLAYER 3

  {
    U: 87, //(W)  //38,
    D: 83, //(S)  //40,
    L: 37, //(LEFT) //(A)  //65
    R: 39, //(RIGHT) //(D)  //68,
    LEFT_BTN: 32, //(SPACE)
    BOTTOM_BTN: 32,
    RIGHT_BTN: 32,
    TOP_BTN: 32,
    START: 13, //(ENTER)  //83
    SELECT: 8,
  },

  // PLAYER 4

  {
    U: 87, //(W)  //38,
    D: 83, //(S)  //40,
    L: 37, //(LEFT) //(A)  //65
    R: 39, //(RIGHT) //(D)  //68,
    LEFT_BTN: 32, //(SPACE)
    BOTTOM_BTN: 32,
    RIGHT_BTN: 32,
    TOP_BTN: 32,
    START: 13, //(ENTER)  //83
    SELECT: 8,
  },
];
const pendingKeyupEvents = Array(MAX_PLAYERS).fill({
  U: null,
  D: null,
  L: null,
  R: null,
  LEFT_BTN: null,
  BOTTOM_BTN: null,
  RIGHT_BTN: null,
  TOP_BTN: null,
  START: null,
  SELECT: null,
});

function connecthandler(e: GamepadEvent) {
  console.log("[connecthandler] Gamepad connected:");
  console.log(e.gamepad);

  addgamepad(e.gamepad);
}

function addgamepad(gamepad: Gamepad) {
  console.log(".. adding gamepad:");
  console.log(gamepad);
  controllers[gamepad.index] = gamepad;

  requestAnimationFrame(updateStatus);
}

function disconnecthandler(e: GamepadEvent) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad: Gamepad) {
  delete controllers[gamepad.index];
}

let pendingKeydownUntil = {
  // CONTROLLER1_BUTTON0: new Date().getTime() + 500,
};

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }

  for (
    let controllerIdx = 0;
    controllerIdx < Object.keys(controllers).length;
    controllerIdx++
  ) {
    var controller = controllers[+Object.keys(controllers)[controllerIdx]];

    if (window.gameScene) {
      // SELECT button - restart game
      if (controller.buttons[8].pressed) {
        window.gameScene.scene.restart();
      }

      // START button - pause game
      if (controller.buttons[9].pressed) {
        if (pendingKeydownUntil[`CONTROLLER${controllerIdx}_BUTTON9`]) {
          if (
            new Date().getTime() >
            pendingKeydownUntil[`CONTROLLER${controllerIdx}_BUTTON9`]
          ) {
            pendingKeydownUntil[`CONTROLLER${controllerIdx}_BUTTON9`] =
              new Date().getTime() + 500;
            window.gameScene.theWorldFlg = !window.gameScene.theWorldFlg;
          }
        } else {
          pendingKeydownUntil[`CONTROLLER${controllerIdx}_BUTTON9`] =
            new Date().getTime() + 500;
          window.gameScene.theWorldFlg = !window.gameScene.theWorldFlg;
        }
      }
    }

    // HOME / PS button - enter fullscreen
    // if (controller.buttons[16].pressed) {

    // (Legion Go) LEFT_THUMBSTICK_IN - enter fullscreen
    if (controller.buttons[10].pressed) {
      if (!document.fullscreen) {
        document.getElementsByTagName("canvas")[0].requestFullscreen();
      }
    }

    for (let i = 0; i < buttonValues.length; i++) {
      let buttonKey = buttonKeys[i];
      var val = controller.buttons[buttonValues[i]];
      var pressed = val.pressed;
      let pendingKeyupEvent = pendingKeyupEvents[controllerIdx][buttonKey];

      if (pressed) {
        let keyCode = keyCodes[controllerIdx][buttonKey];

        // if button is still pressed (pendingKeyupEvent),
        // don't create / dispatch duplicate events
        if (pendingKeyupEvent && pendingKeyupEvent.keyCode === keyCode)
          continue;

        var event: any = document.createEvent("event");
        let keyupEvent: any = document.createEvent("event");
        event.initEvent("keydown", true, true);
        keyupEvent.initEvent("keyup", true, true);
        event.keyCode = keyCode;
        keyupEvent.keyCode = keyCode;
        // console.log({ event });
        document.getElementsByTagName("canvas")[0].dispatchEvent(event);

        pendingKeyupEvents[controllerIdx][buttonKey] = keyupEvent;
      } else if (pendingKeyupEvent) {
        document
          .getElementsByTagName("canvas")[0]
          .dispatchEvent(pendingKeyupEvent);

        pendingKeyupEvents[controllerIdx][buttonKey] = null;
      }
    }
  }

  requestAnimationFrame(updateStatus);
}

function scangamepads() {
  var gamepads: Gamepad[] = navigator.getGamepads();
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) scangamepads();
