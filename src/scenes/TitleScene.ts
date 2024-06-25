import { B, D, g, i } from "./LoadScene";
import AudioManager from "./audio";

export class Container extends Phaser.GameObjects.Container {

  constructor(scene: Phaser.Scene, x, y, children?) {
    // super(scene, x, y, children)
    super(scene || window.gameScene, x, y, children);
    this.exclusive = false;
    // scene.add.existing(this)
    (scene || window.gameScene).add.existing(this);
  }

  // set hitArea(rect: Phaser.GameObjects.Rectangle) {
  set hitArea(rect) {
    this.setInteractive(rect, Phaser.Geom.Rectangle.Contains);

    this.scene.time.addEvent({
      callback: () => {
        if (!this.body) return;  // DRJ
        this.body.setSize(rect.width, rect.height);
        this.body.setOffset(rect.x, rect.y);
      },
    });

    this.scene.physics.add.existing(this);
  }

  get hitArea() {
    return {
      height: (this.body?.height || 0),
      width: (this.body?.width || 0),
    };
  }

  set tint(t) {
    this.character && this.character.setTint(t);
  }

  addChild(gameObject: Phaser.GameObjects.GameObject) {
    super.add(gameObject);
  }

  removeChild(gameObject: Phaser.GameObjects.GameObject) {
    super.remove(gameObject, true);
  }

  // addedToScene(gameObject, scene) {
  //   // console.log('[Container] addedtoScene');
  //   this.castAdded(gameObject);
  // }

  // castAdded(t) {
  //   console.log('[Container] castAdded', t.type);
  // }

  // removedFromScene(gameObject, scene) {
  //   // console.log('[Container] removedFromScene');
  //   this.castRemoved(gameObject);
  // }

  // castRemoved(t) {
  //   console.log('[Container] castRemoved', t.type);
  //   if (t.parentContainer) {
  //     t.parentContainer.remove(t, true);
  //   }
  //   this.scene.sys.displayList.remove(t);
  //   if (this.displayList)  this.displayList.remove(this);
  // }

  // addHandler(gameObject) {
  // //   // gameObject.once(Events.DESTROY, this.remove, this);
  //   gameObject.once("destroy", this.remove, this);

  //   if (this.exclusive) {
  //     if (gameObject.parentContainer) {
  //       // gameObject.parentContainer.remove(gameObject);
  //     }

  //     // gameObject.removeFromDisplayList();
  //     gameObject.parentContainer = this;
  //   }
  // }

  removeHandler(gameObject) {
    // // gameObject.off(Events.DESTROY, this.remove);
    // gameObject.off('destroy', this.remove);

    // if (this.exclusive) {
      // gameObject.parentContainer = null;
    // //   // gameObject.addToDisplayList();
    // }

    // DRJ - does work
    if (gameObject.displayList)  gameObject.displayList.remove(gameObject); // DRJ
    
  }
}

export class Sprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame?) {
    super(scene, x, y, texture, frame);
    this.setOrigin(0);
    scene.add.existing(this);
  }
}

export class Texture extends Phaser.Textures.Texture {
  constructor(manager, key, source) {
    super(manager, key, source);
  }

  get baseTexture() {
    return this.source[0];
  }
}

class StartBtn extends Container {
  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y);

    const frameKey = "titleStartText.gif";
    const textureKey = "game_ui";
    const texture = scene.textures.get(textureKey);
    const frame = texture.frames[frameKey];
    const { cutX, cutY, height, width } = frame;

    var t = this;
    this.hitArea = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      50,
      i.GAME_WIDTH,
      i.GAME_HEIGHT - 170
    );
    var o = new Texture(
      scene.textures,
      frameKey,
      (texture.source[0] as any).source
    );
    o.add("__BASE", 0, cutX, cutY, width, height);
    return (
      (o.baseTexture.scaleMode = Phaser.ScaleModes.NEAREST),
      (t.img = new Sprite(scene, 0, 0, o)),
      (t.img.x = i.GAME_CENTER),
      (t.img.y = 330),
      t.img.setOrigin(0.5),
      (t.flashCover = new Phaser.GameObjects.Graphics(scene)),
      t.flashCover.fillStyle(16777215, 1),
      t.flashCover.fillRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT - 120),
      (t.flashCover.alpha = 0),
      // t.interactive = !0,
      // t.buttonMode = !0,
      t
    );
  }

  onOver() {
    (this.img.scaleX = 1.05), (this.img.scaleY = 1.05);
  }

  onOut() {
    (this.img.scaleX = 1), (this.img.scaleY = 1);
  }

  onDown() {}

  onUp() {
    TweenMax.killTweensOf(this.flashCover),
      AudioManager.play("se_decision"),
      this.onFlash();
  }

  onFlash() {
    (this.flashCover.alpha = 0.3),
      TweenMax.to(this.flashCover, 1.5, {
        alpha: 0,
      });
  }

  addedToScene() {
    this.tl = new TimelineMax({
      repeat: -1,
      yoyo: !0,
    });
    this.scene.time.addEvent({
      callback: () => {
        this.tl
          .to(this.img, 0.3, {
            delay: 0.1,
            alpha: 0,
          })
          .to(this.img, 0.8, {
            alpha: 1,
          });
      },
    });
    this.on("pointerover", this.onOver.bind(this)),
      this.on("pointerout", this.onOut.bind(this)),
      this.on("pointerdown", this.onDown.bind(this)),
      this.scene.input.on("pointerupoutside", this.onOut.bind(this)),
      this.on("pointerup", this.onUp.bind(this));
  }
}

export class Scene extends Phaser.Scene {
  constructor(sceneKey) {
    super(sceneKey);
  }

  init() {
    this.events.once("shutdown", this.sceneRemoved, this);
  }

  nextScene() {
    this.scene.stop();
  }

  sceneRemoved() {
    console.log("[Scene] sceneRemoved()", this);
    // // Loop from the end
    let i = this.children.length - 1;
    while (i >= 0) {
      // Get child
      let child = this.children.list[i];
      // Check for image or sprite
      if (child.type === "Image" || child.type === "Sprite") {
        console.log("[Scene] child.destroy()", child);
        // Remove child
        child.destroy();
        // Remove all its tweens
        this.tweens.killTweensOf(child);
      }
      // Decrement
      i--;
    }
  }
}

export default class TitleScene extends Scene {
  // variables
  private belt: Phaser.GameObjects.Graphics;
  private bg: Phaser.GameObjects.TileSprite;
  private logo: Phaser.GameObjects.Sprite;
  private startBtn: Container;
  private subTitle: Phaser.GameObjects.Sprite;
  private titleG: Phaser.GameObjects.Sprite;
  private titleGWrap: Phaser.GameObjects.Container;
  private copyright: Phaser.GameObjects.Text;

  constructor() {
    super("title-scene");
  }

  create() {
    this.bg = this.add
      .tileSprite(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT, "title_bg")
      .setOrigin(0);
    const scaleY = i.GAME_HEIGHT / this.bg.displayTexture.source[0].height;
    this.bg.setTileScale(1, scaleY),
      (this.titleGWrap = this.add.container()),
      (this.titleG = this.add
        .sprite(0, 0, "game_ui", "titleG.gif")
        .setOrigin(0)),
      this.titleGWrap.add(this.titleG),
      (this.titleGWrap.x = i.GAME_WIDTH),
      (this.titleGWrap.y = 100),
      (this.logo = this.add.sprite(0, 0, "game_ui", "logo.gif")),
      (this.logo.x = this.logo.width / 2),
      this.logo.setScale(2),
      (this.logo.y = -this.logo.height / 2);

    var t = "subTitle" + ("ja" == i.LANG ? "" : "En") + ".gif";
    (this.subTitle = this.add.sprite(0, 0, "game_ui", t)),
      (this.subTitle.x = this.subTitle.width / 2),
      this.subTitle.setScale(3),
      (this.subTitle.y = -this.logo.height / 2),
      (this.belt = this.add.graphics()),
      this.belt.fillStyle(0, 1),
      this.belt.fillRect(0, 0, i.GAME_WIDTH, 120),
      (this.belt.y = i.GAME_HEIGHT - 120);

    (this.startBtn = new StartBtn(this)),
      this.startBtn.on("pointerup", this.titleStart.bind(this)),
      // this.startBtn.interactive = !1,
      // this.startBtn.alpha = 0,

      (this.copyright = this.add
        .text(0, 0, "© CodeMonkey.Games 2021", {
          fontFamily: "Press Start 2P",
          fontSize: "34px",
          strokeThickness: 0.15,
        })
        .setOrigin(0, 1)),
      (this.copyright.x = 32),
      (this.copyright.y = i.GAME_HEIGHT - this.copyright.height - 6),
      (this.scoreTitleTxt = this.add
        .sprite(0, 0, "game_ui", "hiScoreTxt.gif")
        .setOrigin(0)),
      (this.scoreTitleTxt.x = 32),
      (this.scoreTitleTxt.y = this.copyright.y - 66);

    (this.fadeOutBlack = this.add.graphics()),
      this.fadeOutBlack.fillStyle(0),
      this.fadeOutBlack.fillRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      (this.fadeOutBlack.alpha = 0);

    var e = new TimelineMax({
      onComplete: function () {},
      onCompleteScope: this,
    });
    e.to(
      this.titleGWrap,
      2,
      {
        x: i.GAME_WIDTH / 2 - this.titleG.width / 2 + 5,
        y: 20,
        ease: Quint.easeOut,
      },
      "+=0.0"
    ),
      e.addCallback(function () {}, "-=0.1", null, this),
      e.to(
        this.logo,
        0.9,
        {
          y: 75,
          ease: Quint.easeIn,
        },
        "-=0.8"
      ),
      e.to(
        this.logo,
        0.9,
        {
          scaleX: 1,
          scaleY: 1,
          ease: Quint.easeIn,
        },
        "-=0.9"
      ),
      e.to(
        this.subTitle,
        0.9,
        {
          y: 130,
          ease: Quint.easeIn,
        },
        "-=0.82"
      ),
      e.to(
        this.subTitle,
        0.9,
        {
          scaleX: 1,
          scaleY: 1,
          ease: Quint.easeIn,
        },
        "-=0.9"
      );
  }

  update() {
    this.bg.tilePositionX += 0.5;
  }

  private sceneRemoved() {
    console.log("[TitleScene] sceneRemoved()");
    // F.dlog("TitleScene.sceneRemoved() Start."),

    // fn(dn(e.prototype), "sceneRemoved", this).call(this),
    super.sceneRemoved();

    (D.caDamage = B.resource.recipe.data.playerData.caDamage),
      (D.playerMaxHp = B.resource.recipe.data.playerData.maxHp),
      (D.playerHp = D.playerMaxHp),
      (D.shootMode = B.resource.recipe.data.playerData.defaultShootName),
      (D.shootSpeed = B.resource.recipe.data.playerData.defaultShootSpeed),
      (D.combo = 0),
      (D.maxCombo = 0),
      (D.score = 0),
      (D.cagage = 0),
      (D.stageId = 0),
      (D.continueCnt = 0),
      (D.akebonoCnt = 0),
      (D.shortFlg = !1); //,
    // B.Scene = new hn,

    // B.Manager.game.stage.addChild(B.Scene),
    this.scene.start("adv-scene");

    // F.dlog("TitleScene.sceneRemoved() End.")
  }

  private titleStart() {
    this.startBtn.off("pointerup", this.titleStart.bind(this)); //,
    (this.startBtn.interactive = !1),
      (this.startBtn.buttonMode = !1),
      TweenMax.to(this.fadeOutBlack, 1, {
        alpha: 1,
        onComplete: this.nextScene,
        onCompleteScope: this,
      });
  }
}
