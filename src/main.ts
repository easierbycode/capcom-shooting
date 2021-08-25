
import Phaser from 'phaser'
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
	scene: [LoadScene, TitleScene],
	scale: {
		autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

const game = window.game = new Phaser.Game(config)


export default game
