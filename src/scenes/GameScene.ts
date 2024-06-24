import { Container, Scene, Sprite, Texture } from "./TitleScene";
import { AnimatedSprite, B, D, i } from "./LoadScene";
import AudioManager from "./audio";

window.gameScene;

const PIXI = {
  Texture: {
    fromFrame: (frameKey) => frameKey,
  },
  SCALE_MODES: {
    NEAREST: Phaser.ScaleModes.NEAREST,
  },
  extras: {
    AnimatedSprite: AnimatedSprite,
  },
  Rectangle: Phaser.GameObjects.Rectangle,
  Graphics: Phaser.GameObjects.Graphics,
};

export default class GameScene extends Scene {
  // variables
  waveInterval = 80;
  waveCount;
  frameCnt;
  frameCntUp = 1;
  stageBgAmountMove = 0.7;
  enemyWaveFlg = !1;
  theWorldFlg = !1;
  sceneSwitch = 0;
  enemyHitTestList;
  itemHitTestList;
  explosionTextures: string[] = [];
  caExplosionTextures: string[] = [];
  itemTextureList: any = {};
  stageBg;
  stageEnemyPositionList: any;
  unitContainer: Container;

  constructor() {
    super("game-scene");

    window.gameScene = this;
  }

  addChildAt(gameObj, depth) {
    gameObj.setDepth(depth);
  }

  init() {
    for (var s = 0; s < 7; s++) {
      // var r = PIXI.Texture.fromFrame("explosion0" + s + ".gif");
      var r = "explosion0" + s + ".gif";
      this.explosionTextures[s] = r;
    }
    // this.caExplosionTextures = [];
    for (var h = 0; h < 8; h++) {
      // var l = PIXI.Texture.fromFrame("caExplosion0" + h + ".gif");
      var l = "caExplosion0" + h + ".gif";
      this.caExplosionTextures[h] = l;
    }
    // this.itemTextureList = {},
    (this.itemTextureList.powerupBig = ["powerupBig0.gif", "powerupBig1.gif"]),
      (this.itemTextureList.powerup3way = [
        "powerup3way0.gif",
        "powerup3way1.gif",
      ]),
      (this.itemTextureList.barrier = ["barrierItem0.gif", "barrierItem1.gif"]),
      (this.itemTextureList.speedup = ["speedupItem0.gif", "speedupItem1.gif"]);
    for (var u = [], c = 0; c < 5; c++) {
      var f = [];
      (f[0] = `stage_end${c}`), (f[1] = `stage_loop${c}`), u.push(f);
    }
    // (this.stageBg = new Bi(u)),
    (this.stageBg = new StageBg(u)), this.addChildAt(this.stageBg, 0);
    // Set up player
    var d = B.resource.recipe.data.playerData;
    return (
      (d.explosion = this.explosionTextures),
      (this.player = new M(d)),
      // this.player.on(M.CUSTOM_EVENT_DEAD, this.gameover.bind(Yi(Yi(o)))),
      // this.player.on(M.CUSTOM_EVENT_DEAD_COMPLETE, this.gameoverComplete.bind(Yi(Yi(o)))),
      (D.player = this.player),
      // Set up containers
      // this.unitContainer = new PIXI.Container,
      (this.unitContainer = new Container(window.gameScene)),
      this.addChildAt(this.unitContainer, 1),
      // this.bulletContainer = new PIXI.Container,
      (this.bulletContainer = new Container(window.gameScene)),
      this.addChildAt(this.bulletContainer, 2),
      // Set up HUD
      // this.hud = new wi,
      // this.hud.on(wi.CUSTOM_EVENT_CA_FIRE, this.caFire.bind(Yi(Yi(o)))),
      // this.addChildAt(this.hud, 3),
      // Set up title screen
      // this.title = new Oi,
      (this.title = new TitleScreen()),
      // this.title.on(Oi.EVENT_START, this.gameStart.bind(Yi(Yi(o)))),
      this.title.on(TitleScreen.EVENT_START, this.gameStart.bind(this)),
      // this.addChildAt(this.title, 4),
      // Set up cutin container
      // this.cutinCont = new Hi,
      // Set up ca line
      // this.caLine = new PIXI.Graphics,
      // this.caLine.beginFill(16711680),
      // this.caLine.drawRect(0, 0, 3, 3),
      // this.caLine.pivot.y = 3,
      // this.caLine.endFill(),
      // Set up cover
      // this.cover = new PIXI.extras.TilingSprite(PIXI.Texture.fromFrame("stagebgOver.gif"),i.STAGE_WIDTH,i.STAGE_HEIGHT),
      // this.addChildAt(this.cover, 4),
      // Set up boss
      // this.boss,
      // this.bossTimerCountDown = 99,
      // this.bossTimerFrameCnt = 0,
      // this.bossTimerStartFlg = !1,
      this
    );
  }

  create() {
    this.title.gameStart(D.stageId),
      this.stageBg.init(D.stageId),
      //   this.hud.caBtnDeactive(),
      TweenMax.delayedCall(
        2.6,
        function () {
          AudioManager.play("g_stage_voice_" + String(D.stageId)); //,
          // this.hud.caBtnActive();
        }.bind(this)
      );
    var n = B.resource.recipe.data["stage" + D.stageId].enemylist.slice();
    (this.stageEnemyPositionList = n.reverse()),
      "true" == D.shortFlg &&
        ((this.stageEnemyPositionList = []),
        this.stageEnemyPositionList.push([
          "00",
          "00",
          "A1",
          "A2",
          "A9",
          "00",
          "00",
          "00",
        ]),
        this.stageEnemyPositionList.push([
          "00",
          "00",
          "A3",
          "A3",
          "00",
          "00",
          "00",
          "00",
        ])),
      this.player.setUp(D.playerMaxHp, D.shootMode, D.shootSpeed),
      (this.player.unit.height = 64),
      (this.player.unit.width = 32),
      (this.player.unit.x = i.GAME_WIDTH / 2 - this.player.unit.width / 2),
      (this.player.unit.y = i.GAME_HEIGHT - this.player.unit.height - 30),
      (this.player.unitX = i.GAME_WIDTH / 2),
      (this.player.unitY = this.player.unit.y),
      // this.addChildAt(this.player, 2),
      // this.hud.setPercent(this.player.percent),
      // this.hud.scoreCount = D.score,
      // this.hud.highScore = D.highScore,
      // this.hud.comboCount = D.combo,
      // this.hud.maxCombo = D.maxCombo,
      // this.hud.cagageCount = D.cagage,
      // this.hud.comboTimeCnt = 0,
      // D.combo = 0,
      (this.enemyWaveFlg = !1),
      // this.theWorldFlg = !1,
      (this.waveCount = 0),
      (this.waveInterval = 80),
      (this.frameCnt = 0),
      (this.frameCntUp = 1),
      (this.enemyHitTestList = []),
      (this.itemHitTestList = []);
  }

  update(time: number, delta: number): void {
    if (!this.theWorldFlg) {
      // this.player.loop(),
      this.player.update(); //,
      // this.hud.loop();
      // enemyHitTestList
      for (var t = 0; t < this.enemyHitTestList.length; t++) {
        var o = this.enemyHitTestList[t];

        // if (!o.active) continue; // DRJ - skip current loop if not active

        // o.loop(this.stageBgAmountMove);
        o.update(this.stageBgAmountMove);
        var n = -o.unit.width / 2,
          a = i.GAME_WIDTH - o.unit.width / 2;
        if (o.unit.y >= 40 && o.unit.x >= n && o.unit.x <= a)
          for (var s = 0; s < this.player.bulletList.length; s++) {
            var r = this.player.bulletList[s];
            // if (B.Manager.interact.hitTestRectangle(o.unit, r.unit))
            if (this.physics.world.overlap(o.unit, r.unit))
              switch (this.player.shootMode) {
                case M.SHOOT_NAME_NORMAL:
                  o.onDamage(r.damage), r.onDamage(1, o.hp);
                  break;
                case M.SHOOT_NAME_BIG:
                  null == o["bulletid" + r.id]
                    ? ((o["bulletid" + r.id] = 0),
                      (o["bulletframeCnt" + r.id] = 0),
                      o.onDamage(r.damage),
                      r.onDamage(1, o.hp))
                    : (o["bulletframeCnt" + r.id]++,
                      o["bulletframeCnt" + r.id] % 15 == 0 &&
                        (o["bulletid" + r.id]++,
                        o["bulletid" + r.id] <= 1 &&
                          (o.onDamage(r.damage), r.onDamage(1, o.hp))));
                  break;
                case M.SHOOT_NAME_3WAY:
                  o.onDamage(r.damage), r.onDamage(1, o.hp);
                  break;
                default:
                  o.onDamage(1), r.onDamage(1, o.hp);
              }
          }
        if (this.player.barrierFlg)
          // B.Manager.interact.hitTestRectangle(o.unit, this.player.barrier) &&
          this.physics.world.overlap(o.unit, this.player.barrier) &&
            (this.player.barrierHitEffect(), o.dead());
        // else if (B.Manager.interact.hitTestRectangle(o.unit, this.player.unit))
        else if (this.physics.world.overlap(o.unit, this.player.unit))
          if ("goki" == o.name) {
            this.hud.caBtnDeactive(),
              (this.theWorldFlg = !0),
              this.boss && this.boss.onTheWorld(this.theWorldFlg),
              this.boss.shungokusatsu(this.player.unit, !0),
              (this.player.alpha = 0),
              (this.hud.cagaBtn.alpha = 0);
            for (var h = 0; h < this.player.bulletList.length; h++) {
              var l = this.player.bulletList[h];
              this.player.removeChild(l);
            }
            TweenMax.delayedCall(
              1.8,
              function () {
                this.player.alpha = 1;
              },
              null,
              this
            ),
              TweenMax.delayedCall(
                1.9,
                function () {
                  this.stageBg.akebonoGokifinish();
                },
                null,
                this
              ),
              TweenMax.delayedCall(
                2.7,
                function () {
                  this.playerDamage(100);
                },
                null,
                this
              ),
              TweenMax.delayedCall(
                3,
                function () {
                  this.title.akebonofinish();
                },
                null,
                this
              );
          } else this.playerDamage(1);
        (o.unit.x <= -50 ||
          o.unit.x >= i.GAME_WIDTH + 33 ||
          o.unit.y <= -33 ||
          o.unit.y >= i.GAME_HEIGHT) &&
          "boss" !== o.unit.name &&
          // (this.unitContainer.removeChild(o),
          (this.unitContainer.remove(o), this.enemyHitTestList.splice(t, 1));
      }

      // itemHitTestList
      this.stageBg.loop(this.stageBgAmountMove),
        this.enemyWaveFlg &&
          (this.frameCnt % this.waveInterval == 0 && this.enemyWave(),
          (this.frameCnt += this.frameCntUp));
    }
  }

  enemyWave() {
    this.waveCount >= this.stageEnemyPositionList.length
      ? this.bossAdd()
      : this.enemyAdd();
  }

  enemyAdd() {
    for (
      var t = this.stageEnemyPositionList[this.waveCount], e = 0;
      e < t.length;
      e++
    ) {
      var o = t[e];
      if ("00" !== o) {
        var i = String(o).substr(0, 1),
          n = String(o).substr(1, 2),
          a = B.resource.recipe.data.enemyData["enemy" + i];
        switch (((a.explosion = this.explosionTextures), n)) {
          case "1":
            (a.itemName = M.SHOOT_NAME_BIG),
              (a.itemTexture = this.itemTextureList.powerupBig);
            break;
          case "2":
            (a.itemName = M.SHOOT_NAME_3WAY),
              (a.itemTexture = this.itemTextureList.powerup3way);
            break;
          case "3":
            (a.itemName = M.SHOOT_SPEED_HIGH),
              (a.itemTexture = this.itemTextureList.speedup);
            break;
          case "9":
            (a.itemName = M.BARRIER),
              (a.itemTexture = this.itemTextureList.barrier);
            break;
          default:
            (a.itemName = null), (a.itemTexture = null);
        }
        // var s = new Ye(a);
        var s = new Enemy(a);
        (s.unit.x = 32 * e),
          (s.unit.y = -32),
          // s.on(Ye.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, s)),
          s.on(Enemy.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, s)),
          // s.on(
          //   Ye.CUSTOM_EVENT_DEAD_COMPLETE,
          //   this.enemyRemoveComplete.bind(this, s)
          // ),
          s.on(
            Enemy.CUSTOM_EVENT_DEAD_COMPLETE,
            this.enemyRemoveComplete.bind(this, s)
          ),
          // s.on(Ye.CUSTOM_EVENT_TAMA_ADD, this.tamaAdd.bind(this, s)),
          s.on(Enemy.CUSTOM_EVENT_TAMA_ADD, this.tamaAdd.bind(this, s)),
          this.unitContainer.addChild(s),
          this.enemyHitTestList.push(s);
      }
    }
    this.waveCount++;
  }

  tamaAdd(t) {
    switch (t.tamaData.name) {
      case "beam":
        for (var e = 0; e < 2; e++) {
          var o = 0 == e ? 121 : 141,
            n = new S(t.tamaData),
            a = n.character.width,
            s = n.character.height,
            r = void 0;
          switch (t.tamaData.cnt) {
            case 0:
              (r = 105),
                (n.unit.hitArea = new PIXI.Rectangle(
                  2.7 * -s,
                  a / 2 - 10,
                  s,
                  a / 2
                ));
              break;
            case 1:
              (r = 90),
                (n.unit.hitArea = new PIXI.Rectangle(-s, a / 2, s, a / 2));
              break;
            case 2:
              (r = 75),
                (n.unit.hitArea = new PIXI.Rectangle(
                  0.7 * s,
                  a / 2 - 5,
                  s,
                  a / 2
                ));
          }
          (n.character.rotation = (r * Math.PI) / 180),
            (n.rotX = Math.cos((r * Math.PI) / 180)),
            (n.rotY = Math.sin((r * Math.PI) / 180)),
            (n.unit.x = t.unit.x + o),
            (n.unit.y = t.unit.y + 50),
            n.on(S.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, n)),
            n.on(
              S.CUSTOM_EVENT_DEAD_COMPLETE,
              this.enemyRemoveComplete.bind(this, n)
            ),
            this.unitContainer.addChild(n),
            this.enemyHitTestList.push(n);
        }
        t.tamaData.cnt >= 2 ? (t.tamaData.cnt = 0) : t.tamaData.cnt++;
        break;
      case "smoke":
        var h = 60 * Math.random() + 60,
          l = new S(t.tamaData);
        (l.unit.hitArea = new PIXI.Rectangle(
          20,
          20,
          l.character.width - 40,
          l.character.height - 40
        )),
          (l.rotX = Math.cos((h * Math.PI) / 180)),
          (l.rotY = Math.sin((h * Math.PI) / 180)),
          (l.unit.x = t.unit.x + t.unit.width / 2 - 50),
          (l.unit.y = t.unit.y + 45),
          l.on(S.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, l)),
          l.on(
            S.CUSTOM_EVENT_DEAD_COMPLETE,
            this.enemyRemoveComplete.bind(this, l)
          ),
          (l.character.loop = !1),
          (l.character.onComplete = function () {
            l.character.gotoAndPlay(6);
          }.bind(this)),
          this.unitContainer.addChild(l),
          this.enemyHitTestList.push(l);
        break;
      case "meka":
        for (var u = 0; u < 32; u++) {
          var c = new S(t.tamaData);
          (c.cont = 0),
            (c.start = 10 * u),
            (c.player = this.player.unit),
            (c.unit.x = t.unit.hitArea.x + t.unit.hitArea.width / 2),
            (c.unit.y = t.unit.hitArea.y + t.unit.hitArea.height),
            c.unit.scale.set(0);
          var f = Math.random() * (i.GAME_WIDTH - 2 * t.unit.hitArea.x),
            d = Math.random() * t.unit.hitArea.height + t.unit.hitArea.y;
          TweenMax.to(c.unit, 0.3, {
            x: f,
            y: d,
          }),
            TweenMax.to(c.unit.scale, 0.3, {
              x: 1,
              y: 1,
            }),
            c.on(S.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, c)),
            c.on(
              S.CUSTOM_EVENT_DEAD_COMPLETE,
              this.enemyRemoveComplete.bind(this, c)
            ),
            this.unitContainer.addChild(c),
            this.enemyHitTestList.push(c);
        }
        break;
      case "psychoField":
        for (var p = 0; p < 72; p++) {
          var m = new S(t.tamaData);
          (m.rotX = Math.cos(((p / 72) * 360 * Math.PI) / 180)),
            (m.rotY = Math.sin(((p / 72) * 360 * Math.PI) / 180)),
            (m.unit.x =
              50 * m.rotX +
              t.unit.x +
              t.unit.hitArea.width / 2 +
              m.unit.width / 2),
            (m.unit.y = 50 * m.rotY + t.unit.y + t.unit.hitArea.height / 2),
            m.on(S.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, m)),
            m.on(
              S.CUSTOM_EVENT_DEAD_COMPLETE,
              this.enemyRemoveComplete.bind(this, m)
            ),
            this.unitContainer.addChild(m),
            this.enemyHitTestList.push(m);
        }
        break;
      default:
        // var y = new S(t.tamaData);
        var y = new Bullet(t.tamaData);
        (y.unit.x = t.unit.x + t.unit.width / 2 - y.unit.width / 2),
          (y.unit.y = t.unit.y + t.unit.hitArea.height / 2),
          // y.on(S.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, y)),
          y.on(Bullet.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, y)),
          y.on(
            // S.CUSTOM_EVENT_DEAD_COMPLETE,
            Bullet.CUSTOM_EVENT_DEAD_COMPLETE,
            this.enemyRemoveComplete.bind(this, y)
          ),
          this.unitContainer.addChild(y),
          this.enemyHitTestList.push(y);
    }
  }

  tamaAllRemove() {}

  enemyRemove(t) {
    if (
      // ((this.hud.comboCount = 1),
      // (this.hud.scoreCount = t.score),
      // (this.hud.cagageCount = t.cagage),
      // this.hud.scoreView(t),
      t.itemName //)
    ) {
      // var e = new Xe(t.itemTexture);
      var e = new Item(t.itemTexture);
      (e.x = t.unit.x),
        (e.y = t.unit.y),
        (e.name = t.itemName),
        this.unitContainer.addChild(e),
        this.itemHitTestList.push(e);
    }
    for (var o = 0; o < this.enemyHitTestList.length; o++)
      t == this.enemyHitTestList[o] && this.enemyHitTestList.splice(o, 1);
  }

  enemyRemoveComplete(t) {
    t.off(Enemy.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this)),
      t.off(
        Enemy.CUSTOM_EVENT_DEAD_COMPLETE,
        this.enemyRemoveComplete.bind(this)
      ),
      t.off(Enemy.CUSTOM_EVENT_TAMA_ADD, this.tamaAdd.bind(this)),
      this.unitContainer.removeChild(t);
  }

  bossAdd() {
    if (3 == D.stageId && 0 == D.continueCnt) {
      ((o = B.resource.recipe.data.bossData["boss" + D.stageId]).explosion =
        this.explosionTextures),
        (o.gokiFlg = !0),
        (o.continueCnt = D.continueCnt);
      var t = new Eo(o);
      t.on(
        Eo.CUSTOM_EVENT_GOKI,
        function e() {
          (this.theWorldFlg = !0), this.hud.caBtnDeactive();
          for (var o = 0; o < this.player.bulletList.length; o++) {
            var n = this.player.bulletList[o];
            this.player.bulletRemove(n), this.player.bulletRemoveComplete(n);
          }
          this.boss.toujou();
          var a = new TimelineMax();
          a.to(this.boss.unit, 1, {
            x: i.GAME_CENTER + this.boss.width / 4,
          }),
            a.addCallback(
              function () {
                this.boss.shungokusatsu(t.unit),
                  (this.hud.cagaBtn.alpha = 0),
                  (this.player.alpha = 0);
                for (var e = 0; e < this.player.bulletList.length; e++) {
                  var o = this.player.bulletList[e];
                  this.player.removeChild(o);
                }
              },
              "+=1.5",
              null,
              this
            ),
            a.addCallback(
              function () {
                (this.hud.cagaBtn.alpha = 1),
                  (this.player.alpha = 1),
                  t.off(Eo.CUSTOM_EVENT_GOKI, e.bind(this)),
                  (t.hp = 0),
                  t.dead();
                for (var o = 0; o < this.enemyHitTestList.length; o++)
                  this.enemyHitTestList[o] == t &&
                    this.enemyHitTestList.splice(o, 1);
                g.stop(this.stageBgmName);
                var n =
                  "boss_" +
                  B.resource.recipe.data.bossData.bossExtra.name +
                  "_bgm_info";
                this.stageBgmName = i[n].name;
                var a = i[n].start,
                  s = i[n].end;
                g.bgmPlay(this.stageBgmName, a, s);
              },
              "+=2.3",
              null,
              this
            ),
            a.to(
              this.boss.unit,
              1,
              {
                x: i.GAME_CENTER - this.boss.width / 2,
              },
              "+=1.5"
            ),
            a.addCallback(
              function () {
                this.unitContainer.removeChild(t),
                  this.enemyHitTestList.push(this.boss),
                  (this.theWorldFlg = !1),
                  this.hud.caBtnActive(),
                  this.boss.shootStart();
              },
              "+=1",
              null,
              this
            );
        }.bind(this)
      ),
        this.enemyHitTestList.push(t),
        this.unitContainer.addChild(t);
      var e = B.resource.recipe.data.bossData.bossExtra;
      (e.explosion = this.explosionTextures),
        (e.continueCnt = D.continueCnt),
        (this.boss = new Ro(e)),
        this.boss.on(
          Ze.CUSTOM_EVENT_DEAD,
          this.bossRemove.bind(this, this.boss)
        ),
        this.boss.on(
          Ze.CUSTOM_EVENT_TAMA_ADD,
          this.tamaAdd.bind(this, this.boss)
        ),
        this.unitContainer.addChild(this.boss),
        (this.boss.unit.x = i.GAME_WIDTH),
        (this.boss.unit.y = i.GAME_HEIGHT / 4);
    } else {
      var o;
      switch (
        (((o = B.resource.recipe.data.bossData["boss" + D.stageId]).explosion =
          this.explosionTextures),
        D.stageId)
      ) {
        case 0:
          // this.boss = new so(o);
          console.log("boss 0");
          break;
        case 1:
          this.boss = new po(o);
          break;
        case 2:
          this.boss = new wo(o);
          break;
        case 3:
          (o.gokiFlg = !1), (this.boss = new Eo(o));
          break;
        case 4:
          this.boss = new Wo(o);
      }
      // this.boss.on(Ze.CUSTOM_EVENT_DEAD, this.bossRemove.bind(this, this.boss)),
      //   this.boss.on(
      //     Ze.CUSTOM_EVENT_TAMA_ADD,
      //     this.tamaAdd.bind(this, this.boss)
      //   ),
      //   this.enemyHitTestList.push(this.boss),
      //   this.unitContainer.addChild(this.boss);
    }
    // (this.timeTxt = new PIXI.Sprite(PIXI.Texture.fromFrame("timeTxt.gif"))),
    //   (this.timeTxt.x = i.GAME_CENTER - this.timeTxt.width),
    //   (this.timeTxt.y = 58),
    //   (this.timeTxt.alpha = 0),
    //   this.unitContainer.addChild(this.timeTxt),
    //   (this.bigNumTxt = new qt(2)),
    //   (this.bigNumTxt.x = this.timeTxt.x + this.timeTxt.width + 3),
    //   (this.bigNumTxt.y = this.timeTxt.y - 2),
    //   this.bigNumTxt.setNum(99),
    //   (this.bigNumTxt.alpha = 0),
    //   this.unitContainer.addChild(this.bigNumTxt),
    //   TweenMax.to([this.bigNumTxt, this.timeTxt], 0.2, {
    //     delay: 6,
    //     alpha: 1,
    //     onComplete: function () {
    //       (this.bossTimerCountDown = 99),
    //         (this.bossTimerFrameCnt = 0),
    //         (this.bossTimerStartFlg = !0);
    //     },
    //     onCompleteScope: this,
    //   }),
    (this.enemyWaveFlg = !1), this.stageBg.bossScene();
  }

  playerDamage(t) {
    new TimelineMax()
      .call(
        function () {
          (this.x = 4), (this.y = -2);
        },
        null,
        this,
        "+=0.0"
      )
      .call(
        function () {
          (this.x = -3), (this.y = 1);
        },
        null,
        this,
        "+=0.08"
      )
      .call(
        function () {
          (this.x = 2), (this.y = -1);
        },
        null,
        this,
        "+=0.07"
      )
      .call(
        function () {
          (this.x = -2), (this.y = 1);
        },
        null,
        this,
        "+=0.05"
      )
      .call(
        function () {
          (this.x = 1), (this.y = 1);
        },
        null,
        this,
        "+=0.05"
      )
      .call(
        function () {
          (this.x = 0), (this.y = 0);
        },
        null,
        this,
        "+=0.04"
      ),
      this.player.onDamage(t); //,
    // this.hud.onDamage(this.player.percent);
  }

  gameStart() {
    // F.dlog("GameScene.gameStart()."),
    (this.enemyWaveFlg = !0), this.player.shootStart();
  }
}

function n(t) {
  return (n =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        })(t);
}

function a(t, e) {
  for (var o = 0; o < e.length; o++) {
    var i = e[o];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(t, i.key, i);
  }
}

function s(t, e) {
  return !e || ("object" !== n(e) && "function" != typeof e)
    ? (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t)
    : e;
}

function r(t) {
  return (r = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
}

function h(t, e) {
  return (h =
    Object.setPrototypeOf ||
    function (t, e) {
      return (t.__proto__ = e), t;
    })(t, e);
}

var l = (function (t) {
  function e(t) {
    var o;
    return (
      (function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, e),
      ((o = s(this, r(e).call(this))).id = t),
      // .on('addedtoscene', fn) is NOT being called
      o.on("added", o.atCastAdded),
      o.on("removed", o.atCastRemoved),
      o
    );
  }
  var o, i, n;
  return (
    (function (t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0,
        },
      })),
        e && h(t, e);
      // }(e, PIXI.Container),
    })(e, Container),
    (o = e),
    (i = [
      {
        key: "atCastAdded",
        value: function (t) {
          this.parentNode, this.castAdded();
        },
      },
      {
        key: "atCastRemoved",
        value: function (t) {
          this.parentNode, this.castRemoved();
        },
      },
      {
        key: "castAdded",
        value: function () {},
      },
      {
        key: "castRemoved",
        value: function () {},
      },
    ]) && a(o.prototype, i),
    n && a(o, n),
    e
  );
})();

function u(t) {
  return (u =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        })(t);
}

function c(t, e) {
  return !e || ("object" !== u(e) && "function" != typeof e)
    ? (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t)
    : e;
}

function f(t) {
  return (f = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
}

function d(t, e) {
  for (var o = 0; o < e.length; o++) {
    var i = e[o];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(t, i.key, i);
  }
}

function p(t, e, o) {
  return e && d(t.prototype, e), o && d(t, o), t;
}

function m(t, e) {
  return (m =
    Object.setPrototypeOf ||
    function (t, e) {
      return (t.__proto__ = e), t;
    })(t, e);
}

var y = (function (t) {
  function e(t, o) {
    var i;
    if (
      ((function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, e),
      ((i = c(this, f(e).call(this))).shadowReverse = !0),
      (i.speed = 0),
      (i.hp = 1),
      (i.deadFlg = !1),
      // i.character = new PIXI.extras.AnimatedSprite(t),
      (i.character = new PIXI.extras.AnimatedSprite(
        window.gameScene,
        t,
        "game_asset"
      )),
      (i.character.animationSpeed = 0.1),
      // i.unit = new PIXI.Container,
      (i.unit = new Container(window.gameScene)),
      (i.unit.interactive = !0),
      (i.unit.name = "unit"),
      // i.unit.hitArea = new PIXI.Rectangle(0,0,i.character.width,i.character.height),
      (i.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        0,
        0,
        i.character.width,
        i.character.height
      )),
      (i.shadowOffsetY = 0),
      // i.shadow = new PIXI.extras.AnimatedSprite(t),
      (i.shadow = new PIXI.extras.AnimatedSprite(
        window.gameScene,
        t,
        "game_asset"
      )),
      (i.shadow.animationSpeed = 0.1),
      (i.shadow.tint = 0),
      (i.shadow.alpha = 0.5),
      void 0 !== o)
    ) {
      // i.explosion = new PIXI.extras.AnimatedSprite(o);
      i.explosion = new PIXI.extras.AnimatedSprite(
        window.gameScene,
        o,
        "game_asset",
        true
      );
      var n = (i.unit.height + 50) / i.explosion.height;
      n >= 1 && (n = 1),
        // i.explosion.scale.set(n + .2),
        i.explosion.setScale(n + 0.2),
        (i.explosion.animationSpeed = 0.4),
        (i.explosion.loop = !1);
    }
    return (
      i.addChild(i.unit),
      i.unit.addChild(i.shadow),
      i.unit.addChild(i.character),
      i
    );
  }
  return (
    (function (t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0,
        },
      })),
        e && m(t, e);
    })(e, l),
    p(e, null, [
      {
        key: "CUSTOM_EVENT_DEAD",
        get: function () {
          return "customEventdead";
        },
      },
      {
        key: "CUSTOM_EVENT_DEAD_COMPLETE",
        get: function () {
          return "customEventdeadComplete";
        },
      },
      {
        key: "CUSTOM_EVENT_TAMA_ADD",
        get: function () {
          return "customEventtamaadd";
        },
      },
    ]),
    p(e, [
      {
        key: "castAdded",
        value: function (t) {
          this.scene.time.addEvent({
            callback: () => {
              if (!this.character.active) return; // DRJ
              this.character.play(),
                this.shadow.play(),
                "true" == D.hitAreaFlg &&
                  ((this.hitbox = new PIXI.Graphics()),
                  this.hitbox.lineStyle(1, 16773120),
                  this.hitbox.drawRect(
                    this.unit.hitArea.x,
                    this.unit.hitArea.y,
                    this.unit.hitArea.width,
                    this.unit.hitArea.height
                  ),
                  this.unit.addChild(this.hitbox)),
                this.shadowReverse
                  ? ((this.shadow.scaleY = -1),
                    (this.shadow.y =
                      2 * this.shadow.height - this.shadowOffsetY))
                  : (this.shadow.y = this.shadow.height - this.shadowOffsetY);
            },
          });
        },
      },
      {
        key: "castRemoved",
        value: function (t) {
          this.character.destroy(),
            this.shadow.destroy(),
            this.unit.removeChild(this.shadow),
            this.unit.removeChild(this.character),
            this.removeChild(this.unit);
        },
      },
    ]),
    e
  );
})();

// Bullet
class Bullet extends y.prototype.constructor {
  constructor(t) {
    super(t.texture, t.explosion),
      (this.name = t.name),
      (this.unit.name = t.name),
      (this.damage = t.damage),
      (this.speed = t.speed),
      (this.hp = t.hp),
      (this.score = t.score),
      (this.cagage = t.cagage),
      (this.guardTexture = t.guard),
      (this.deadFlg = !1),
      (this.shadow.visible = !1); //,
    // (this.unit.hitArea = new PIXI.Rectangle(
    //   window.gameScene,
    //   0,
    //   0,
    //   this.unit.width,
    //   this.unit.height
    // ));
  }

  update() {
    this.rotX
      ? ((this.unit.x += this.rotX * this.speed),
        (this.unit.y += this.rotY * this.speed))
      : "meka" == this.name
      ? (this.cont++,
        this.cont >= this.start &&
          (this.targetX || (this.targetX = this.player.x),
          (this.unit.x += 0.009 * (this.targetX - this.unit.x)),
          (this.unit.y += Math.cos(this.cont / 5) + 2.5 * this.speed)))
      : (this.unit.y += this.speed);
  }

  onDamage(t, e) {
    this.deadFlg ||
      ((this.hp -= t),
      this.hp <= 0
        ? (this.dead.bind(this)(e), (this.deadFlg = !0))
        : (TweenMax.to(this.character, 0.1, {
            tint: 16711680,
          }),
          TweenMax.to(this.character, 0.1, {
            delay: 0.1,
            tint: 16777215,
          }))),
      void 0 !== this.explosion &&
        // ((this.explosion.onComplete = function (t) {
        (this.explosion.on(
          "animationcomplete",
          function (t) {
            this.removeChild(t);
          }.bind(this, this.explosion)
        ),
        (this.explosion.x =
          this.unit.x + this.unit.width / 2 - this.explosion.width / 2),
        (this.explosion.y =
          this.unit.y + this.unit.height / 2 - this.explosion.height / 2 - 10),
        "infinity" == e && (this.explosion.textures = this.guardTexture),
        this.addChild(this.explosion),
        this.explosion.play()),
      "infinity" == e
        ? (AudioManager.stop("se_guard"), AudioManager.play("se_guard"))
        : this.name == M.SHOOT_NAME_NORMAL || this.name == M.SHOOT_NAME_3WAY
        ? (AudioManager.stop("se_damage"), AudioManager.play("se_damage"))
        : this.name == M.SHOOT_NAME_BIG &&
          (AudioManager.stop("se_damage"), AudioManager.play("se_damage"));
  }

  dead(t) {
    this.emit(y.CUSTOM_EVENT_DEAD),
      this.unit.removeChild(this.character),
      this.unit.removeChild(this.shadow),
      this.removeChild(this.unit),
      void 0 !== this.explosion &&
        // ((this.explosion.onComplete = this.explosionComplete.bind(this)),
        (this.explosion.on(
          "animationcomplete",
          this.explosionComplete.bind(this)
        ),
        (this.explosion.x =
          this.unit.x + this.unit.width / 2 - this.explosion.width / 2),
        (this.explosion.y =
          this.unit.y + this.unit.height / 2 - this.explosion.height / 2 - 10),
        this.addChild(this.explosion),
        this.explosion.play());
  }

  explosionComplete() {
    this.removeChild(this.explosion),
      this.explosion.destroy(),
      this.emit(y.CUSTOM_EVENT_DEAD_COMPLETE);
  }

  addedToScene(gameObject, scene) {
    super.castAdded(gameObject);
  }

  removedFromScene(t) {
    if (t.parentContainer) {
      // DRJ::TODO - fix ugly hack
      if (t.explosion.frame.name == "hit4.gif") {
        t.explosion.destroy(true);
      }

      t.parentContainer.remove(t);
    }

    super.castRemoved(t);
    if (this.scene) this.scene.sys.displayList.remove(t); // DRJ - remove me?
  }
}

// var S = function(t) {
//   function e(t) {
//       var o;
//       return function(t, e) {
//           if (!(t instanceof e))
//               throw new TypeError("Cannot call a class as a function")
//       }(this, e),
//       (o = _(this, x(e).call(this, t.texture, t.explosion))).name = t.name,
//       o.unit.name = t.name,
//       o.damage = t.damage,
//       o.speed = t.speed,
//       o.hp = t.hp,
//       o.score = t.score,
//       o.cagage = t.cagage,
//       o.guardTexture = t.guard,
//       o.deadFlg = !1,
//       o.shadow.visible = !1,
//       o.unit.hitArea = new PIXI.Rectangle(0,0,o.unit.width,o.unit.height),
//       o
//   }
//   var o, i, n;
//   return function(t, e) {
//       if ("function" != typeof e && null !== e)
//           throw new TypeError("Super expression must either be null or a function");
//       t.prototype = Object.create(e && e.prototype, {
//           constructor: {
//               value: t,
//               writable: !0,
//               configurable: !0
//           }
//       }),
//       e && T(t, e)
//   }(e, y),
//   o = e,
//   (i = [{
//       key: "loop",
//       value: function() {
//           this.rotX ? (this.unit.x += this.rotX * this.speed,
//           this.unit.y += this.rotY * this.speed) : "meka" == this.name ? (this.cont++,
//           this.cont >= this.start && (this.targetX || (this.targetX = this.player.x),
//           this.unit.x += .009 * (this.targetX - this.unit.x),
//           this.unit.y += Math.cos(this.cont / 5) + 2.5 * this.speed)) : this.unit.y += this.speed
//       }
//   }, {
//       key: "onDamage",
//       value: function(t, e) {
//           this.deadFlg || (this.hp -= t,
//           this.hp <= 0 ? (this.dead.bind(this)(e),
//           this.deadFlg = !0) : (TweenMax.to(this.character, .1, {
//               tint: 16711680
//           }),
//           TweenMax.to(this.character, .1, {
//               delay: .1,
//               tint: 16777215
//           }))),
//           void 0 !== this.explosion && (this.explosion.onComplete = function(t) {
//               this.removeChild(t)
//           }
//           .bind(this, this.explosion),
//           this.explosion.x = this.unit.x + this.unit.width / 2 - this.explosion.width / 2,
//           this.explosion.y = this.unit.y + this.unit.height / 2 - this.explosion.height / 2 - 10,
//           "infinity" == e && (this.explosion.textures = this.guardTexture),
//           this.addChild(this.explosion),
//           this.explosion.play()),
//           "infinity" == e ? (g.stop("se_guard"),
//           g.play("se_guard")) : this.name == M.SHOOT_NAME_NORMAL || this.name == M.SHOOT_NAME_3WAY ? (g.stop("se_damage"),
//           g.play("se_damage")) : this.name == M.SHOOT_NAME_BIG && (g.stop("se_damage"),
//           g.play("se_damage"))
//       }
//   }, {
//       key: "dead",
//       value: function(t) {
//           this.emit(y.CUSTOM_EVENT_DEAD),
//           this.unit.removeChild(this.character),
//           this.unit.removeChild(this.shadow),
//           this.removeChild(this.unit),
//           void 0 !== this.explosion && (this.explosion.onComplete = this.explosionComplete.bind(this),
//           this.explosion.x = this.unit.x + this.unit.width / 2 - this.explosion.width / 2,
//           this.explosion.y = this.unit.y + this.unit.height / 2 - this.explosion.height / 2 - 10,
//           this.addChild(this.explosion),
//           this.explosion.play())
//       }
//   }, {
//       key: "explosionComplete",
//       value: function() {
//           this.removeChild(this.explosion),
//           this.explosion.destroy(),
//           this.emit(y.CUSTOM_EVENT_DEAD_COMPLETE)
//       }
//   }, {
//       key: "castAdded",
//       value: function(t) {
//           w(x(e.prototype), "castAdded", this).call(this)
//       }
//   }, {
//       key: "castRemoved",
//       value: function(t) {
//           w(x(e.prototype), "castRemoved", this).call(this)
//       }
//   }]) && v(o.prototype, i),
//   n && v(o, n),
//   e
// }();

// returns the type of the value passed as an argument, with special handling for Symbol instances
function C(t) {
  return (C =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        })(t);
}

function k(t, e) {
  return !e || ("object" !== C(e) && "function" != typeof e)
    ? (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t)
    : e;
}

function O(t) {
  return (O = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
}

// define properties on an object with specific attributes
function E(t, e) {
  // loops through each element in the e array and defines a property on the t object using Object.defineProperty()
  for (var o = 0; o < e.length; o++) {
    var i = e[o];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      // If the property descriptor has a value property, the writable property is set to true
      "value" in i && (i.writable = !0),
      Object.defineProperty(t, i.key, i);
  }
}
function P(t, e, o) {
  // if e is truthy, add properties to the prototype of t
  return (
    e && E(t.prototype, e),
    // add properties to t if o is truthy
    o && E(t, o),
    t
  );
}

function A(t, e) {
  return (A =
    Object.setPrototypeOf ||
    function (t, e) {
      return (t.__proto__ = e), t;
    })(t, e);
}

// Player
var M = (function (t) {
  function e(t) {
    var o;
    if (
      ((function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, e),
      "object" !== C(t.texture[0]))
    ) {
      for (var n = 0; n < t.texture.length; n++) {
        (a = t.texture[n]), (t.texture[n] = a);
      }
      for (n = 0; n < t.shootNormal.texture.length; n++) {
        (a = t.shootNormal.texture[n]), (t.shootNormal.texture[n] = a);
      }
      for (n = 0; n < t.shootBig.texture.length; n++) {
        (a = t.shootBig.texture[n]), (t.shootBig.texture[n] = a);
      }
      for (n = 0; n < t.barrier.texture.length; n++) {
        var a;
        (a = t.barrier.texture[n]), (t.barrier.texture[n] = a);
      }
      (t.barrierEffectTexture = "barrierEffect.gif"),
        (t.hit = ["hit0.gif", "hit1.gif", "hit2.gif", "hit3.gif", "hit4.gif"]),
        (t.guard = [
          "guard0.gif",
          "guard1.gif",
          "guard2.gif",
          "guard3.gif",
          "guard4.gif",
        ]);
    }
    return (
      ((o = k(this, O(e).call(this, t.texture, t.explosion))).unit.name =
        t.name),
      (o.hp = t.hp),
      (o.maxHp = t.maxHp),
      (o.shootNormalData = t.shootNormal),
      (o.shootNormalData.texture = t.shootNormal.texture),
      (o.shootNormalData.explosion = t.hit),
      (o.shootNormalData.guard = t.guard),
      (o.shootBigData = t.shootBig),
      (o.shootBigData.texture = t.shootBig.texture),
      (o.shootBigData.explosion = t.hit),
      (o.shootBigData.guard = t.guard),
      (o.shoot3wayData = t.shoot3way),
      (o.shoot3wayData.texture = t.shootNormal.texture),
      (o.shoot3wayData.explosion = t.hit),
      (o.shoot3wayData.guard = t.guard),
      // o.barrier = new PIXI.extras.AnimatedSprite(t.barrier.texture),
      (o.barrier = new PIXI.extras.AnimatedSprite(
        window.gameScene,
        t.barrier.texture,
        "game_asset"
      )),
      (o.barrier.animationSpeed = 0.15),
      // o.barrier.hitArea = new PIXI.Rectangle(2,2,o.barrier.width,o.barrier.height),
      (o.barrier.hitArea = new PIXI.Rectangle(
        window.gameScene,
        2,
        2,
        o.barrier.width,
        o.barrier.height
      )),
      (o.barrier.interactive = !1),
      (o.barrier.buttonMode = !1),
      // o.barrier.play(),
      (o.barrier.visible = !1),
      // o.barrierEffect = new PIXI.Sprite(t.barrierEffectTexture),
      (o.barrierEffect = new Sprite(
        window.gameScene,
        0,
        0,
        "game_asset",
        t.barrierEffectTexture
      )),
      (o.barrierEffect.visible = !1),
      (o.barrierEffect.interactive = !1),
      (o.barrierEffect.buttonMode = !1),
      // o.barrierEffect.anchor.set(.5),
      o.barrierEffect.setOrigin(0.5),
      (o.shootOn = 0),
      (o.bulletList = []),
      (o.bulletFrameCnt = 0),
      (o.bulletIdCnt = 0),
      (o.shootSpeed = 0),
      (o.shootInterval = 0),
      (o.shootData = {}),
      o.shootMode,
      (o._percent = 0),
      (o.unitX = 0),
      (o.unitY = 0),
      // o.unit.hitArea = new PIXI.Rectangle(7,20,o.unit.width - 14,o.unit.height - 40),
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        7,
        20,
        // DRJ::TODO - fix this nastiness
        // o.unit.width - 14,
        // o.unit.height - 40
        o.unit.width + 14,
        o.unit.height + 40
      )),
      (o.character.animationSpeed = 0.35),
      (o.shadow.animationSpeed = 0.35),
      (o.shadowOffsetY = 5),
      (o.damageAnimationFlg = !1),
      (o.barrierFlg = !1),
      (o.screenDragFlg = !1),
      (o.beforeX = 0),
      (o.beforeY = 0),
      (o.keyDownFlg = !1),
      (o.keyDownCode = ""),
      // o.dragAreaRect = new PIXI.Graphics,
      (o.dragAreaRect = new PIXI.Graphics(window.gameScene)),
      // o.dragAreaRect.beginFill(16777215, 0),
      o.dragAreaRect.fill(16777215, 0),
      // o.dragAreaRect.drawRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      o.dragAreaRect.fillRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      // o.dragAreaRect.endFill(),
      // o.dragAreaRect.interactive = !0,
      o.dragAreaRect.setInteractive(),
      o
    );
  }
  return (
    (function (t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0,
        },
      })),
        e && A(t, e);
    })(e, y),
    // // add array of properties to e
    // these properties get added to the prototype.constructor
    P(e, null, [
      {
        key: "SHOOT_NAME_NORMAL",
        get: function () {
          return "normal";
        },
      },
      {
        key: "SHOOT_NAME_BIG",
        get: function () {
          return "big";
        },
      },
      {
        key: "SHOOT_NAME_3WAY",
        get: function () {
          return "3way";
        },
      },
      {
        key: "SHOOT_SPEED_NORMAL",
        get: function () {
          return "speed_normal";
        },
      },
      {
        key: "SHOOT_SPEED_HIGH",
        get: function () {
          return "speed_high";
        },
      },
      {
        key: "BARRIER",
        get: function () {
          return "barrier";
        },
      },
    ]),
    // these properties get added to the prototype
    P(e, [
      {
        key: "onScreenDragStart",
        value: function (t) {
          (this.unitX =
            B.Manager.game.renderer.plugins.interaction.eventData.data.global.x),
            (this.screenDragFlg = !0);
        },
      },
      {
        key: "onScreenDragMove",
        value: function (t) {
          this.screenDragFlg &&
            ((this.unitX =
              B.Manager.game.renderer.plugins.interaction.eventData.data.global.x),
            this.unitX <= this.unit.hitArea.width / 2 &&
              (this.unitX = this.unit.hitArea.width / 2),
            this.unitX >= i.GAME_WIDTH - this.unit.hitArea.width / 2 &&
              (this.unitX = i.GAME_WIDTH - this.unit.hitArea.width / 2));
        },
      },
      {
        key: "onScreenDragEnd",
        value: function (t) {
          this.screenDragFlg = !1;
        },
      },
      {
        key: "onKeyDown",
        value: function (t) {
          (this.keyDownFlg = !0),
            (this.keyDownCode = t.keyCode),
            t.preventDefault();
        },
      },
      {
        key: "onKeyUp",
        value: function (t) {
          (this.keyDownFlg = !1), t.preventDefault();
        },
      },
      {
        // key: "loop",
        key: "update",
        value: function () {
          if (this.keyDownFlg) {
            switch (this.keyDownCode) {
              case 37:
                this.unitX -= 6;
                break;
              case 39:
                this.unitX += 6;
            }
            // this.unitX <= this.unit.input.hitArea.width / 2 &&
            //   (this.unitX = this.unit.input.hitArea.width / 2),
            //   this.unitX >= i.GAME_WIDTH - this.unit.input.hitArea.width / 2 &&
            //     (this.unitX = i.GAME_WIDTH - this.unit.input.hitArea.width / 2);
            this.unitX <= this.unit.hitArea.width / 2 &&
              (this.unitX = this.unit.hitArea.width / 2),
              this.unitX >= i.GAME_WIDTH - this.unit.hitArea.width / 2 &&
                (this.unitX = i.GAME_WIDTH - this.unit.hitArea.width / 2);
          }
          (this.unit.x +=
            0.09 * (this.unitX - (this.unit.x + this.unit.width / 2))),
            (this.unit.y += 0.09 * (this.unitY - this.unit.y)),
            (this.barrier.x =
              this.unit.x + this.unit.width / 2 - this.barrier.width / 2),
            (this.barrier.y = this.unit.y - 15),
            this.bulletFrameCnt++,
            this.shootOn &&
              this.bulletFrameCnt % (this.shootInterval - this.shootSpeed) ==
                0 &&
              this.shoot();
          for (var t = 0; t < this.bulletList.length; t++) {
            var e = this.bulletList[t];
            (e.unit.x += 3.5 * Math.cos(e.unit.rotation)),
              (e.unit.y += 3.5 * Math.sin(e.unit.rotation)),
              (e.unit.y <= 40 ||
                e.unit.x <= -e.unit.width ||
                e.unit.x >= i.GAME_WIDTH) &&
                (this.bulletRemove(e), this.bulletRemoveComplete(e));
          }
        },
      },
      {
        key: "shoot",
        value: function () {
          switch (this.shootMode) {
            case e.SHOOT_NAME_NORMAL:
              // ((o = new S(this.shootNormalData)).unit.rotation =
              ((o = new Bullet(this.shootNormalData)).unit.rotation =
                (270 * Math.PI) / 180),
                (o.unit.x = this.unit.x + 5 * Math.sin(o.unit.rotation) + 14),
                (o.unit.y = this.unit.y + 5 * Math.sin(o.unit.rotation) + 11),
                (o.name = e.SHOOT_NAME_NORMAL),
                (o.id = this.bulletIdCnt++),
                (o.shadowReverse = !1),
                (o.shadowOffsetY = 0),
                o.on(y.CUSTOM_EVENT_DEAD, this.bulletRemove.bind(this, o)),
                o.on(
                  y.CUSTOM_EVENT_DEAD_COMPLETE,
                  this.bulletRemoveComplete.bind(this, o)
                ),
                this.addChild(o),
                this.bulletList.push(o),
                AudioManager.stop("se_shoot"),
                AudioManager.play("se_shoot");
              break;
            case e.SHOOT_NAME_BIG:
              // ((o = new S(this.shootBigData)).unit.rotation =
              ((o = new Bullet(this.shootBigData)).unit.rotation =
                (270 * Math.PI) / 180),
                (o.unit.x = this.unit.x + 5 * Math.sin(o.unit.rotation) + 10),
                (o.unit.y = this.unit.y + 5 * Math.sin(o.unit.rotation) + 22),
                (o.name = e.SHOOT_NAME_BIG),
                (o.id = this.bulletIdCnt++),
                (o.shadowReverse = !1),
                (o.shadowOffsetY = 0),
                o.on(y.CUSTOM_EVENT_DEAD, this.bulletRemove.bind(this, o)),
                o.on(
                  y.CUSTOM_EVENT_DEAD_COMPLETE,
                  this.bulletRemoveComplete.bind(this, o)
                ),
                this.addChild(o),
                this.bulletList.push(o),
                AudioManager.stop("se_shoot_b"),
                AudioManager.play("se_shoot_b");
              break;
            case e.SHOOT_NAME_3WAY:
              for (var t = 0; t < 3; t++) {
                // var o = new S(this.shoot3wayData);
                var o = new Bullet(this.shoot3wayData);
                0 == t
                  ? ((o.unit.rotation = (280 * Math.PI) / 180),
                    (o.unit.x =
                      this.unit.x + 5 * Math.cos(o.unit.rotation) + 14),
                    (o.unit.y =
                      this.unit.y + 5 * Math.sin(o.unit.rotation) + 11))
                  : 1 == t
                  ? ((o.unit.rotation = (270 * Math.PI) / 180),
                    (o.unit.x =
                      this.unit.x + 5 * Math.cos(o.unit.rotation) + 10),
                    (o.unit.y =
                      this.unit.y + 5 * Math.sin(o.unit.rotation) + 11))
                  : 2 == t &&
                    ((o.unit.rotation = (260 * Math.PI) / 180),
                    (o.unit.x =
                      this.unit.x + 5 * Math.cos(o.unit.rotation) + 6),
                    (o.unit.y =
                      this.unit.y + 5 * Math.sin(o.unit.rotation) + 11)),
                  (o.id = this.bulletIdCnt++),
                  (o.shadowReverse = !1),
                  (o.shadowOffsetY = 0),
                  o.on(y.CUSTOM_EVENT_DEAD, this.bulletRemove.bind(this, o)),
                  o.on(
                    y.CUSTOM_EVENT_DEAD_COMPLETE,
                    this.bulletRemoveComplete.bind(this, o)
                  ),
                  this.addChild(o),
                  this.bulletList.push(o);
              }
              AudioManager.stop("se_shoot"), AudioManager.play("se_shoot");
          }
        },
      },
      {
        key: "bulletRemove",
        value: function (t) {
          for (var e = 0; e < this.bulletList.length; e++)
            t.id == this.bulletList[e].id && this.bulletList.splice(e, 1);
        },
      },
      {
        key: "bulletRemoveComplete",
        value: function (t) {
          t.off(y.CUSTOM_EVENT_DEAD, this.bulletRemove.bind(this, t)),
            t.off(
              y.CUSTOM_EVENT_DEAD_COMPLETE,
              this.bulletRemoveComplete.bind(this, t)
            ),
            // this.removeChild(t);
            // this.remove(t, true);
            this.scene.sys.displayList.remove(t); // DRJ
        },
      },
      {
        key: "shootModeChange",
        value: function (t) {
          switch (((this.shootMode = t), this.shootMode)) {
            case e.SHOOT_NAME_NORMAL:
              (this.shootData = this.shootNormalData),
                (this.shootInterval = this.shootData.interval);
              break;
            case e.SHOOT_NAME_BIG:
              (this.shootData = this.shootBigData),
                (this.shootInterval = this.shootData.interval);
              break;
            case e.SHOOT_NAME_3WAY:
              (this.shootData = this.shoot3wayData),
                (this.shootInterval = this.shootData.interval);
          }
          g.play("g_powerup_voice");
        },
      },
      {
        key: "shootSpeedChange",
        value: function (t) {
          switch (t) {
            case e.SHOOT_SPEED_NORMAL:
              this.shootSpeed = 0;
              break;
            case e.SHOOT_SPEED_HIGH:
              this.shootSpeed = 15;
          }
          g.play("g_powerup_voice");
        },
      },
      {
        key: "setUp",
        value: function (t, o, i) {
          switch (
            ((this.hp = t),
            (this._percent = this.hp / this.maxHp),
            (this.shootMode = o),
            this.shootMode)
          ) {
            case e.SHOOT_NAME_NORMAL:
              (this.shootData = this.shootNormalData),
                (this.shootInterval = this.shootData.interval);
              break;
            case e.SHOOT_NAME_BIG:
              (this.shootData = this.shootBigData),
                (this.shootInterval = this.shootData.interval);
              break;
            case e.SHOOT_NAME_3WAY:
              (this.shootData = this.shoot3wayData),
                (this.shootInterval = this.shootData.interval);
          }
          switch (i) {
            case e.SHOOT_SPEED_NORMAL:
              this.shootSpeed = 0;
              break;
            case e.SHOOT_SPEED_HIGH:
              this.shootSpeed = 15;
          }
        },
      },
      {
        key: "shootStop",
        value: function () {
          this.shootOn = 0;
        },
      },
      {
        key: "shootStart",
        value: function () {
          this.shootOn = 1;
        },
      },
      {
        key: "barrierStart",
        value: function () {
          g.play("se_barrier_start"),
            (this.barrierFlg = !0),
            (this.barrier.alpha = 0),
            (this.barrier.visible = !0),
            (this.barrierEffect.x = this.unit.x + this.unit.width / 2),
            (this.barrierEffect.y = this.unit.y - 15 + this.barrier.height / 2),
            (this.barrierEffect.alpha = 1),
            (this.barrierEffect.visible = !0),
            this.barrierEffect.scale.set(0.5),
            TweenMax.to(this.barrierEffect.scale, 0.4, {
              x: 1,
              y: 1,
              ease: Quint.easeOut,
            }),
            TweenMax.to(this.barrierEffect, 0.5, {
              alpha: 0,
            }),
            this.tl && (this.tl.kill(), (this.tl = null)),
            (this.tl = new TimelineMax({
              onComplete: function () {
                (this.barrier.visible = !1),
                  (this.barrierFlg = !1),
                  (this.barrierEffect.visible = !1),
                  g.play("se_barrier_end");
              },
              onCompleteScope: this,
            })),
            this.tl
              .to(
                this.barrier,
                0.3,
                {
                  alpha: 1,
                },
                "+=0"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=4.0"
              )
              .to(
                this.barrier,
                1,
                {
                  alpha: 1,
                },
                "+=0"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=1"
              )
              .to(
                this.barrier,
                1,
                {
                  alpha: 1,
                },
                "+=0"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=0.5"
              )
              .to(
                this.barrier,
                0.5,
                {
                  alpha: 1,
                },
                "+=0"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=0.5"
              )
              .to(
                this.barrier,
                0.5,
                {
                  alpha: 1,
                },
                "+=0"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 1;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 1;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 1;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 1;
                },
                null,
                this,
                "+=0.1"
              )
              .call(
                function () {
                  this.barrier.alpha = 0;
                },
                null,
                this,
                "+=0.1"
              );
        },
      },
      {
        key: "barrierHitEffect",
        value: function () {
          (this.barrier.tint = 16711680),
            TweenMax.to(this.barrier, 0.2, {
              tint: 16777215,
            }),
            g.play("se_guard");
        },
      },
      {
        key: "caFire",
        value: function () {},
      },
      {
        key: "onDamage",
        value: function (t) {
          if (this.barrierFlg);
          else if (!0 !== this.damageAnimationFlg) {
            console.log("[Player] onDamage", t);
            if (
              ((this.hp -= t),
              this.hp <= 0 && (this.hp = 0),
              (this._percent = this.hp / this.maxHp),
              this.hp <= 0)
            )
              this.dead();
            else {
              var e = new TimelineMax({
                onComplete: function () {
                  this.damageAnimationFlg = !1;
                }.bind(this),
              });
              e.to(this.unit, 0.15, {
                delay: 0,
                y: this.unit.y + 2,
                tint: 16711680,
                alpha: 0.2,
              }),
                e.to(this.unit, 0.15, {
                  delay: 0,
                  y: this.unit.y - 2,
                  tint: 16777215,
                  alpha: 1,
                }),
                e.to(this.unit, 0.15, {
                  delay: 0.05,
                  y: this.unit.y + 2,
                  tint: 16711680,
                  alpha: 0.2,
                }),
                e.to(this.unit, 0.15, {
                  delay: 0,
                  y: this.unit.y - 2,
                  tint: 16777215,
                  alpha: 1,
                }),
                e.to(this.unit, 0.15, {
                  delay: 0.05,
                  y: this.unit.y + 2,
                  tint: 16711680,
                  alpha: 0.2,
                }),
                e.to(this.unit, 0.15, {
                  delay: 0,
                  y: this.unit.y + 0,
                  tint: 16777215,
                  alpha: 1,
                }),
                e.to(this.unit, 0.15, {
                  delay: 0.05,
                  y: this.unit.y + 2,
                  tint: 16711680,
                  alpha: 0.2,
                }),
                e.to(this.unit, 0.15, {
                  delay: 0,
                  y: this.unit.y + 0,
                  tint: 16777215,
                  alpha: 1,
                }),
                AudioManager.play("g_damage_voice"),
                AudioManager.play("se_damage");
            }
            this.damageAnimationFlg = !0;
          }
        },
      },
      {
        key: "dead",
        value: function () {
          this.emit(y.CUSTOM_EVENT_DEAD),
            this.shootStop(),
            // (this.explosion.onComplete = this.explosionComplete.bind(this)),
            this.explosion.on(
              "animationcomplete",
              this.explosionComplete.bind(this)
            ),
            (this.explosion.x =
              this.unit.x + this.unit.width / 2 - this.explosion.width / 2),
            (this.explosion.y =
              this.unit.y + this.unit.height / 2 - this.explosion.height / 2),
            this.addChild(this.explosion),
            this.explosion.play(),
            this.removeChild(this.unit),
            this.removeChild(this.shadow);
          for (var t = 0; t < this.bulletList.length; t++) {
            var e = this.bulletList[t];
            // DRJ - is bulletList item child of Player?
            this.removeChild(e);
          }
          AudioManager.play("se_explosion"),
            AudioManager.play("g_continue_no_voice0");
        },
      },
      {
        key: "explosionComplete",
        value: function () {
          this.emit(y.CUSTOM_EVENT_DEAD_COMPLETE),
            this.removeChild(this.explosion);
        },
      },
      {
        // key: "castAdded",
        key: "addedToScene",
        // value: function (t) {
        value: function (gameObject, scene) {
          //   I(O(e.prototype), "castAdded", this).call(this),
          //   gameObject.castAdded.call(gameObject),
          // DRJ - renamed all instances of this to 'gameObject'
          // may need to revert if castAdded is used
          // gameObject.addChild(gameObject.barrier),
          // gameObject.addChild(gameObject.barrierEffect),
          // gameObject.addChild(gameObject.dragAreaRect),
          // gameObject.dragAreaRect.on(
          //   "pointerdown",
          //   gameObject.onScreenDragStart.bind(this)
          // ),
          // gameObject.dragAreaRect.on("pointerup", gameObject.onScreenDragEnd.bind(this)),
          // gameObject.dragAreaRect.on(
          //   "pointerupoutside",
          //   gameObject.onScreenDragEnd.bind(this)
          // ),
          // gameObject.dragAreaRect.on(
          //   "pointermove",
          //   gameObject.onScreenDragMove.bind(this)
          // ),
          (gameObject.keyDownListener = gameObject.onKeyDown.bind(this)),
            (gameObject.keyUpListener = gameObject.onKeyUp.bind(this)),
            document.addEventListener("keydown", gameObject.keyDownListener),
            document.addEventListener("keyup", gameObject.keyUpListener),
            (gameObject.damageAnimationFlg = !1);
        },
      },
      {
        // key: "castRemoved",
        key: "removedFromScene",
        // value: function (t) {
        value: function (gameObject, scene) {
          //   I(O(e.prototype), "castRemoved", this).call(this),
          //     this.dragAreaRect.off(
          //       "pointerdown",
          //       this.onScreenDragStart.bind(this)
          //     ),
          //     this.dragAreaRect.off("pointerup", this.onScreenDragEnd.bind(this)),
          //     this.dragAreaRect.off(
          //       "pointerupoutside",
          //       this.onScreenDragEnd.bind(this)
          //     ),
          //     this.dragAreaRect.off(
          //       "pointermove",
          //       this.onScreenDragMove.bind(this)
          //     ),
          document.removeEventListener("keydown", this.keyDownListener),
            document.removeEventListener("keyup", this.keyUpListener),
            (this.keyDownListener = null),
            (this.keyUpListener = null);
        },
      },
      {
        key: "percent",
        get: function () {
          return this._percent;
        },
        set: function (t) {
          this._percent = t;
        },
      },
    ]),
    e
  );
})();

// Item
class Item extends AnimatedSprite {
  constructor(t) {
    super(window.gameScene, t, "game_asset");

    var o = this;

    return (
      (o.interactive = !0), // DRJ - mouse/touch events needed?
      (o.animationSpeed = 0.08),
      // o.hitArea = new PIXI.Rectangle(0,0,t[0].width,t[0].height),
      (o.hitArea = new PIXI.Rectangle(
        window.gameScene,
        0,
        0,
        t[0].width,
        t[0].height
      )),
      o.play(),
      o
    );
  }
}

// (line 3638)
//
// correctly handle ES6 symbols in environments that do not fully support them
// returns the string "symbol" or the typeof t
function He(t) {
  return (He =
    // checks if Symbol and Symbol.iterator are functions. If they are, environment
    // supports ES6 symbols. In this case, the He function is redefined to simply
    // return the type of t using the typeof operator.
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : // does not fully support ES6
        function (t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        })(t);
}

// add properties to an object t based on an array of property descriptors e
function Ne(t, e) {
  for (var o = 0; o < e.length; o++) {
    var i = e[o];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(t, i.key, i);
  }
}

// If Object.setPrototypeOf exists, it uses that
// in older JavaScript environments, it falls back to directly setting __proto__
function Ve(t, e) {
  return (Ve =
    Object.setPrototypeOf ||
    function (t, e) {
      return (t.__proto__ = e), t;
    })(t, e);
}

// (line 3690)
class Enemy extends y.prototype.constructor {
  constructor(t) {
    super(t.texture, t.explosion);

    // if (function(t, e) {
    //     if (!(t instanceof e))
    //         throw new TypeError("Cannot call a class as a function")
    // }(this, e),
    // "object" !== He(t.texture[0])) {
    if ("object" !== typeof t.texture[0]) {
      for (var o = 0; o < t.texture.length; o++) {
        var i = t.texture[o];
        t.texture[o] = i;
      }
      if (null !== t.tamaData)
        for (o = 0; o < t.tamaData.texture.length; o++) {
          var n = PIXI.Texture.fromFrame(t.tamaData.texture[o]);
          // n.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST,
          t.tamaData.texture[o] = n;
        }
    }

    var o = this;

    // switch ((o = Le(this, Ue(e).call(this, t.texture, t.explosion))).name = t.name,
    switch (
      ((o.name = t.name),
      (o.interval = t.interval),
      (o.score = t.score),
      (o.hp = t.hp),
      (o.speed = t.speed),
      (o.cagage = t.cagage),
      (o.tamaData = t.tamaData),
      (o.itemName = t.itemName),
      (o.itemTexture = t.itemTexture),
      // o.whitefilter = new PIXI.filters.ColorMatrixFilter,
      // o.whitefilter.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      t.name)
    ) {
      case "baraA":
      case "baraB":
        o.shadow.visible = !1;
        break;
      case "drum":
        // o.unit.hitArea = new PIXI.Rectangle(7, 2, o.unit.width - 14, o.unit.height - 2);
        o.unit.hitArea = new PIXI.Rectangle(
          window.gameScene,
          7,
          2,
          o.unit.width - 14,
          o.unit.height - 2
        );
        break;
      case "launchpad":
        // o.unit.hitArea = new PIXI.Rectangle(8, 0, o.unit.width - 16, o.unit.height)
        o.unit.hitArea = new PIXI.Rectangle(
          window.gameScene,
          8,
          0,
          o.unit.width - 16,
          o.unit.height
        );
    }
    return (
      (o.shadowReverse = t.shadowReverse),
      (o.shadowOffsetY = t.shadowOffsetY),
      (o.playerBigBulletCnt = 0),
      (o.bulletFrameCnt = 0),
      (o.shootFlg = !0),
      (o.hardleFlg = !1),
      o.interval <= -1 && (o.hardleFlg = !0),
      (o.deadFlg = !1),
      o
    );
  }

  // loop
  update() {
    switch (
      (this.bulletFrameCnt++,
      this.shootFlg &&
        !this.hardleFlg &&
        this.bulletFrameCnt % this.interval == 0 &&
        this.shoot(),
      (this.unit.y += this.speed),
      this.name)
    ) {
      case "soliderA":
        this.unit.y >= i.GAME_HEIGHT / 1.5 &&
          (this.unit.x += 0.005 * (D.player.unit.x - this.unit.x));
        break;
      case "soliderB":
        this.unit.y <= 10 &&
          (this.unit.x >= i.GAME_WIDTH / 2
            ? ((this.unit.x = i.GAME_WIDTH), (this.posName = "right"))
            : ((this.unit.x = -this.unit.width), (this.posName = "left"))),
          this.unit.y >= i.GAME_HEIGHT / 3 &&
            ("right" == this.posName
              ? (this.unit.x -= 1)
              : "left" == this.posName && (this.unit.x += 1));
    }
  }

  shoot() {
    this.emit(y.CUSTOM_EVENT_TAMA_ADD),
      AudioManager.stop("se_shoot"),
      AudioManager.play("se_shoot");
  }

  onDamage(t) {
    "infinity" == this.hp
      ? (TweenMax.to(this.character, 0.05, {
          filters: [this.whitefilter],
        }),
        TweenMax.to(this.character, 0.3, {
          delay: 0.1,
          filters: null,
        }))
      : this.deadFlg ||
        ((this.hp -= t),
        this.hp <= 0
          ? (this.dead.bind(this)(), (this.deadFlg = !0))
          : (TweenMax.to(this.character, 0.1, {
              tint: 16711680,
            }),
            TweenMax.to(this.character, 0.1, {
              delay: 0.1,
              tint: 16777215,
            })));
  }

  dead() {
    "infinity" == this.hp ||
      (this.emit(y.CUSTOM_EVENT_DEAD),
      (this.shootFlg = !1),
      // (this.explosion.onComplete = this.explosionComplete.bind(this)),
      this.explosion.on("animationcomplete", this.explosionComplete.bind(this)),
      (this.explosion.x =
        this.unit.x + this.unit.width / 2 - this.explosion.width / 2),
      (this.explosion.y =
        this.unit.y + this.unit.height / 2 - this.explosion.height / 2),
      this.addChild(this.explosion),
      this.explosion.play(),
      this.unit.removeChild(this.shadow),
      this.unit.removeChild(this.character),
      this.removeChild(this.unit),
      AudioManager.stop("se_damage"),
      AudioManager.play("se_explosion"));
  }

  explosionComplete() {
    this.explosion.destroy(),
      this.removeChild(this.explosion),
      this.emit(y.CUSTOM_EVENT_DEAD_COMPLETE);
  }

  castAdded() {
    // console.log("[Enemy] castAdded", this);
  }

  castRemoved(t) {
    if (t.explosion.frame.name == "explosion06.gif") {
      t.explosion.destroy(true);
    }

    if (t.parentContainer) t.parentContainer.remove(t);
    super.castRemoved(t);
    // if (this.scene)  this.scene.sys.displayList.remove(t);
  }
}

// TitleScreen (line 6593)
class TitleScreen extends Container {
  constructor(scene?, x?, y?) {
    scene = scene || window.gameScene;
    x = x || 0;
    y = y || 0;
    super(scene, x, y);

    var t = this;
    // (t.interactive = !1),
    // (t.buttonMode = !1),
    // (t.gameStartBg = new PIXI.Graphics()),
    // t.gameStartBg.beginFill(16777215, 0.2),
    // t.gameStartBg.drawRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
    // (t.gameStartBg.visible = !1),
    // (t.gameStartBg.alpha = 0),
    t.stageNumList = [];
    // for (var o = 0; o < 4; o++) {
    //   var n = PIXI.Texture.fromFrame("stageNum" + String(o + 1) + ".gif");
    //   (n.scaleMode = PIXI.SCALE_MODES.NEAREST), (t.stageNumList[o] = n);
    // }
    // (t.stageNum = new PIXI.Sprite()),
    //   (t.stageNum.x = 0),
    //   (t.stageNum.y = i.GAME_HEIGHT / 2 - 20),
    //   (t.stageNum.visible = !1);
    // var a = PIXI.Texture.fromFrame("stageFight.gif");
    return (
      // (a.scaleMode = PIXI.SCALE_MODES.NEAREST),
      // (t.stageFight = new PIXI.Sprite(a)),
      // (t.stageFight.x = t.stageFight.width / 2),
      // (t.stageFight.y = i.GAME_HEIGHT / 2 + t.stageFight.height / 2 - 20),
      // (t.stageFight.visible = !1),
      // t.stageFight.anchor.set(0.5),
      // (t.stageClearBg = new PIXI.Graphics()),
      // t.stageClearBg.beginFill(16777215, 0.4),
      // t.stageClearBg.drawRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      // (t.stageClearBg.visible = !1),
      // (t.stageClearBg.alpha = 0),
      // (t.stageClearText = new PIXI.Sprite(
      //   PIXI.Texture.fromFrame("stageclear.gif")
      // )),
      // (t.stageClearText.x = i.GAME_WIDTH / 2 - t.stageClearText.width / 2),
      // (t.stageClearText.y = i.GAME_HEIGHT / 2 - t.stageClearText.height),
      // (t.stageTimeoverBg = new PIXI.Graphics()),
      // t.stageTimeoverBg.beginFill(16777215, 0.4),
      // t.stageTimeoverBg.drawRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      // (t.stageTimeoverBg.visible = !1),
      // (t.stageTimeoverBg.alpha = 0),
      // (t.stageTimeoverText = new PIXI.Sprite(
      //   PIXI.Texture.fromFrame("stageTimeover.gif")
      // )),
      // (t.stageTimeoverText.x =
      //   i.GAME_WIDTH / 2 - t.stageTimeoverText.width / 2),
      // (t.stageTimeoverText.y = i.GAME_HEIGHT / 2 - t.stageTimeoverText.height),
      // (t.knockoutK = new PIXI.Sprite(PIXI.Texture.fromFrame("knockoutK.gif"))),
      // (t.knockoutK.x = i.GAME_CENTER - t.knockoutK.width / 2),
      // (t.knockoutK.y = i.GAME_MIDDLE),
      // t.knockoutK.anchor.set(0.5),
      // (t.knockoutK.visible = !1),
      // (t.knockoutO = new PIXI.Sprite(PIXI.Texture.fromFrame("knockoutO.gif"))),
      // (t.knockoutO.x = i.GAME_CENTER + t.knockoutO.width / 2),
      // (t.knockoutO.y = i.GAME_MIDDLE),
      // t.knockoutO.anchor.set(0.5),
      // (t.knockoutO.visible = !1),
      t
    );
  }

  static EVENT_START = "evenStart";

  static EVENT_RESTART = "evenRestart";

  gameStart(t) {
    var o,
      n,
      a = !1;
    4 == t
      ? ((n = 3),
        (a = !0),
        // (o = new PIXI.Graphics()).beginFill(0, 1),
        // o.drawRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
        // this.addChild(o),
        // g.play("voice_another_fighter"))
        AudioManager.play("voice_another_fighter"))
      : (n = t); //,
    // (this.gameStartBg.visible = !0),
    // (this.stageNum.texture = this.stageNumList[n]),
    // (this.stageNum.visible = !0),
    // (this.stageNum.alpha = 0),
    // (this.stageFight.visible = !0),
    // (this.stageFight.alpha = 0),
    // this.stageFight.scale.set(1.2);
    var s = new TimelineMax({
      onComplete: function () {
        // (this.gameStartBg.visible = !1), this.emit(e.EVENT_START);
        this.emit(TitleScreen.EVENT_START);
      }.bind(this),
    });
    // a &&
    //   s.to(
    //     o,
    //     0.3,
    //     {
    //       alpha: 0,
    //     },
    //     "+=3"
    //   ),
    //   s.to(this.gameStartBg, 0.3, {
    //     alpha: 1,
    //   }),
    s.addCallback(
      function () {
        // g.play(["voice_round" + n]);
        AudioManager.play(["voice_round" + n]);
      },
      "+=0",
      null,
      this
    ); //,
    //   s.to(this.stageNum, 0.3, {
    //     alpha: 1,
    //   }),
    //   s.to(this.stageNum, 0.1, {
    //     delay: 1,
    //     alpha: 0,
    //   }),
    //   s.to(
    //     this.stageFight,
    //     0.2,
    //     {
    //       alpha: 1,
    //     },
    //     "-=0.1"
    //   ),
    //   s.to(
    //     this.stageFight.scale,
    //     0.2,
    //     {
    //       x: 1,
    //       y: 1,
    //     },
    //     "-=0.2"
    //   ),
    //   s.addCallback(
    //     function () {
    //       g.play("voice_fight");
    //     },
    //     "+=0",
    //     null,
    //     this
    //   ),
    //   s.to(
    //     this.stageFight.scale,
    //     0.2,
    //     {
    //       x: 1.5,
    //       y: 1.5,
    //     },
    //     "+=0.4"
    //   ),
    //   s.to(
    //     this.stageFight,
    //     0.2,
    //     {
    //       alpha: 0,
    //     },
    //     "-=0.2"
    //   ),
    //   s.to(
    //     this.gameStartBg,
    //     0.2,
    //     {
    //       alpha: 0,
    //     },
    //     "-=0.1"
    //   );
  }
}

// StageBg  (line 6855)
class StageBg extends Container {
  constructor(allStagebgTexturesList, scene?, x?, y?) {
    scene = scene || window.gameScene;
    x = x || 0;
    y = y || 0;
    super(scene, x, y);
    this.allStagebgTexturesList = allStagebgTexturesList;
    this.bg;
    this.scrollAmount = 0;
    this.scrollCount = 0;
    this.moveFlg = false;
    this.bossAppearFlg = false;
  }

  init(t) {
    this.moveFlg = true;
    this.bossAppearFlg = false;
    this.scrollAmount = 0;
    const e = this.allStagebgTexturesList[t][1];
    const o = this.allStagebgTexturesList[t][0];
    this.bg = new Phaser.GameObjects.TileSprite(
      window.gameScene,
      0,
      0,
      i.GAME_WIDTH,
      i.GAME_HEIGHT,
      e
    ).setOrigin(0);
    this.addChild(this.bg),
      (this.bgEnd = new Sprite(window.gameScene, 0, 0, o)),
      (this.bgEnd.y = -this.bgEnd.height),
      this.addChild(this.bgEnd);
    var n = [];
    (n[0] = PIXI.Texture.fromFrame("akebonoBg0.gif")),
      (n[1] = PIXI.Texture.fromFrame("akebonoBg1.gif")),
      (n[2] = PIXI.Texture.fromFrame("akebonoBg2.gif")),
      (this.akebonoBg = new PIXI.extras.AnimatedSprite(
        window.gameScene,
        n,
        "game_ui",
        false
      )),
      (this.akebonoBg.animationSpeed = 0.7);
  }

  loop(t) {
    this.scrollAmount = t;
    this.moveFlg && (this.bg.tilePositionY -= this.scrollAmount);
    if (this.bossAppearFlg) {
      this.scrollCount += t;
      this.bg.y += this.scrollAmount;
      this.bgEnd.y += this.scrollAmount;
      if (this.scrollAmount >= 214) {
        this.scrollAmount = 0;
      }
      if (this.bgEnd.y >= 42) {
        this.bossAppearFlg = false;
      }
    }
  }

  bossScene() {
    this.moveFlg = false;
    this.bossAppearFlg = true;
  }

  akebonofinish() {
    this.akebonoBg.play();
    this.addChild(this.akebonoBg);
  }

  akebonoGokifinish() {
    this.akebonoBg.play();
    this.addChild(this.akebonoBg);
    this.akebonoTen = new Sprite(
      window.gameScene,
      0,
      0,
      "game_ui",
      "akebonoTen.gif"
    );
    this.akebonoTen.setOrigin(0.5);
    this.akebonoTen.x = 27 + this.akebonoTen.width / 2;
    this.akebonoTen.y = 113 + this.akebonoTen.height / 2;
    this.akebonoTen.setScale(1.2);
    this.addChild(this.akebonoTen);
    this.akebonoTenShock = new Sprite(
      window.gameScene,
      0,
      0,
      "game_ui",
      "akebonoTen.gif"
    );
    this.akebonoTenShock.setOrigin(0.5);
    this.akebonoTenShock.x = 27 + this.akebonoTenShock.width / 2;
    this.akebonoTenShock.y = 113 + this.akebonoTenShock.height / 2;
    this.akebonoTenShock.alpha = 0;
    this.addChild(this.akebonoTenShock);
    TweenMax.to(this.akebonoTenShock, 0.5, {
      alpha: 1,
      repeat: -1,
      yoyo: true,
    });
  }

  castAdded(t) {
    console.log("[StageBg] castAdded");
  }

  castRemoved(t) {
    console.log("[StageBg] castRemoved");
    this.akebonoBg &&
      (this.akebonoBg.destroy(), this.removeChild(this.akebonoBg)),
      this.akebonoTen &&
        (this.removeChild(this.akebonoTen),
        this.removeChild(this.akebonoTenShock)),
      this.removeChild(this.bg),
      this.removeChild(this.bgEnd);
  }
}
