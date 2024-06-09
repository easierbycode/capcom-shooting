
import Phaser from 'phaser'
import AdvScene from './scenes/AdvScene'
import GameScene from './scenes/GameScene'
import GameoverScene from './scenes/GameoverScene'
import LoadScene from './scenes/LoadScene'
import TitleScene from './scenes/TitleScene'
import { i } from './scenes/LoadScene'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: i.GAME_WIDTH,
	height: i.GAME_HEIGHT,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [LoadScene, TitleScene, AdvScene, GameScene, GameoverScene],
	scale: {
		autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	},
	fps: {
		target: 30
	}
}

const game = window.game = new Phaser.Game(config)


export default game
