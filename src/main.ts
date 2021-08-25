import Phaser from 'phaser'

import LoadScene from './scenes/LoadScene'
import TitleScene from './scenes/TitleScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [LoadScene, TitleScene]
}

const game = window.game = new Phaser.Game(config)


export default game
