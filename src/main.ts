import Phaser from "phaser";
import AdvScene from "./scenes/AdvScene";
import { ContinueScene } from "./scenes/ContinueScene";
import GameScene from "./scenes/GameScene";
import GameoverScene from "./scenes/GameoverScene";
import LoadScene from "./scenes/LoadScene";
import TitleScene from "./scenes/TitleScene";
import { i } from "./scenes/LoadScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: i.GAME_WIDTH,
  height: i.GAME_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      debug: new URL(window.location.href).searchParams.get("debug") == "1",
    },
  },
  scene: [LoadScene, TitleScene, AdvScene, GameScene, GameoverScene, ContinueScene],
  scale: {
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  render: {
    pixelArt: true,
  },
  fps: {
    target: 30,
  },
};

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    document.getElementById('deviceready').classList.add('ready');

    window.game = new Phaser.Game(config);

    document.getElementById('app').style.display = 'none';  
}


if (!window.cordova) {
    setTimeout(() => {
        const e = document.createEvent('Events')
        e.initEvent('deviceready', true, false);
        document.dispatchEvent(e);
    }, 50);
}