import AudioManager from "./audio";
import { D, i } from "./LoadScene";
import { Container, Scene } from "./TitleScene";
import { en, ja } from "./lang";

class NextButton extends Container {
  // variables
  hitGra: Phaser.GameObjects.Graphics;
  flashCover: Phaser.GameObjects.Graphics;
  actionText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y);

    var t = this;

    this.hitArea = new Phaser.GameObjects.Rectangle(
      this.scene,
      i.GAME_WIDTH - 31,
      i.GAME_HEIGHT - 12 - 20,
      31, // actionText width,
      12 // actionText height
    );

    (t.hitGra = scene.add.graphics()),
      t.hitGra.fillStyle(16711680, 0),
      t.hitGra.fillRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      t.addChild(t.hitGra),
      (t.flashCover = scene.add.graphics()),
      t.flashCover.fillStyle(16777215, 1),
      t.flashCover.fillRect(
        0,
        0,
        i.GAME_WIDTH, // t.hitGra.width,
        i.GAME_HEIGHT // t.hitGra.height
      ),
      (t.flashCover.alpha = 0),
      t.addChild(t.flashCover);

    var textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: "16px",
      fontFamily: "sans-serif",
      // fontStyle: "strong",  // DRJ - shrinks text
      color: "#ffffff",
    };

    return (
      (t.actionText = scene.add.text(0, 0, "", textStyle)),
      (t.actionText.x = i.GAME_WIDTH - t.actionText.width),
      (t.actionText.y = i.GAME_HEIGHT - t.actionText.height - 20),
      t.addChild(t.actionText),
      t
    );
  }

  castAdded() {
    this.tl = new TimelineMax({
      repeat: -1,
      yoyo: !0,
    });

    this.tl
      .to(this.actionText, 0.4, {
        delay: 0.2,
        alpha: 0,
      })
      .to(this.actionText, 0.8, {
        alpha: 1,
      });

    this.on("pointerover", this.onOver.bind(this)),
      this.on("pointerout", this.onOut.bind(this)),
      this.on("pointerdown", this.onDown.bind(this)),
      this.on("pointerupoutside", this.onOut.bind(this)),
      this.on("pointerup", this.onUp.bind(this));
  }

  removedFromScene() {
    // ie(ne(e.prototype), "castRemoved", this).call(this),
    this.tl.kill(),
      this.off("pointerover", this.onOver.bind(this)),
      this.off("pointerout", this.onOut.bind(this)),
      this.off("pointerdown", this.onDown.bind(this)),
      this.off("pointerupoutside", this.onOut.bind(this)),
      this.off("pointerup", this.onUp.bind(this));
  }

  nextPart() {
    (this.actionText.text = "Next▼"),
      (this.actionText.x = i.GAME_WIDTH - this.actionText.width - 10);
  }

  nextScene() {
    (this.actionText.text = "LET'S GO! ▶︎"),
      (this.actionText.x = i.GAME_WIDTH - this.actionText.width - 10);
  }

  onOver() {}

  onOut() {}

  onDown() {}

  onUp() {}
}

export default class AdvScene extends Scene {
  // variables
  bgSprite: Phaser.GameObjects.Sprite;
  cover: Phaser.GameObjects.TileSprite;
  feedVektor: string;
  nameBg: Phaser.GameObjects.Graphics;
  nameTxt: Phaser.GameObjects.Text;
  partNum: number;
  partText: string;
  partTextComp: boolean;
  resourceBgKey: string;
  senario: object;
  stageKey: string;
  txt: Phaser.GameObjects.Text;
  txtBg: Phaser.GameObjects.Graphics;
  nextBtn: NextButton;
  endingFlg: boolean;

  constructor() {
    super("adv-scene");

    this.senario = "ja" == i.LANG ? ja : en;

    return this;
  }

  create() {
    AudioManager.bgmPlay("adventure_bgm", 24e3, 792e3),
      (this.bgSprite = this.add.sprite().setOrigin(0)),
      (this.bgSprite.visible = !1);

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "sans-serif",
      fontSize: "16px",
      // fontStyle: "strong",  // DRJ - shrinks text
      color: "#FFFFFF",
      wordWrap: {
        width: 230,
        useAdvancedWrap: true,
      },
      padding: {
        x: 10,
        y: 10,
      },
    };

    (this.txtBg = this.add.graphics()),
      this.txtBg.lineStyle(2, 16777215, 1),
      this.txtBg.fillStyle(0),
      this.txtBg.fillRoundedRect(0, 0, i.GAME_WIDTH - 16, 180, 6),
      (this.txtBg.x = 8),
      (this.txtBg.y = i.GAME_MIDDLE + 7),
      (this.txt = this.add.text(15, i.GAME_MIDDLE + 30, " ", textStyle)),
      // this.txt.setWordWrapWidth(100, true),
      (this.nameBg = this.add.graphics()),
      this.nameBg.lineStyle(2, 16777215, 1),
      this.nameBg.fillStyle(0),
      this.nameBg.fillRoundedRect(0, 0, 80, 24, 6),
      (this.nameBg.x = 16),
      (this.nameBg.y = i.GAME_MIDDLE - 5),
      (this.nameTxt = this.add.text(0, 0, "G", textStyle)),
      (this.nameTxt.x = 50),
      (this.nameTxt.y = i.GAME_MIDDLE - 4),
      (this.nextBtn = new NextButton(this)),
      (this.nextBtn.visible = !1),
      this.addChild(this.nextBtn),
      (this.endingFlg = !1),
      5 == D.stageId
        ? (this.endingFlg = !0)
        : 4 == D.stageId
        ? (AudioManager.play("voice_thankyou"),
          D.akebonoCnt >= 4 && 0 == D.continueCnt
            ? (this.endingFlg = !1)
            : (this.endingFlg = !0))
        : (this.endingFlg = !1),
      (this.partNum = 0),
      (this.stageKey = "stage" + D.stageId),
      (this.partText = this.senario[this.stageKey].part[this.partNum].text),
      (this.feedVektor = "d"),
      (this.partTextComp = !1),
      (this.resourceBgKey =
        "advBg" +
        this.senario[this.stageKey].part[this.partNum].background +
        ".gif"),
      this.bgSprite.setTexture("game_ui", this.resourceBgKey),
      (this.bgSprite.visible = !0),
      (this.cover = this.add.tileSprite(
        0,
        this.bgSprite.height,
        i.STAGE_WIDTH,
        i.STAGE_HEIGHT - this.bgSprite.height,
        "game_asset",
        "stagebgOver.gif"
      ));
  }

  update() {
    D.frame = 59 == D.frame ? 0 : D.frame + 1;

    if (D.frame % 2 == 0 && Boolean(0) == this.partTextComp) {
      var t = this.txt.text,
        o = t.length - 1;
      o <= this.partText.length - 1
        ? (this.txt.text = t + this.partText.charAt(o))
        : ((this.partTextComp = !0),
          this.partNum < this.senario[this.stageKey].part.length - 1
            ? (this.nextBtn.nextPart(),
              (this.nextBtn.visible = !0),
              this.nextBtn.on("pointerup", this.nextPart.bind(this)))
            : (this.nextBtn.nextScene(),
              (this.nextBtn.visible = !0),
              this.nextBtn.on("pointerup", this.nextScene.bind(this))));
    }
  }

  nextPart() {
    AudioManager.play("se_cursor_sub"),
      (this.txt.text = " "),
      (this.partTextComp = !1),
      this.partNum++,
      (this.partText = this.senario[this.stageKey].part[this.partNum].text),
      (this.resourceBgKey =
        "advBg" +
        this.senario[this.stageKey].part[this.partNum].background +
        ".gif"),
      this.bgSprite.setTexture("game_ui", this.resourceBgKey),
      "advBgDone.gif" == this.resourceBgKey &&
        AudioManager.play("g_adbenture_voice0"),
      (this.nextBtn.visible = !1),
      this.nextBtn.off("pointerup");
  }

  sceneRemoved() {
    AudioManager.play("se_correct"),
      AudioManager.stop("adventure_bgm"),
      super.sceneRemoved(),
      this.endingFlg
        ? this.scene.start("gameover-scene")
        : this.scene.start("game-scene");
  }
}
