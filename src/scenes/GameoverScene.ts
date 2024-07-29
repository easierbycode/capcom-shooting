import { BigNum, GotoTitleButton } from "./ContinueScene";
import { PIXI } from "./GameScene";
import { D, i } from "./LoadScene";
import { Container, Scene, Sprite } from "./TitleScene";
import AudioManager from "./audio";

export default class GameoverScene extends Scene {
  constructor() {
    super("gameover-scene");
  }

  create() {
    var t = this,
      e = [
        PIXI.Texture.fromFrame("congraBg0.gif"),
        PIXI.Texture.fromFrame("congraBg1.gif"),
        PIXI.Texture.fromFrame("congraBg2.gif"),
      ];
    // (this.bg = new PIXI.extras.AnimatedSprite(e)),
    (this.bg = new PIXI.extras.AnimatedSprite(this, e, "game_ui")),
      (this.bg.animationSpeed = 0.1),
      (this.bg.alpha = 0),
      this.bg.play(),
      this.addChild(this.bg),
      // (this.congraInfoBg = new PIXI.Sprite(
      (this.congraInfoBg = new Sprite(
        this,
        0,
        0,
        "game_ui",
        PIXI.Texture.fromFrame("congraInfoBg.gif")
      )),
      // this.congraInfoBg.anchor.set(0, 0.5),
      this.congraInfoBg.setOrigin(0, 0.5),
      (this.congraInfoBg.x = 0),
      (this.congraInfoBg.y = 210),
      (this.congraInfoBg.alpha = 0),
      this.addChild(this.congraInfoBg);
    var o = [
      PIXI.Texture.fromFrame("congraTxt0.gif"),
      PIXI.Texture.fromFrame("congraTxt1.gif"),
      PIXI.Texture.fromFrame("congraTxt2.gif"),
    ];
    // (o[0].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST),
    //   (o[1].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST),
    //   (o[2].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST),
    // (this.congraTxt = new PIXI.extras.AnimatedSprite(o)),
    (this.congraTxt = new PIXI.extras.AnimatedSprite(this, o, "game_ui")),
      (this.congraTxt.animationSpeed = 0.2),
      // this.congraTxt.anchor.set(0.5),
      this.congraTxt.setOrigin(0.5),
      (this.congraTxt.x = this.congraTxt.width / 2),
      (this.congraTxt.y = 6 + this.congraTxt.height / 2),
      this.congraTxt.play(),
      this.addChild(this.congraTxt),
      // (this.congraTxtEffect = new PIXI.Sprite(o[0])),
      (this.congraTxtEffect = new Sprite(this, 0, 0, "game_ui", o[0])),
      // this.congraTxtEffect.anchor.set(0.5),
      this.congraTxtEffect.setOrigin(0.5),
      (this.congraTxtEffect.visible = !1),
      this.addChild(this.congraTxtEffect),
      (this.continueFlg = !1),
      D.score > D.highScore &&
        ((D.highScore = D.score),
        (document.cookie =
          "afc2019_highScore=" +
          D.score +
          `; expires=Tue, 02 Apr ${new Date().getFullYear()} 7:00:00 UTC; secure;`),
        // (this.continueNewrecord = new PIXI.Sprite(
        (this.continueNewrecord = new Sprite(
          this,
          0,
          0,
          "game_ui",
          PIXI.Texture.fromFrame("continueNewrecord.gif")
        )),
        (this.continueNewrecord.x = 0),
        (this.continueNewrecord.y = i.GAME_MIDDLE - 40),
        // this.continueNewrecord.scale.set(1, 0),
        this.continueNewrecord.setScale(1, 0),
        this.addChild(this.continueNewrecord),
        (this.continueFlg = !0)),
      // (this.scoreContainer = new PIXI.Container()),
      (this.scoreContainer = new Container(this, 32, i.GAME_MIDDLE - 23)),
      // (this.scoreContainer.x = 32),
      // (this.scoreContainer.y = i.GAME_MIDDLE - 23),
      // this.scoreContainer.scale.set(1, 0),
      this.scoreContainer.setScale(1, 0),
      this.addChild(this.scoreContainer),
      // (this.scoreTitleTxt = new PIXI.Sprite(
      (this.scoreTitleTxt = new Sprite(
        this,
        0,
        0,
        "game_ui",
        PIXI.Texture.fromFrame("scoreTxt.gif")
      )),
      // (this.scoreTitleTxt.x = 0),
      // (this.scoreTitleTxt.y = 0),
      this.scoreContainer.addChild(this.scoreTitleTxt),
      // (this.bigNumTxt = new qt(10)),
      (this.bigNumTxt = new BigNum(10)),
      (this.bigNumTxt.x = this.scoreTitleTxt.x + this.scoreTitleTxt.width + 3),
      (this.bigNumTxt.y = this.scoreTitleTxt.y - 2),
      this.bigNumTxt.setNum(D.score),
      this.scoreContainer.addChild(this.bigNumTxt),
      // (this.twitterBtn = new Vt()),
      // this.twitterBtn.scale.set(0),
      // (this.twitterBtn.x = i.GAME_CENTER),
      // (this.twitterBtn.y = i.GAME_MIDDLE + 15),
      // this.twitterBtn.on("pointerup", this.tweet.bind(this)),
      // this.addChild(this.twitterBtn),

      // (this.gotoTitleBtn = new Ie()),
      // DRJ::TODO - fix GotoTitleButton position
      (this.gotoTitleBtn = new GotoTitleButton(this)),
      (this.gotoTitleBtn.x = i.GAME_CENTER - this.gotoTitleBtn.width / 2),
      (this.gotoTitleBtn.y = i.GAME_HEIGHT - this.gotoTitleBtn.height - 13),
      this.gotoTitleBtn.on("pointerup", function () {
        t.nextSceneAnim();
      }),
      this.addChild(this.gotoTitleBtn);
    // var n = new PIXI.filters.BlurFilter();
    // (this.bg.filters = [n]),
    // this.congraTxt.scale.set(5),
    this.congraTxt.setScale(5),
      (this.congraTxt.x = i.GAME_WIDTH + this.congraTxt.width / 2),
      (this.congraTxt.y = i.GAME_MIDDLE - 32);
    var a = new TimelineMax();
    a.to(this.congraTxt, 2.5, {
      x: -(this.congraTxt.width - i.GAME_WIDTH),
      ease: Linear.easeNone,
    }),
      a.addCallback(
        function () {
          AudioManager.play("voice_congra");
        },
        "-=2.0",
        null,
        this
      ),
      a.to(
        this.bg,
        0.8,
        {
          alpha: 1,
        },
        "-=0.3"
      ),
      // a.to(
      //   n,
      //   0.8,
      //   {
      //     blur: 0,
      //   },
      //   "-=0.8"
      // ),
      a.addCallback(
        function () {
          AudioManager.play("se_ca"),
            (this.congraTxt.x = i.GAME_CENTER),
            (this.congraTxt.y = i.GAME_MIDDLE - 60),
            (this.congraTxtEffect.x = this.congraTxt.x),
            (this.congraTxtEffect.y = this.congraTxt.y),
            // this.congraTxt.scale.set(3);
            this.congraTxt.setScale(3);
        },
        "+=0",
        null,
        this
      ),
      // a.to(this.congraTxt.scale, 0.5, {
      a.to(this.congraTxt, 0.5, {
        // x: 1,
        scaleX: 1,
        // y: 1,
        scaleY: 1,
        ease: Expo.easeIn,
      }),
      a.to(
        this.congraTxtEffect,
        0,
        {
          visible: !0,
        },
        "+=0.0"
      ),
      a.to(
        // this.congraTxtEffect.scale,
        this.congraTxtEffect,
        1,
        {
          // x: 1.5,
          scaleX: 1.5,
          // y: 1.5,
          scaleY: 1.5,
          ease: Expo.easeOut,
        },
        "+=0.0"
      ),
      a.to(
        this.congraTxtEffect,
        1,
        {
          alpha: 0,
          ease: Expo.easeOut,
        },
        "-=1"
      ),
      a.to(
        this.congraInfoBg,
        0.3,
        {
          alpha: 1,
        },
        "-=0.5"
      ),
      this.continueFlg &&
        // a.to(this.continueNewrecord.scale, 0.5, {
        a.to(this.continueNewrecord, 0.5, {
          // y: 1,
          scaleY: 1,
          ease: Elastic.easeOut,
        }),
      a.to(
        // this.scoreContainer.scale,
        this.scoreContainer,
        0.5,
        {
          // x: 1,
          scaleX: 1,
          // y: 1,
          scaleY: 1,
          ease: Elastic.easeOut,
        },
        "-=0.25"
      ); //,
    // a.to(
    //   this.twitterBtn.scale,
    //   0.5,
    //   {
    //     x: 1,
    //     y: 1,
    //     ease: Elastic.easeOut,
    //   },
    //   "-=0.25"
    // ); // create scene
  }

  update(time: number, delta: number): void {}

  nextSceneAnim() {
    this.gotoTitleBtn.off("pointerup"),
      (this.gotoTitleBtn.interactive = !1),
      (this.gotoTitleBtn.buttonMode = !1),
      TweenMax.to(this, 1.5, {
        alpha: 0,
        delay: 0.3,
        onComplete: this.nextScene,
        onCompleteScope: this,
      });
  }

  tweet() {}

  sceneRemoved(): void {
    super.sceneRemoved();
    this.scene.start("title-scene");
  }
}
