import { PIXI, l } from "./GameScene";
import { B, D, i } from "./LoadScene";
import { Scene, Sprite } from "./TitleScene";
import AudioManager from "./audio";

// K (line 1453)
class Button extends Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    // o.on("added", o.atCastAdded),
    this.on("addedtoscene", this.atCastAdded),
      // o.on("removed", o.atCastRemoved);
      this.on("removedfromscene", this.atCastRemoved);
  }

  atCastAdded(t) {
    this.castAdded();
  }

  atCastRemoved(t) {
    this.castRemoved();
  }

  castAdded() {}

  castRemoved() {}

  set interactive(bool) {
    bool ? super.setInteractive() : super.disableInteractive();
  }
}

// qt (line 2574)
export class BigNum extends l.prototype.constructor {
  constructor(t) {
    super(t);

    this.maxDigit = t;
    this.textureList = [];

    for (let i = 0; i <= 9; i++) {
      this.textureList[i] = PIXI.Texture.fromFrame(
        "bigNum" + String(i) + ".gif"
      );
    }

    this.numSpList = [];

    for (let n = 0; n < t; n++) {
      // const a = new PIXI.Sprite(this.textureList[0]);
      const a = new Sprite(this.scene, 0, 0, "game_ui", this.textureList[0]);
      a.x = (t - 1 - n) * (a.width - 1);
      this.addChild(a);
      this.numSpList[n] = a;
    }
  }

  setNum(t) {
    for (let e = String(t), o = 0; o < this.maxDigit; o++) {
      const i = e.substr(o, 1);
      i
        ? // ? (this.numSpList[e.length - 1 - o].texture = this.textureList[Number(i)])
          this.numSpList[e.length - 1 - o].setTexture(
            "game_ui",
            this.textureList[Number(i)]
          )
        : // : (this.numSpList[o].texture = this.textureList[0]);
          this.numSpList[o].setTexture("game_ui", this.textureList[0]);
    }
  }

  castAdded(t) {}

  castRemoved(t) {}
}

// de (line 2947)
class YesButton extends Button {
  constructor(scene) {
    super(scene, 0, 0, "game_ui", PIXI.Texture.fromFrame("continueYes.gif"));

    this.textureDefault = PIXI.Texture.fromFrame("continueYes.gif");
    this.textureOver = PIXI.Texture.fromFrame("continueYesOver.gif");
    this.textureDown = PIXI.Texture.fromFrame("continueYesDown.gif");

    this.interactive = true;
    this.buttonMode = true;
  }

  onOver() {
    AudioManager.play("se_over");
    // this.texture = this.textureOver;
    this.setTexture("game_ui", this.textureOver);
  }

  onOut() {
    // this.texture = this.textureDefault;
    this.setTexture("game_ui", this.textureDefault);
  }

  onDown() {
    // this.texture = this.textureDown;
    this.setTexture("game_ui", this.textureDown);
  }

  onUp() {
    AudioManager.play("se_correct");
    // this.texture = this.textureDefault;
    this.setTexture("game_ui", this.textureDefault);
  }

  castAdded() {
    this.on("pointerover", this.onOver.bind(this));
    this.on("pointerout", this.onOut.bind(this));
    this.on("pointerdown", this.onDown.bind(this));
    this.on("pointerupoutside", this.onOut.bind(this));
    this.on("pointerup", this.onUp.bind(this));
  }

  castRemoved() {
    this.off("pointerover", this.onOver.bind(this));
    this.off("pointerout", this.onOut.bind(this));
    this.off("pointerdown", this.onDown.bind(this));
    this.off("pointerupoutside", this.onOut.bind(this));
    this.off("pointerup", this.onUp.bind(this));
  }
}

// _e (line 3073)
class NoButton extends Button {
  constructor(scene) {
    super(scene, 0, 0, "game_ui", PIXI.Texture.fromFrame("continueNo.gif"));

    this.textureDefault = PIXI.Texture.fromFrame("continueNo.gif");
    this.textureOver = PIXI.Texture.fromFrame("continueNoOver.gif");
    this.textureDown = PIXI.Texture.fromFrame("continueNoDown.gif");

    this.interactive = true;
    this.buttonMode = true;
  }

  onOver() {
    AudioManager.play("se_over");
    // this.texture = this.textureOver;
    this.setTexture("game_ui", this.textureOver);
  }

  onOut() {
    // this.texture = this.textureDefault;
    this.setTexture("game_ui", this.textureDefault);
  }

  onDown() {
    // this.texture = this.textureDown;
    this.setTexture("game_ui", this.textureDown);
  }

  onUp() {
    AudioManager.play("se_cancel");
    // this.texture = this.textureDefault;
    this.setTexture("game_ui", this.textureDefault);
  }

  castAdded() {
    this.on("pointerover", this.onOver.bind(this));
    this.on("pointerout", this.onOut.bind(this));
    this.on("pointerdown", this.onDown.bind(this));
    this.on("pointerupoutside", this.onOut.bind(this));
    this.on("pointerup", this.onUp.bind(this));
  }

  castRemoved() {
    this.off("pointerover", this.onOver.bind(this));
    this.off("pointerout", this.onOut.bind(this));
    this.off("pointerdown", this.onDown.bind(this));
    this.off("pointerupoutside", this.onOut.bind(this));
    this.off("pointerup", this.onUp.bind(this));
  }
}

// Ie (line 3199)
export class GotoTitleButton extends l.prototype.constructor {
  constructor(scene) {
    super(undefined, true);

    var t = this;
    return (
      // (t.interactive = !0),
      // (t.buttonMode = !0),
      (t.textureDefault = PIXI.Texture.fromFrame("gotoTitleBtn0.gif")),
      (t.textureOver = PIXI.Texture.fromFrame("gotoTitleBtn1.gif")),
      (t.textureDown = PIXI.Texture.fromFrame("gotoTitleBtn2.gif")),
      // (t.btn = new PIXI.Sprite(t.textureDefault)),
      (t.btn = new Sprite(
        scene,
        0,
        0,
        "game_ui",
        t.textureDefault
      ).setInteractive()),
      t.addChild(t.btn),
      t
    );
  }

  onOver(t) {
    // g.play("se_over"),
    AudioManager.play("se_over"),
      // this.btn.texture = this.textureOver
      this.btn.setTexture("game_ui", this.textureOver);
  }

  onOut(t) {
    // this.btn.texture = this.textureDefault
    this.btn.setTexture("game_ui", this.textureDefault);
  }

  onDown(t) {
    // this.btn.texture = this.textureDown
    this.btn.setTexture("game_ui", this.textureDown);
  }

  onUp(t) {
    // this.interactive = !1,
    this.btn.disableInteractive(),
      // this.buttonMode = !1,

      AudioManager.play("se_correct"),
      // this.btn.texture = this.textureDefault
      this.btn.setTexture("game_ui", this.textureDefault);
  }

  castAdded(t) {
    // Se(Ce(e.prototype), "castAdded", this).call(this),
    super.castAdded(),
      // this.on("pointerover", this.onOver.bind(this)),
      // this.on("pointerout", this.onOut.bind(this)),
      // this.on("pointerdown", this.onDown.bind(this)),
      // this.on("pointerupoutside", this.onOut.bind(this)),
      // this.on("pointerup", this.onUp.bind(this));
      this.btn.on("pointerover", this.onOver.bind(this)),
      this.btn.on("pointerout", this.onOut.bind(this)),
      this.btn.on("pointerdown", this.onDown.bind(this)),
      this.btn.on("pointerupoutside", this.onOut.bind(this)),
      this.btn.on("pointerup", this.onUp.bind(this));
  }

  castRemoved(t) {
    // Se(Ce(e.prototype), "castRemoved", this).call(this),
    super.castRemoved(),
      // this.off("pointerover", this.onOver.bind(this)),
      // this.off("pointerout", this.onOut.bind(this)),
      // this.off("pointerdown", this.onDown.bind(this)),
      // this.off("pointerupoutside", this.onOut.bind(this)),
      // this.off("pointerup", this.onUp.bind(this));
      this.btn.off("pointerover", this.onOver.bind(this)),
      this.btn.off("pointerout", this.onOut.bind(this)),
      this.btn.off("pointerdown", this.onDown.bind(this)),
      this.btn.off("pointerupoutside", this.onOut.bind(this)),
      this.btn.off("pointerup", this.onUp.bind(this));
  }
}

// BE (line 3329)
export class ContinueScene extends Scene {
  constructor() {
    super("continue-scene");
  }

  loop() {}

  onCountDown() {
    if (this.countDown < 0) {
      this.selectNo.bind(this)();
    } else {
      this.tl = new TimelineMax({
        onComplete: this.onCountDown,
        onCompleteScope: this,
      });
      this.tl
        .to(this.cntText, 0.4, {
          delay: 0.4,
          alpha: 0,
        })
        .call(
          () => {
            // this.cntText.texture = PIXI.Texture.fromFrame("countdown" + this.countDown + ".gif");
            this.cntText.setTexture(
              "game_ui",
              PIXI.Texture.fromFrame("countdown" + this.countDown + ".gif")
            );
            AudioManager.play(["voice_countdown" + this.countDown]);
            this.countDown--;
          },
          null,
          this,
          "+=0"
        )
        .to(this.cntText, 0.8, {
          alpha: 1,
        });
    }
  }

  create() {
    this.sceneSwitch = 0;
    this.countDown = 9;
    AudioManager.bgmPlay("bgm_continue", 102735, 698597);
    this.bg = new PIXI.Graphics(this);
    // this.bg.beginFill(0, 1);
    this.bg.fill(0, 1);
    // this.bg.drawRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
    this.bg.fillRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
    this.addChild(this.bg);

    // this.continueTitle = new PIXI.Sprite(
    this.continueTitle = new Sprite(
      this,
      0,
      0,
      "game_ui",
      PIXI.Texture.fromFrame("continueTitle.gif")
    );
    this.continueTitle.x = 0;
    this.continueTitle.y = 70;
    this.addChild(this.continueTitle);

    this.loseFaceTexture = [
      PIXI.Texture.fromFrame("continueFace0.gif"),
      PIXI.Texture.fromFrame("continueFace1.gif"),
    ];
    this.loseFaceGrayTexture = [PIXI.Texture.fromFrame("continueFace2.gif")];
    this.loseFaceSmileTexture = [PIXI.Texture.fromFrame("continueFace3.gif")];
    // this.loseFace = new PIXI.extras.AnimatedSprite(this.loseFaceTexture);
    this.loseFace = new PIXI.extras.AnimatedSprite(
      this,
      this.loseFaceTexture,
      "game_ui"
    );
    this.loseFace.x = 20;
    this.loseFace.y = this.continueTitle.y + this.continueTitle.height + 38;
    this.loseFace.animationSpeed = 0.05;
    this.loseFace.play();
    this.addChild(this.loseFace);

    // this.cntTextBg = new PIXI.Sprite(PIXI.Texture.fromFrame("countdownBg.gif"));
    this.cntTextBg = new Sprite(
      this,
      0,
      0,
      "game_ui",
      PIXI.Texture.fromFrame("countdownBg.gif")
    );
    this.cntTextBg.x = this.cntTextBg.x + this.cntTextBg.width + 20;
    this.cntTextBg.y = this.continueTitle.y + this.continueTitle.height + 30;
    this.addChild(this.cntTextBg);

    // this.cntText = new PIXI.Sprite(PIXI.Texture.fromFrame("countdown9.gif"));
    this.cntText = new Sprite(
      this,
      0,
      0,
      "game_ui",
      PIXI.Texture.fromFrame("countdown9.gif")
    );
    this.cntText.x = this.cntTextBg.x;
    this.cntText.y = this.cntTextBg.y;
    this.cntText.alpha = 0;
    this.addChild(this.cntText);

    this.yesText = new YesButton(this);
    this.yesText.x = i.GAME_CENTER - this.yesText.width / 2 - 50;
    this.yesText.y = i.GAME_MIDDLE - this.yesText.height / 2 + 70;
    this.yesText.on("pointerup", this.selectYes.bind(this));
    this.addChild(this.yesText);

    this.noText = new NoButton(this);
    this.noText.x = i.GAME_CENTER - this.noText.width / 2 + 50;
    this.noText.y = i.GAME_MIDDLE - this.noText.height / 2 + 70;
    this.noText.on("pointerup", this.selectNo.bind(this));
    this.addChild(this.noText);

    this.continueTitle.alpha =
      this.loseFace.alpha =
      this.cntTextBg.alpha =
      this.yesText.alpha =
      this.noText.alpha =
        0;
    TweenMax.to(
      [
        this.continueTitle,
        this.loseFace,
        this.cntTextBg,
        this.yesText,
        this.noText,
      ],
      0.8,
      {
        alpha: 1,
      }
    );

    var t =
        B.resource.recipe.data[
          "ja" == i.LANG ? "continueComment" : "continueCommentEn"
        ],
      e = t[Math.floor(Math.random() * t.length)],
      // o = new PIXI.TextStyle({
      o = new Phaser.GameObjects.TextStyle("", {
        fontFamily: "sans-serif",
        fontSize: 15,

        // fontWeight: "bold",
        fontStyle: "strong",

        // lineHeight: 17,
        fixedHeight: 17,

        // fill: 16777215,
        color: 16777215,

        // wordWrap: !0,
        // wordWrapWidth: 230,
        // breakWords: !0,
        wordWrap: {
          width: 230,
        },

        align: "center",

        // padding: 10,
        padding: {
          x: 10,
          y: 10,
        },
      });
    // this.commentText = new PIXI.Text(e, o);
    this.commentText = new Phaser.GameObjects.Text(this, 0, 0, e, o);
    this.commentText.x = i.GAME_CENTER - this.commentText.width / 2;
    this.commentText.y = i.GAME_HEIGHT - 120;
    this.addChild(this.commentText);

    this.onCountDown.bind(this)();
  }

  selectYes() {
    this.countDown < 0 && (this.countDown = 0),
      // AudioManager.stop("voice_countdown" + this.countDown),
      this.tl.kill(),
      (this.sceneSwitch = 1),
      this.nextSceneAnim();
    var t = Math.floor(3 * Math.random());
    AudioManager.play(["g_continue_yes_voice" + String(t)]);
  }

  selectNo() {
    this.countDown < 0 && (this.countDown = 0),
      // g.stop("voice_countdown" + this.countDown),
      D.lowModeFlg ||
        // ((g.bgm_continue.volume = 0),
        ((AudioManager.resource.bgm_continue.volume = 0),
        // TweenMax.to(g.bgm_continue, 1.5, {
        TweenMax.to(AudioManager.resource.bgm_continue, 1.5, {
          volume: 0.25,
          delay: 2.8,
        })),
      AudioManager.play("voice_gameover"),
      AudioManager.play("bgm_gameover"),
      this.tl.kill(),
      (this.countDown = 0),
      (this.cntText.alpha = 0.2),
      // (this.cntText.texture = PIXI.Texture.fromFrame("countdown0.gif")),
      this.cntText.setTexture(
        "game_ui",
        PIXI.Texture.fromFrame("countdown0.gif")
      ),
      // (this.loseFace.textures = this.loseFaceGrayTexture),
      this.loseFace.setTexture("game_ui", this.loseFaceGrayTexture[0]),
      this.removeChild(this.commentText),
      // (this.gameOverTxt = new PIXI.Sprite(
      (this.gameOverTxt = new Sprite(
        this,
        0,
        0,
        "game_ui",
        PIXI.Texture.fromFrame("continueGameOver.gif")
      )),
      (this.gameOverTxt.x = i.GAME_CENTER - this.gameOverTxt.width / 2),
      (this.gameOverTxt.y = i.GAME_MIDDLE - this.gameOverTxt.height / 2 - 35),
      (this.gameOverTxt.alpha = 0),
      this.addChild(this.gameOverTxt),
      (this.tl = new TimelineMax({
        onComplete: function () {
          var t = this;
          D.score > D.highScore &&
            ((D.highScore = D.score),
            (document.cookie =
              "afc2019_highScore=" +
              D.score +
              // "; expires=Tue, 02 Apr 2019 7:00:00 UTC; secure;"),
              `; expires=Tue, 02 Apr ${
                new Date().getFullYear() + 1
              } 7:00:00 UTC; secure;`),
            // (this.continueNewrecord = new PIXI.Sprite(
            (this.continueNewrecord = new Sprite(
              this,
              0,
              0,
              "game_ui",
              PIXI.Texture.fromFrame("continueNewrecord.gif")
            )),
            (this.continueNewrecord.x = 0),
            (this.continueNewrecord.y =
              this.loseFace.y + this.loseFace.height + 10),
            this.addChild(this.continueNewrecord));

          // (this.scoreTitleTxt = new PIXI.Sprite(
          (this.scoreTitleTxt = new Sprite(
            this,
            0,
            0,
            "game_ui",
            PIXI.Texture.fromFrame("scoreTxt.gif")
          )),
            (this.scoreTitleTxt.x = 32),
            (this.scoreTitleTxt.y =
              this.loseFace.y + this.loseFace.height + 30),
            this.addChild(this.scoreTitleTxt); //,

          // (this.bigNumTxt = new qt(10)),
          (this.bigNumTxt = new BigNum(10)),
            (this.bigNumTxt.x =
              this.scoreTitleTxt.x + this.scoreTitleTxt.width + 3),
            (this.bigNumTxt.y = this.scoreTitleTxt.y - 2),
            this.bigNumTxt.setNum(D.score),
            this.addChild(this.bigNumTxt),
            // (this.twText = new Vt()),
            // (this.twText.x = i.GAME_CENTER),
            // (this.twText.y =
            //   this.scoreTitleTxt.y + this.twText.height / 2 + 20),
            // this.twText.on("pointerup", this.tweet.bind(this)),
            // this.addChild(this.twText),

            // (this.gotoTitleBtn = new Ie()),
            (this.gotoTitleBtn = new GotoTitleButton(this)),
            (this.gotoTitleBtn.x = i.GAME_CENTER - this.gotoTitleBtn.width / 2),
            (this.gotoTitleBtn.y =
              i.GAME_MIDDLE - this.gotoTitleBtn.height / 2 + 160),
            // this.gotoTitleBtn.on("pointerup", function () {
            this.gotoTitleBtn.btn.on("pointerup", function () {
              t.nextSceneAnim();
            }),
            this.addChild(this.gotoTitleBtn);
        },
        onCompleteScope: this,
      })),
      this.tl
        // .to(this, 0.07, {
        .to(this.cameras.main, 0.07, {
          x: 0,
          y: 10,
        })
        .call(
          function () {
            // this.bg.beginFill(7798784, 1),
            this.bg.fill(7798784, 1),
              // this.bg.drawRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
              this.bg.fillRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
          },
          null,
          this,
          "+=0"
        )
        .to(this, 0.07, {
          x: 0,
          y: -5,
        })
        .call(
          function () {
            // this.bg.beginFill(0, 1),
            this.bg.fill(0, 1),
              // this.bg.drawRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
              this.bg.fillRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
          },
          null,
          this,
          "+=0"
        )
        .to(this, 0.07, {
          x: 0,
          y: 3,
        })
        .call(
          function () {
            // this.bg.beginFill(7798784, 1),
            this.bg.fill(7798784, 1),
              // this.bg.drawRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
              this.bg.fillRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
          },
          null,
          this,
          "+=0"
        )
        .to(this, 0.07, {
          x: 0,
          y: 0,
        })
        .call(
          function () {
            // this.bg.beginFill(0, 1),
            this.bg.fill(0, 1),
              // this.bg.drawRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
              this.bg.fillRect(0, 0, i.STAGE_WIDTH, i.STAGE_HEIGHT);
          },
          null,
          this,
          "+=0"
        )
        .to(this.gameOverTxt, 1, {
          delay: 0.3,
          alpha: 1.5,
        })
        .call(
          function () {
            var t = Math.floor(2 * Math.random());
            AudioManager.play(["g_continue_no_voice" + String(t)]);
          },
          null,
          this,
          "+=0"
        ),
      this.removeChild(this.yesText),
      this.removeChild(this.noText);
  }

  tweet() {
    // F.tweet(1);
  }

  nextSceneAnim(t) {
    1 == this.sceneSwitch
      ? ((this.yesText.interactive = !1),
        (this.yesText.buttonMode = !1),
        (this.noText.interactive = !1),
        (this.noText.buttonMode = !1),
        // (this.loseFace.textures = this.loseFaceSmileTexture))
        this.loseFace.setTexture("game_ui", this.loseFaceSmileTexture[0]))
      : (this.gotoTitleBtn.off("pointerup"),
        (this.gotoTitleBtn.interactive = !1),
        (this.gotoTitleBtn.buttonMode = !1)),
      // TweenMax.to(this, 1.5, {
      TweenMax.to(this.cameras.main, 1.5, {
        alpha: 0,
        delay: 0.3,
        onComplete: this.nextScene,
        onCompleteScope: this,
      });
  }

  sceneRemoved() {
    // g.stop("bgm_continue"),
    // F.dlog("ContinueScene.sceneRemoved() Start."),
    // Ae(Me(e.prototype), "sceneRemoved", this).call(this),
    super.sceneRemoved(),
      1 == this.sceneSwitch
        ? ((D.playerMaxHp = B.resource.recipe.data.playerData.maxHp),
          (D.playerHp = D.playerMaxHp),
          (D.shootMode = B.resource.recipe.data.playerData.defaultShootName),
          (D.shootSpeed = B.resource.recipe.data.playerData.defaultShootSpeed),
          D.continueCnt++,
          (D.score = D.continueCnt),
          // (B.Scene = new Ki()))
          this.scene.start("game-scene"))
        : // : (B.Scene = new mn()),
          this.scene.start("title-scene"); //,
    // B.Manager.game.stage.addChild(B.Scene),
    // F.dlog("ContinueScene.sceneRemoved() End.");
  }
}
