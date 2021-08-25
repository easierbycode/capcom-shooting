
import { i } from './LoadScene'


export default class TitleScene extends Phaser.Scene
{

	// variables
	private bg: Phaser.GameObjects.TileSprite
	private titleG: Phaser.GameObjects.Sprite
	private titleGWrap: Phaser.GameObjects.Container

	constructor()
	{
		super('title-scene')
	}

    create()
    {
		this.bg	= this.add.tileSprite(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT, 'title_bg').setOrigin(0)
		const scaleY = i.GAME_HEIGHT / this.bg.displayTexture.source[0].height
		this.bg.setTileScale(1, scaleY)

		this.titleGWrap = this.add.container(),
        this.titleG = this.add.sprite(0, 0, 'game_ui', 'titleG.gif').setOrigin(0),
        this.titleGWrap.add(this.titleG)
    }

	update()
	{
		this.bg.tilePositionX += .5
	}
}