
import { i } from './LoadScene'


export default class TitleScene extends Phaser.Scene
{

	// variables
	private bg: Phaser.GameObjects.TileSprite
	private logo: Phaser.GameObjects.Sprite
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
		this.bg.setTileScale(1, scaleY),

		this.titleGWrap = this.add.container(),
        this.titleG = this.add.sprite(0, 0, 'game_ui', 'titleG.gif').setOrigin(0),
        this.titleGWrap.add(this.titleG),

		this.logo = this.add.sprite(0, 0, 'game_ui', 'logo.gif'),
		this.logo.x = this.logo.width / 2,
        this.logo.setScale(2),
        this.logo.y = -this.logo.height / 2;

		var e = new TimelineMax({
			onComplete: function() {},
			onCompleteScope: this
		});
		e.to(this.logo, .9, {
			y: 75,
			ease: Quint.easeIn
		}, "-=0.8"),
		e.to(this.logo, .9, {
			scaleX: 1,
			scaleY: 1,
			ease: Quint.easeIn
		}, "-=0.9")
    }

	update()
	{
		this.bg.tilePositionX += .5
	}
}