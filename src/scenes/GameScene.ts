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
            // this.hud.caBtnDeactive(),
            (this.theWorldFlg = !0),
              this.boss && this.boss.onTheWorld(this.theWorldFlg),
              this.boss.shungokusatsu(this.player.unit, !0),
              (this.player.alpha = 0); //,
            // (this.hud.cagaBtn.alpha = 0);
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
      for (var u = 0; u < this.itemHitTestList.length; u++) {
        var c = this.itemHitTestList[u];
        if (
          ((c.y += 1),
          // B.Manager.interact.hitTestRectangle(c, this.player.unit)) {
          this.physics.world.overlap(c, this.player.unit))
        ) {
          switch (c.name) {
            case M.SHOOT_SPEED_HIGH:
              (D.shootSpeed = c.name),
                this.player.shootSpeedChange(D.shootSpeed);
              break;
            case M.BARRIER:
              this.player.barrierStart();
              break;
            default:
              this.player.shootMode !== c.name &&
                ((D.shootSpeed = M.SHOOT_SPEED_NORMAL),
                this.player.shootSpeedChange(D.shootSpeed)),
                (D.shootMode = c.name),
                this.player.shootModeChange(D.shootMode);
          }
          this.unitContainer.removeChild(c), this.itemHitTestList.splice(u, 1);
        }
        c.y >= i.GAME_HEIGHT - 10 &&
          (this.unitContainer.removeChild(c),
          this.itemHitTestList.splice(u, 1));
      }
      this.stageBg.loop(this.stageBgAmountMove),
        this.enemyWaveFlg &&
          (this.frameCnt % this.waveInterval == 0 && this.enemyWave(),
          (this.frameCnt += this.frameCntUp));
    }
  }

  stageClear() {
    // F.dlog("GameScene.stageClear()"),
    (this.theWorldFlg = !0),
      (D.playerHp = this.player.hp),
      // D.cagage = this.hud.cagageCount,
      // D.score = this.hud.scoreCount,
      // this.hud.caBtnDeactive(!0),
      D.stageId++,
      (this.sceneSwitch = 1),
      this.player.shootStop(),
      TweenMax.delayedCall(
        2.3,
        function () {
          // B.Manager.game.stage.removeChild(B.Scene)
          // this.scene.stop();
          this.nextScene();
          this.sceneRemoved();
        }.bind(this)
      );
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
            n = new Bullet(t.tamaData),
            a = n.character.width,
            s = n.character.height,
            r = void 0;
          switch (t.tamaData.cnt) {
            case 0:
              (r = 105),
                (n.unit.hitArea = new PIXI.Rectangle(
                  window.gameScene,
                  2.7 * -s,
                  a / 2 - 10,
                  s,
                  a / 2
                ));
              break;
            case 1:
              (r = 90),
                (n.unit.hitArea = new PIXI.Rectangle(
                  window.gameScene,
                  -s,
                  a / 2,
                  s,
                  a / 2
                ));
              break;
            case 2:
              (r = 75),
                (n.unit.hitArea = new PIXI.Rectangle(
                  window.gameScene,
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
            n.on(Bullet.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, n)),
            n.on(
              Bullet.CUSTOM_EVENT_DEAD_COMPLETE,
              this.enemyRemoveComplete.bind(this, n)
            ),
            this.unitContainer.addChild(n),
            this.enemyHitTestList.push(n);
        }
        t.tamaData.cnt >= 2 ? (t.tamaData.cnt = 0) : t.tamaData.cnt++;
        break;
      case "smoke":
        var h = 60 * Math.random() + 60,
          l = new Bullet(t.tamaData);
        (l.unit.hitArea = new PIXI.Rectangle(
          window.gameScene,
          20,
          20,
          l.character.width - 40,
          l.character.height - 40
        )),
          (l.rotX = Math.cos((h * Math.PI) / 180)),
          (l.rotY = Math.sin((h * Math.PI) / 180)),
          (l.unit.x = t.unit.x + t.unit.width / 2 - 50),
          (l.unit.y = t.unit.y + 45),
          l.on(Bullet.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, l)),
          l.on(
            Bullet.CUSTOM_EVENT_DEAD_COMPLETE,
            this.enemyRemoveComplete.bind(this, l)
          ),
          (l.character.loop = !1),
          // (l.character.onComplete = function () {
          l.character.on(
            "animationcomplete",
            function () {
              // l.character.gotoAndPlay(6);
              l.character.setFrame(6), l.character.play();
            }.bind(this)
          ),
          this.unitContainer.addChild(l),
          this.enemyHitTestList.push(l);
        break;
      case "meka":
        for (var u = 0; u < 32; u++) {
          var c = new Bullet(t.tamaData);
          (c.cont = 0),
            (c.start = 10 * u),
            (c.player = this.player.unit),
            (c.unit.x = t.unit.hitArea.x + t.unit.hitArea.width / 2),
            (c.unit.y = t.unit.hitArea.y + t.unit.hitArea.height),
            // c.unit.scale.set(0);
            c.unit.setScale(0);
          var f = Math.random() * (i.GAME_WIDTH - 2 * t.unit.hitArea.x),
            d = Math.random() * t.unit.hitArea.height + t.unit.hitArea.y;
          TweenMax.to(c.unit, 0.3, {
            x: f,
            y: d,
          }),
            // TweenMax.to(c.unit.scale, 0.3, {
            TweenMax.to(c.unit, 0.3, {
              // x: 1,
              scaleX: 1,
              // y: 1,
              scaleY: 1,
            }),
            c.on(Bullet.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, c)),
            c.on(
              Bullet.CUSTOM_EVENT_DEAD_COMPLETE,
              this.enemyRemoveComplete.bind(this, c)
            ),
            this.unitContainer.addChild(c),
            this.enemyHitTestList.push(c);
        }
        break;
      case "psychoField":
        for (var p = 0; p < 72; p++) {
          var m = new Bullet(t.tamaData);
          (m.rotX = Math.cos(((p / 72) * 360 * Math.PI) / 180)),
            (m.rotY = Math.sin(((p / 72) * 360 * Math.PI) / 180)),
            (m.unit.x =
              50 * m.rotX +
              t.unit.x +
              t.unit.hitArea.width / 2 +
              m.unit.width / 2),
            (m.unit.y = 50 * m.rotY + t.unit.y + t.unit.hitArea.height / 2),
            m.on(Bullet.CUSTOM_EVENT_DEAD, this.enemyRemove.bind(this, m)),
            m.on(
              Bullet.CUSTOM_EVENT_DEAD_COMPLETE,
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
      // var t = new Eo(o);
      var t = new Vega(o);
      t.on(
        // Eo.CUSTOM_EVENT_GOKI,
        Vega.CUSTOM_EVENT_GOKI,
        function e() {
          // (this.theWorldFlg = !0), this.hud.caBtnDeactive();
          this.theWorldFlg = !0;
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
                  // (this.hud.cagaBtn.alpha = 0),
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
                // (this.hud.cagaBtn.alpha = 1),
                (this.player.alpha = 1),
                  // t.off(Eo.CUSTOM_EVENT_GOKI, e.bind(this)),
                  t.off(Vega.CUSTOM_EVENT_GOKI, e.bind(this)),
                  (t.hp = 0),
                  t.dead();
                for (var o = 0; o < this.enemyHitTestList.length; o++)
                  this.enemyHitTestList[o] == t &&
                    this.enemyHitTestList.splice(o, 1);
                // AudioManager.stop(this.stageBgmName);
                var n =
                  "boss_" +
                  B.resource.recipe.data.bossData.bossExtra.name +
                  "_bgm_info";
                this.stageBgmName = i[n].name;
                var a = i[n].start,
                  s = i[n].end;
                AudioManager.bgmPlay(this.stageBgmName, a, s);
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
                  // this.hud.caBtnActive(),
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
        // (this.boss = new Ro(e)),
        (this.boss = new Goki(e)),
        this.boss.on(
          // Ze.CUSTOM_EVENT_DEAD,
          Boss.CUSTOM_EVENT_DEAD,
          this.bossRemove.bind(this, this.boss)
        ),
        this.boss.on(
          // Ze.CUSTOM_EVENT_TAMA_ADD,
          Boss.CUSTOM_EVENT_TAMA_ADD,
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
          this.boss = new Bison(o);
          break;
        case 1:
          // this.boss = new po(o);
          this.boss = new Barlog(o);
          break;
        case 2:
          // this.boss = new wo(o);
          this.boss = new Sagat(o);
          break;
        case 3:
          // (o.gokiFlg = !1), (this.boss = new Eo(o));
          (o.gokiFlg = !1), (this.boss = new Vega(o));
          break;
        case 4:
          this.boss = new Fang(o);
      }
      this.boss.on(
        Boss.CUSTOM_EVENT_DEAD,
        this.bossRemove.bind(this, this.boss)
      ),
        this.boss.on(
          Boss.CUSTOM_EVENT_TAMA_ADD,
          this.tamaAdd.bind(this, this.boss)
        ),
        this.enemyHitTestList.push(this.boss),
        this.unitContainer.addChild(this.boss);
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

  bossRemove(t) {
    this.theWorldFlg = !0; //,
    // this.hud.comboCount = 1,
    // this.hud.scoreCount = t.score,
    // this.hud.cagageCount = t.cagage,
    // this.hud.scoreView(t),
    // this.hud.caBtnDeactive();
    for (var e = 0; e < this.player.bulletList.length; e++) {
      var o = this.player.bulletList[e];
      this.player.removeChild(o);
    }
    (this.enemyHitTestList = []),
      (this.player.bulletList = []),
      TweenMax.delayedCall(
        2.5,
        function () {
          this.stageClear();
        },
        null,
        this
      ),
      // this.hud.caFireFlg ? (this.stageBg.akebonofinish(),
      // this.title.akebonofinish(),
      // D.akebonoCnt++) : this.title.stageClear()
      this.title.stageClear();
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

  private sceneRemoved() {
    // F.dlog("GameScene.sceneRemoved() Start."),
    // Wi(Ui(e.prototype), "sceneRemoved", this).call(this);
    super.sceneRemoved();
    for (var t = 0; t < this.children.length; t++) {
      var o = this.children[t];
      this.sys.displayList.remove(o);
    }
    // for (var i = 0; i < this.bulletContainer.children.length; i++) {
    //     var n = this.bulletContainer.children[i];
    //     this.bulletContainer.removeChild(n)
    // }
    // AudioManager.stop(this.stageBgmName); //,
    // 1 === this.sceneSwitch ? B.Scene = new hn : B.Scene = new Be,
    if (1 === this.sceneSwitch) {
      this.scene.start("adv-scene");
    } else {
      this.scene.start("continue-scene");
    } //,
    // B.Manager.game.stage.addChild(B.Scene),
    // F.dlog("GameScene.sceneRemoved() End.")
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
      // o.on("added", o.atCastAdded),
      o.on("addedtoscene", o.atCastAdded),
      // o.on("removed", o.atCastRemoved),
      o.on("removedfromscene", o.atCastRemoved),
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
          console.log("[l] atCastAdded");
          this.parentNode, this.castAdded(t);
        },
      },
      {
        key: "atCastRemoved",
        value: function (t) {
          // this.parentNode, this.castRemoved();
          this.parentNode, this.castRemoved(t);
        },
      },
      {
        key: "castAdded",
        value: function () {
          console.log("[l] castAdded");
        },
      },
      {
        key: "castRemoved",
        value: function (t) {
          console.log("[l] castRemoved", t);
        },
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
export class Bullet extends y.prototype.constructor {
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

  // DRJ - required for shadow
  addedToScene(gameObject, scene) {
    super.castAdded(gameObject);
  }

  // removedFromScene(t) {
  //   if (t.parentContainer) {
  //     // DRJ::TODO - fix ugly hack
  //     if (t.explosion.frame.name == "hit4.gif") {
  //       t.explosion.destroy(true);
  //     }

  //     t.parentContainer.remove(t);
  //   }

  //   super.castRemoved(t);
  //   if (this.scene) this.scene.sys.displayList.remove(t); // DRJ - remove me?
  // }
}

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
            this.removeChild(t);
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
          AudioManager.play("g_powerup_voice");
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
          AudioManager.play("g_powerup_voice");
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
          AudioManager.play("se_barrier_start"),
            (this.barrierFlg = !0),
            (this.barrier.alpha = 0),
            (this.barrier.visible = !0),
            (this.barrierEffect.x = this.unit.x + this.unit.width / 2),
            (this.barrierEffect.y = this.unit.y - 15 + this.barrier.height / 2),
            (this.barrierEffect.alpha = 1),
            (this.barrierEffect.visible = !0),
            // this.barrierEffect.scale.set(0.5),
            this.barrierEffect.setScale(0.5),
            // TweenMax.to(this.barrierEffect.scale, 0.4, {
            TweenMax.to(this.barrierEffect, 0.4, {
              // x: 1,
              scaleX: 1,
              // y: 1,
              scaleY: 1,
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
                  AudioManager.play("se_barrier_end");
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
            AudioManager.play("se_guard");
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
          console.log("[M] removedFromScene", gameObject);
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

export class Boss extends y.prototype.constructor {
  constructor(t) {
    super(t.anim.idle, t.explosion);

    var o = this;

    (o.name = t.name),
      (o.unit.name = "boss"),
      (o.name = t.name),
      (o.interval = t.interval),
      (o.score = t.score),
      (o.hp = t.hp),
      (o.cagage = t.cagage),
      (o.animList = t.anim),
      (o.tamaData = t.tamaData);
    for (var i = [], n = 0; n < 3; n++)
      i[n] = PIXI.Texture.fromFrame("boss_dengerous" + n + ".gif");
    return (
      (o.dengerousBalloon = new PIXI.extras.AnimatedSprite(
        window.gameScene,
        i,
        "game_asset"
      )),
      (o.dengerousBalloon.animationSpeed = 0.2),
      //   (o.dengerousBalloon.pivot.y = o.dengerousBalloon.height),
      o.dengerousBalloon.setOrigin(0.5, 1),
      //   o.dengerousBalloon.scale.set(0),
      o.dengerousBalloon.setScale(0),
      (o.shadowReverse = t.shadowReverse),
      (o.shadowOffsetY = t.shadowOffsetY),
      (o.shootOn = !0),
      (o.bulletFrameCnt = 0),
      (o.moveFlg = !1),
      (o.deadFlg = !1),
      (o.gokiFlg = !1),
      (o.dengerousFlg = !1),
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        5,
        5,
        o.unit.width - 10,
        o.unit.height - 10
      )),
      o.tlShoot,
      o
    );
  }

  shoot() {
    this.emit(y.CUSTOM_EVENT_TAMA_ADD),
      AudioManager.stop("se_shoot"),
      AudioManager.play("se_shoot");
  }

  onTheWorld(t) {
    t ? this.tlShoot.pause() : this.hp >= 1 && this.tlShoot.resume();
  }

  onDamage(t) {
    this.deadFlg ||
      ((this.hp -= t),
      this.hp <= 0
        ? (this.dead.bind(this)(), (this.deadFlg = !0))
        : (TweenMax.isTweening(this.character) &&
            TweenMax.killTweensOf(this.character, {
              tint: !0,
            }),
          TweenMax.to(this.character, 0.1, {
            tint: 16773120,
          }),
          TweenMax.to(this.character, 0.1, {
            delay: 0.2,
            tint: 16777215,
          }),
          this.hp <= D.caDamage &&
            (this.dengerousFlg ||
              (this.unit.addChild(this.dengerousBalloon),
              this.dengerousBalloon.play(),
              // TweenMax.to(this.dengerousBalloon.scale, 1, {
              TweenMax.to(this.dengerousBalloon, 1, {
                // x: 1,
                scaleX: 1,
                // y: 1,
                scaleY: 1,
                ease: Elastic.easeOut,
              }),
              (this.dengerousFlg = !0)))));
  }

  dead() {
    if (this.hp <= 0) {
      this.gokiFlg || this.emit(y.CUSTOM_EVENT_DEAD),
        this.character.stop(),
        this.shadow.stop(),
        (this.explotionCnt = 0),
        AudioManager.stop("se_damage");
      for (var t = 0; t < 5; t++)
        TweenMax.delayedCall(
          0.25 * t,
          function () {
            // var t = new PIXI.extras.AnimatedSprite(this.explosion.textures);
            // var t = new PIXI.extras.AnimatedSprite(
            //   window.gameScene,
            //   this.explosion.textures,
            //   "game_asset"
            // );
            var t = this.explosion;
            // t.scale.set(1),
            t.setScale(1),
              (t.animationSpeed = 0.15),
              (t.loop = !1),
              //   (t.onComplete = this.explosionComplete.bind(this, t)),
              t.on("animationcomplete", this.explosionComplete.bind(this, t)),
              (t.x =
                this.unit.x +
                Math.random() * this.unit.hitArea.width -
                t.width / 2),
              (t.y =
                this.unit.y +
                Math.random() * this.unit.hitArea.height -
                t.height / 2),
              this.addChild(t),
              t.play(),
              AudioManager.play("se_explosion");
          },
          null,
          this
        );
      var e = this.unit.x,
        o = this.unit.y;
      new TimelineMax()
        .call(
          function () {
            (this.unit.x = e + 4), (this.unit.y = o + -2);
          },
          null,
          this,
          "+=0.0"
        )
        .call(
          function () {
            (this.unit.x = e + -3), (this.unit.y = o + 1);
          },
          null,
          this,
          "+=0.08"
        )
        .call(
          function () {
            (this.unit.x = e + 2), (this.unit.y = o + -1);
          },
          null,
          this,
          "+=0.07"
        )
        .call(
          function () {
            (this.unit.x = e + -2), (this.unit.y = o + 1);
          },
          null,
          this,
          "+=0.05"
        )
        .call(
          function () {
            (this.unit.x = e + 1), (this.unit.y = o + 1);
          },
          null,
          this,
          "+=0.05"
        )
        .call(
          function () {
            (this.unit.x = e + 0), (this.unit.y = o + 0);
          },
          null,
          this,
          "+=0.04"
        )
        .call(
          function () {
            (this.unit.x = e + 4), (this.unit.y = o + -2);
          },
          null,
          this,
          "+=0.0"
        )
        .call(
          function () {
            (this.unit.x = e + -3), (this.unit.y = o + 1);
          },
          null,
          this,
          "+=0.08"
        )
        .call(
          function () {
            (this.unit.x = e + 2), (this.unit.y = o + -1);
          },
          null,
          this,
          "+=0.07"
        )
        .call(
          function () {
            (this.unit.x = e + -2), (this.unit.y = o + 1);
          },
          null,
          this,
          "+=0.05"
        )
        .call(
          function () {
            (this.unit.x = e + 1), (this.unit.y = o + 1);
          },
          null,
          this,
          "+=0.05"
        )
        .call(
          function () {
            (this.unit.x = e + 0), (this.unit.y = o + 0);
          },
          null,
          this,
          "+=0.04"
        )
        .to(this.unit, 1, {
          delay: 0.5,
          alpha: 0,
        }),
        this.onDead();
    }
  }

  explosionComplete(t) {
    this.removeChild(t),
      4 == this.explotionCnt &&
        (this.unit.removeChild(this.shadow), this.removeChild(this.unit)),
      this.explotionCnt++;
  }

  castAdded(t) {
    super.castAdded(t);
    this.scene.time.addEvent({
      callback: () => {
        (this.unit.x = i.GAME_WIDTH / 2 - this.unit.width / 2),
          (this.unit.y = -298),
          (this.moveFlg = !0);
      },
    });
  }

  // removedFromScene(t) {
  //   super.castRemoved(t);
  // }
}

export class Bison extends Boss {
  constructor(t) {
    super(t);
    var o = this;
    if ("object" !== typeof t.anim.idle[0]) {
      for (var i = 0; i < t.anim.idle.length; i++) {
        var n = PIXI.Texture.fromFrame(t.anim.idle[i]);
        t.anim.idle[i] = n;
      }
      for (var a = 0; a < t.anim.attack.length; a++) {
        var s = PIXI.Texture.fromFrame(t.anim.attack[a]);
        t.anim.attack[a] = s;
      }
    }
    return (
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        10,
        20,
        // o.unit.width - 20,
        // o.unit.height - 30
        o.unit.width + 20,
        o.unit.height + 30
      )),
      (o.dengerousBalloon.y = 20),
      o
    );
  }

  update() {
    this.moveFlg
      ? (this.unit.y >= i.GAME_HEIGHT / 4 &&
          ((this.unit.y = i.GAME_HEIGHT / 4), (this.moveFlg = !1)),
        (this.unit.y += 1))
      : (this.shootOn &&
          this.bulletFrameCnt % this.interval == 0 &&
          ((this.shootOn = !1),
          AudioManager.play("boss_bison_voice_add"),
          TweenMax.delayedCall(
            1,
            function () {
              this.shootStart();
            }.bind(this)
          )),
        this.bulletFrameCnt++);
  }

  shootStart() {
    this.tlShoot && this.tlShoot.kill();
    var t = i.GAME_HEIGHT / 4,
      e = i.GAME_HEIGHT - this.unit.height + 30;
    this.tlShoot = new TimelineMax({
      delay: 0.5,
      onComplete: this.shootStart,
      onCompleteScope: this,
    });
    var o = Math.random();
    if (o >= 0 && 0.6 >= o) {
      var n =
        Math.random() > 0.6
          ? i.GAME_CENTER - this.unit.hitArea.width / 2
          : (i.GAME_WIDTH - this.unit.hitArea.width) * Math.random();
      this.tlShoot.to(this.unit, 0.3, {
        x: n,
      }),
        this.tlShoot.addCallback(this.onStraightAttack, "+=0", null, this),
        this.tlShoot.to(this.unit, 0.5, {
          y: t - 10,
        }),
        this.tlShoot.addCallback(this.onStraightAttackVoice, "+=0", null, this),
        this.tlShoot.to(this.unit, 0.35, {
          y: e,
        }),
        this.tlShoot.to(this.unit, 0.2, {
          y: t,
        }),
        this.tlShoot.addCallback(this.onIdle, "+=0.05", null, this),
        this.tlShoot.addCallback(function () {}, "+=0.5", null, this);
    } else
      o >= 0.61 && 0.8 >= o
        ? (this.tlShoot.to(this.unit, 0.4, {
            x: 0,
            y: t - 20,
          }),
          this.tlShoot.to(
            this.unit,
            0.4,
            {
              x: 170,
              y: t + 0,
            },
            "+=0.2"
          ),
          this.tlShoot.addCallback(this.onFaintVoice, "-=0.2", null, this),
          this.tlShoot.to(this.unit, 0.4, {
            x: 0,
            y: t + 30,
          }),
          this.tlShoot.to(this.unit, 0.4, {
            x: 170,
            y: t + 60,
          }),
          this.tlShoot.addCallback(this.onFaintAttack, "+=0", null, this),
          this.tlShoot.to(
            this.unit,
            0.3,
            {
              x: 170,
              y: e,
            },
            "+=0.2"
          ),
          this.tlShoot.to(this.unit, 0.2, {
            y: t,
          }),
          this.tlShoot.addCallback(this.onIdle, "+=0.05", null, this),
          this.tlShoot.addCallback(function () {}, "+=1", null, this))
        : o >= 0.81 &&
          1 >= o &&
          (this.tlShoot.to(this.unit, 0.4, {
            x: 170,
            y: t - 20,
          }),
          this.tlShoot.to(
            this.unit,
            0.4,
            {
              x: 0,
              y: t + 0,
            },
            "+=0.2"
          ),
          this.tlShoot.addCallback(this.onFaintVoice, "-=0.2", null, this),
          this.tlShoot.to(this.unit, 0.4, {
            x: 170,
            y: t + 30,
          }),
          this.tlShoot.to(this.unit, 0.4, {
            x: 0,
            y: t + 60,
          }),
          this.tlShoot.addCallback(this.onFaintAttack, "+=0", null, this),
          this.tlShoot.to(
            this.unit,
            0.3,
            {
              x: 0,
              y: e,
            },
            "+=0.2"
          ),
          this.tlShoot.to(this.unit, 0.2, {
            y: t,
          }),
          this.tlShoot.addCallback(this.onIdle, "+=0.05", null, this),
          this.tlShoot.addCallback(function () {}, "+=1", null, this));
  }

  onIdle() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle),
      this.character.play(),
      this.shadow.play();
  }

  onStraightAttack() {
    (this.character.textures = this.animList.attack),
      (this.shadow.textures = this.animList.attack),
      this.character.play(),
      this.shadow.play();
  }

  onStraightAttackVoice() {
    AudioManager.play("boss_bison_voice_punch");
  }

  onFaintVoice() {
    AudioManager.play("boss_bison_voice_faint");
  }

  onFaintAttack() {
    (this.character.textures = this.animList.attack),
      (this.shadow.textures = this.animList.attack),
      this.character.play(),
      this.shadow.play(),
      AudioManager.play("boss_bison_voice_faint_punch");
  }

  onDead() {
    this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill()),
      AudioManager.play("boss_bison_voice_ko");
  }

  castAdded(t) {
    console.log("[Bison] castAdded");
    super.castAdded(t), (this.tlShoot = new TimelineMax());
  }

  castRemoved(t) {
    console.log("[Bison] castRemoved", t);
    super.castRemoved(t),
      this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill());
  }
}

export class Barlog extends Boss {
  constructor(t) {
    super(t);

    var o = this;

    if ("object" !== typeof t.anim.idle[0]) {
      for (var i = 0; i < t.anim.idle.length; i++) {
        var n = PIXI.Texture.fromFrame(t.anim.idle[i]);
        t.anim.idle[i] = n;
      }
      for (var a = 0; a < t.anim.charge.length; a++) {
        var s = PIXI.Texture.fromFrame(t.anim.charge[a]);
        t.anim.charge[a] = s;
      }
      for (var r = 0; r < t.anim.attack.length; r++) {
        var h = PIXI.Texture.fromFrame(t.anim.attack[r]);
        t.anim.attack[r] = h;
      }
      for (var l = 0; l < t.anim.shoot.length; l++) {
        var u = PIXI.Texture.fromFrame(t.anim.shoot[l]);
        t.anim.shoot[l] = u;
      }
      for (var c = 0; c < t.tamaData.texture.length; c++)
        t.tamaData.texture[c] = PIXI.Texture.fromFrame(t.tamaData.texture[c]);
    }

    return (
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        30,
        20,
        o.unit.width + 60,
        o.unit.height + 30
      )),
      (o.dengerousBalloon.x = 30),
      (o.dengerousBalloon.y = 20),
      o
    );
  }

  update() {
    this.moveFlg
      ? (this.unit.y >= i.GAME_HEIGHT / 4 &&
          ((this.unit.y = i.GAME_HEIGHT / 4), (this.moveFlg = !1)),
        (this.unit.y += 1))
      : (this.shootOn &&
          this.bulletFrameCnt % this.interval == 0 &&
          ((this.shootOn = !1),
          this.character.stop(),
          this.shadow.stop(),
          AudioManager.play("boss_barlog_voice_add"),
          TweenMax.delayedCall(
            1,
            function () {
              this.shootStart();
            }.bind(this)
          )),
        this.bulletFrameCnt++);
  }

  shootStart() {
    var t = D.player.unit,
      e = this.unit.width - this.unit.hitArea.width,
      o = t.x + t.width / 2 - this.unit.width / 2;
    o - e / 2 <= -e / 2 && (o = -e / 2),
      o >= i.GAME_WIDTH - this.unit.hitArea.width - e / 2 &&
        (o = i.GAME_WIDTH - this.unit.hitArea.width - e / 2);
    var n = i.GAME_HEIGHT / 4,
      a = i.GAME_HEIGHT - this.unit.height + 34;
    this.tlShoot && this.tlShoot.kill(),
      (this.tlShoot = new TimelineMax({
        delay: 0.5,
        onComplete: this.shootStart,
        onCompleteScope: this,
      }));
    var s = Math.random();
    if (s >= 0 && 0.3 >= s) {
      var r = Math.random() * (i.GAME_WIDTH - this.unit.width),
        h = Math.random() * (i.GAME_HEIGHT - 400) + 60;
      this.tlShoot.addCallback(this.onMove, "+=0.0", null, this),
        this.tlShoot.to(this.unit, 0.6, {
          x: r,
          y: h,
        }),
        this.tlShoot.addCallback(this.onMoveStop, "+=0.1", null, this);
    } else
      s >= 0.31 && 0.8 >= s
        ? (this.tlShoot.addCallback(this.onMove, "+=0.0", null, this),
          this.tlShoot.to(this.unit, 0.3, {
            x: o,
          }),
          this.tlShoot.addCallback(this.onShoot, "+=0.4", null, this),
          this.tlShoot.addCallback(this.onMoveStop, "+=0.5", null, this))
        : s >= 0.81 &&
          1 >= s &&
          (this.tlShoot.addCallback(this.onMove, "+=0.0", null, this),
          this.tlShoot.to(this.unit, 0.5, {
            x: o,
          }),
          this.tlShoot.addCallback(this.onCharge, "+=0.0", null, this),
          this.tlShoot.addCallback(this.onAttack, "+=0.7", null, this),
          this.tlShoot.to(
            this.unit,
            0.3,
            {
              y: n - 70,
            },
            "+=0.0"
          ),
          this.tlShoot.to(
            this.unit,
            0.6,
            {
              y: a,
            },
            "+=0.1"
          ),
          this.tlShoot.to(
            this.unit,
            0.2,
            {
              y: n,
            },
            "+=0.0"
          ),
          this.tlShoot.addCallback(this.onMoveStop, "+=0.0", null, this));
  }

  onMove() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle),
      this.character.play(),
      this.shadow.play();
  }

  onMoveStop() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle),
      this.character.stop(),
      this.shadow.stop();
  }

  onIdle() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle);
  }

  onCharge() {
    (this.character.textures = this.animList.charge),
      (this.shadow.textures = this.animList.charge),
      this.character.play(),
      this.shadow.play();
  }

  onAttack() {
    (this.character.textures = this.animList.attack),
      (this.shadow.textures = this.animList.attack),
      this.character.play(),
      this.shadow.play(),
      AudioManager.play("boss_barlog_voice_barcelona");
  }

  onAttackVoice() {}

  onShoot() {
    (this.character.textures = this.animList.shoot),
      (this.shadow.textures = this.animList.shoot),
      this.character.play(),
      this.shadow.play(),
      this.shoot(),
      AudioManager.play("boss_barlog_voice_tama");
  }

  onDead() {
    this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill()),
      AudioManager.play("boss_barlog_voice_ko");
  }

  castAdded(t) {
    console.log("[Barlog] castAdded", t);
    super.castAdded(t), (this.tlShoot = new TimelineMax());
  }

  castRemoved(t) {
    console.log("[Barlog] castRemoved", t);
    super.castRemoved(t),
      this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill());
  }
}

class Sagat extends Boss {
  constructor(t) {
    super(t);

    var o = this;

    if ("object" !== typeof t.anim.idle[0]) {
      for (var i = 0; i < t.anim.idle.length; i++) {
        var n = PIXI.Texture.fromFrame(t.anim.idle[i]);
        t.anim.idle[i] = n;
      }
      for (var a = 0; a < t.anim.charge.length; a++) {
        var s = PIXI.Texture.fromFrame(t.anim.charge[a]);
        t.anim.charge[a] = s;
      }
      for (var r = 0; r < t.anim.shoot.length; r++) {
        var h = PIXI.Texture.fromFrame(t.anim.shoot[r]);
        t.anim.shoot[r] = h;
      }
      for (var l = 0; l < t.anim.attack.length; l++) {
        var u = PIXI.Texture.fromFrame(t.anim.attack[l]);
        t.anim.attack[l] = u;
      }
      for (var c = 0; c < t.tamaDataA.texture.length; c++)
        t.tamaDataA.texture[c] = PIXI.Texture.fromFrame(t.tamaDataA.texture[c]);
      for (var f = 0; f < t.tamaDataB.texture.length; f++)
        t.tamaDataB.texture[f] = PIXI.Texture.fromFrame(t.tamaDataB.texture[f]);
    }

    return (
      (o.tamaDataA = t.tamaDataA),
      (o.tamaDataB = t.tamaDataB),
      (o.tamaData = o.tamaDataA),
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        20,
        20,
        o.unit.width + 40,
        o.unit.height + 20
      )),
      o
    );
  }

  update() {
    this.moveFlg
      ? (this.unit.y >= i.GAME_HEIGHT / 4 &&
          ((this.unit.y = i.GAME_HEIGHT / 4), (this.moveFlg = !1)),
        (this.unit.y += 1))
      : (this.shootOn &&
          this.bulletFrameCnt % this.interval == 0 &&
          ((this.shootOn = !1),
          AudioManager.play("boss_sagat_voice_add"),
          TweenMax.delayedCall(
            1,
            function () {
              this.shootStart();
            }.bind(this)
          )),
        this.bulletFrameCnt++);
  }

  shootStart() {
    this.tlShoot && this.tlShoot.kill();
    var t = D.player.unit,
      e = this.unit.width - this.unit.hitArea.width,
      o = t.x + t.width / 2 - this.unit.width / 2;
    o - e / 2 <= -e / 2 && (o = -e / 2),
      o >= i.GAME_WIDTH - this.unit.hitArea.width - e / 2 &&
        (o = i.GAME_WIDTH - this.unit.hitArea.width - e / 2);
    var n = i.GAME_HEIGHT / 4,
      a = i.GAME_HEIGHT - this.unit.height + 70;
    this.tlShoot = new TimelineMax({
      delay: 0.5,
      onComplete: this.shootStart,
      onCompleteScope: this,
    });
    var s = Math.random();
    s >= 0 && 0.3 >= s
      ? ((this.tamaData = this.tamaDataA),
        this.tlShoot.to(this.unit, 0.25, {
          x: -20,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.25", null, this),
        this.tlShoot.to(this.unit, 0.25, {
          x: 10,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.25", null, this),
        this.tlShoot.to(this.unit, 0.25, {
          x: 35,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.25", null, this),
        this.tlShoot.to(this.unit, 0.25, {
          x: 80,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.25", null, this),
        this.tlShoot.to(this.unit, 0.25, {
          x: 120,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.25", null, this),
        this.tlShoot.to(this.unit, 0.25, {
          x: 160,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.25", null, this),
        this.tlShoot.addCallback(
          function () {
            this.onIdle();
          },
          "+=0.3",
          null,
          this
        ))
      : s >= 0.31 && 0.6 >= s
      ? ((this.tamaData = this.tamaDataA),
        this.tlShoot.to(this.unit, 0.25, {
          x: o,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onCharge, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onCharge, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onCharge, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onCharge, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onCharge, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onCharge, "+=0.2", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.2", null, this),
        this.tlShoot.addCallback(
          function () {
            this.onIdle();
          },
          "+=0.3",
          null,
          this
        ))
      : s >= 0.61 && 0.8 >= s
      ? ((this.tamaData = this.tamaDataB),
        this.tlShoot.to(this.unit, 0.25, {
          x: o,
        }),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onBigShoot, "+=1.3", null, this),
        this.tlShoot.addCallback(
          function () {
            this.onIdle();
          },
          "+=0.3",
          null,
          this
        ))
      : s >= 0.81 &&
        1 >= s &&
        (this.tlShoot.to(this.unit, 0.4, {
          x: o,
          y: n - 20,
        }),
        this.tlShoot.addCallback(this.onTigerKnee, "+=0.0", null, this),
        this.tlShoot.to(
          this.unit,
          0.3,
          {
            y: a,
          },
          "+=0.5"
        ),
        this.tlShoot.addCallback(this.onTigerKneeVoice, "-=0.2", null, this),
        this.tlShoot.to(
          this.unit,
          0.2,
          {
            y: n,
          },
          "+=0.05"
        ),
        this.tlShoot.addCallback(this.onIdle, "+=0.0", null, this));
  }

  onCharge() {
    (this.character.textures = this.animList.charge),
      (this.shadow.textures = this.animList.charge),
      this.character.play(),
      this.shadow.play();
  }

  onShoot() {
    (this.character.textures = this.animList.shoot),
      (this.shadow.textures = this.animList.shoot),
      this.character.play(),
      this.shadow.play(),
      this.shoot(),
      AudioManager.play("boss_sagat_voice_tama0");
  }

  onBigShoot() {
    (this.character.textures = this.animList.shoot),
      (this.shadow.textures = this.animList.shoot),
      this.character.play(),
      this.shadow.play(),
      this.shoot(),
      AudioManager.play("boss_sagat_voice_tama1");
  }

  onIdle() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle),
      this.character.play(),
      this.shadow.play();
  }

  onTigerKnee() {
    (this.character.textures = this.animList.attack),
      (this.shadow.textures = this.animList.attack);
  }

  onTigerKneeVoice() {
    AudioManager.play("boss_sagat_voice_kick");
  }

  onDead() {
    this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill()),
      AudioManager.play("boss_sagat_voice_ko");
  }

  castAdded(t) {
    super.castAdded(t), (this.tlShoot = new TimelineMax());
  }

  castRemoved(t) {
    super.castRemoved(t),
      this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill());
  }
}

class Vega extends Boss {
  constructor(t) {
    super(t);

    var o = this;

    if ("object" !== typeof t.anim.idle[0]) {
      for (var i = 0; i < t.anim.idle.length; i++) {
        var n = PIXI.Texture.fromFrame(t.anim.idle[i]);
        t.anim.idle[i] = n;
      }
      for (var a = 0; a < t.anim.attack.length; a++) {
        var s = PIXI.Texture.fromFrame(t.anim.attack[a]);
        t.anim.attack[a] = s;
      }
      for (var r = 0; r < t.anim.shoot.length; r++) {
        var h = PIXI.Texture.fromFrame(t.anim.shoot[r]);
        t.anim.shoot[r] = h;
      }
      for (var l = 0; l < t.tamaDataA.texture.length; l++)
        t.tamaDataA.texture[l] = PIXI.Texture.fromFrame(t.tamaDataA.texture[l]);
      for (var u = 0; u < t.tamaDataB.texture.length; u++)
        t.tamaDataB.texture[u] = PIXI.Texture.fromFrame(t.tamaDataB.texture[u]);
      (t.tamaDataB.name = "psychoField"), (t.tamaData = t.tamaDataA);
    }

    return (
      (o.tamaDataA = t.tamaDataA),
      (o.tamaDataB = t.tamaDataB),
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        20,
        13,
        o.unit.width + 40,
        o.unit.height + 20
      )),
      (o.dengerousBalloon.y = 15),
      // o.vegaBlur = new PIXI.filters.BlurFilter,
      // o.vegaBlur.blur = 0,
      // o.character.filters = [o.vegaBlur],
      (o.gokiFlg = t.gokiFlg),
      o
    );
  }

  static CUSTOM_EVENT_GOKI = "customEventGoki";

  update() {
    this.moveFlg
      ? (this.unit.y >= i.GAME_HEIGHT / 4 &&
          ((this.unit.y = i.GAME_HEIGHT / 4), (this.moveFlg = !1)),
        (this.unit.y += 1))
      : (this.shootOn &&
          this.bulletFrameCnt % this.interval == 0 &&
          ((this.shootOn = !1),
          this.gokiFlg
            ? this.emit(Vega.CUSTOM_EVENT_GOKI)
            : (AudioManager.play("boss_vega_voice_add"),
              TweenMax.delayedCall(
                1,
                function () {
                  this.shootStart();
                }.bind(this)
              ))),
        this.bulletFrameCnt++);
  }

  shootStart() {
    this.tlShoot && this.tlShoot.kill();
    var t = D.player.unit,
      e = this.unit.width - this.unit.hitArea.width,
      o = t.x + t.width / 2 - this.unit.width / 2;
    o - e / 2 <= -e / 2 && (o = -e / 2),
      o >= i.GAME_WIDTH - this.unit.hitArea.width - e / 2 &&
        (o = i.GAME_WIDTH - this.unit.hitArea.width - e / 2);
    var n = i.GAME_HEIGHT / 4;
    this.tlShoot = new TimelineMax({
      delay: 0.5,
      onComplete: this.shootStart,
      onCompleteScope: this,
    });
    var a = Math.random();
    a >= 0 && 0.1 >= a
      ? (this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 10,
        }),
        this.tlShoot.addCallback(this.onWarp, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            this.unit.x = 0;
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(
          this.vegaBlur,
          0.1,
          {
            blur: 10,
          },
          "+=0.2"
        ),
        this.tlShoot.addCallback(
          function () {
            this.unit.x = i.GAME_WIDTH - this.unit.width;
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(
          this.vegaBlur,
          0.1,
          {
            blur: 10,
          },
          "+=0.2"
        ),
        this.tlShoot.addCallback(
          function () {
            this.unit.x = Math.floor(
              Math.random() * (i.GAME_WIDTH - this.unit.width)
            );
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.addCallback(function () {}, "+=0.5", null, this))
      : a >= 0.11 && 0.4 >= a
      ? ((this.tamaData = this.tamaDataA),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = 0),
              AudioManager.play("boss_vega_voice_tama"),
              this.onPsychoShoot();
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          delay: 0.3,
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = 160), this.onPsychoShoot();
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          delay: 0.3,
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = 16), this.onPsychoShoot();
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          delay: 0.3,
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = 128),
              AudioManager.play("boss_vega_voice_tama"),
              this.onPsychoShoot();
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          delay: 0.3,
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = 32), this.onPsychoShoot();
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          delay: 0.3,
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = 96), this.onPsychoShoot();
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          delay: 0.3,
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = i.GAME_CENTER - this.unit.width / 2),
              AudioManager.play("boss_vega_voice_tama"),
              this.onPsychoShoot();
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.addCallback(function () {}, "+=4.0", null, this))
      : a >= 0.41 && 0.7 >= a
      ? ((this.tamaData = this.tamaDataB),
        this.tlShoot.to(this.unit, 0.3, {
          x: i.GAME_CENTER - this.unit.width / 2,
          y: n + 10,
        }),
        this.tlShoot.addCallback(
          function () {
            this.onPsychoFieldAttack();
          },
          "+=0.5",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onPsychoShoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.onPsychoShoot, "+=1", null, this),
        this.tlShoot.addCallback(this.onPsychoShoot, "+=1", null, this),
        this.tlShoot.addCallback(this.onPsychoShoot, "+=1", null, this),
        this.tlShoot.addCallback(this.onPsychoShoot, "+=1", null, this),
        this.tlShoot.addCallback(this.onIdle, "+=0.0", null, this),
        this.tlShoot.addCallback(function () {}, "+=3.0", null, this))
      : a >= 0.71 &&
        1 >= a &&
        (this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 15,
        }),
        this.tlShoot.addCallback(
          function () {
            this.unit.x = o;
          },
          "+=0",
          null,
          this
        ),
        this.tlShoot.to(this.vegaBlur, 0.1, {
          blur: 0,
        }),
        this.tlShoot.to(this.unit, 0.2, {
          y: n - 20,
        }),
        this.tlShoot.addCallback(this.onAttack, "+=0", null, this),
        this.tlShoot.to(this.unit, 0.9, {
          y: i.GAME_HEIGHT - 15,
        }),
        this.tlShoot.addCallback(this.onIdle, "+=0.0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.unit.x = i.GAME_CENTER - this.unit.width / 2),
              (this.unit.y = -this.unit.height);
          },
          "+=0.0",
          null,
          this
        ),
        this.tlShoot.to(this.unit, 1, {
          y: n,
        }),
        this.tlShoot.addCallback(function () {}, "+=1", null, this));
  }

  onIdle() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle),
      this.character.play(),
      this.shadow.play();
  }

  onPsychoShoot() {
    this.shoot();
  }

  onPsychoFieldShoot() {
    this.shoot();
  }

  onWarp() {
    AudioManager.play("boss_vega_voice_warp");
  }

  onAttack() {
    AudioManager.play("boss_vega_voice_crusher"),
      (this.character.textures = this.animList.attack),
      (this.shadow.textures = this.animList.attack),
      this.character.play(),
      this.shadow.play();
  }

  onPsychoFieldAttack() {
    AudioManager.play("boss_vega_voice_shoot"),
      (this.character.textures = this.animList.shoot),
      (this.shadow.textures = this.animList.shoot),
      this.character.play(),
      this.shadow.play();
  }

  onDead() {
    this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill()),
      AudioManager.play("boss_vega_voice_ko");
  }

  castAdded(t) {
    super.castAdded(t), (this.tlShoot = new TimelineMax());
  }

  castRemoved(t) {
    super.castRemoved(t),
      this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill());
  }
}

export class Goki extends Boss {
  constructor(t) {
    super(t);

    var o = this;

    if ("object" !== typeof t.anim.idle[0]) {
      for (var i = 0; i < t.anim.idle.length; i++) {
        var n = PIXI.Texture.fromFrame(t.anim.idle[i]);
        t.anim.idle[i] = n;
      }
      for (var a = 0; a < t.anim.syngoku.length; a++) {
        var s = PIXI.Texture.fromFrame(t.anim.syngoku[a]);
        t.anim.syngoku[a] = s;
      }
      for (var r = 0; r < t.anim.syngokuFinish.length; r++) {
        var h = PIXI.Texture.fromFrame(t.anim.syngokuFinish[r]);
        t.anim.syngokuFinish[r] = h;
      }
      for (var l = 0; l < t.anim.syngokuFinishTen.length; l++) {
        var u = PIXI.Texture.fromFrame(t.anim.syngokuFinishTen[l]);
        t.anim.syngokuFinishTen[l] = u;
      }
      for (var c = 0; c < t.anim.shootA.length; c++) {
        var f = PIXI.Texture.fromFrame(t.anim.shootA[c]);
        t.anim.shootA[c] = f;
      }
      for (var d = 0; d < t.anim.shootB.length; d++) {
        var p = PIXI.Texture.fromFrame(t.anim.shootB[d]);
        t.anim.shootB[d] = p;
      }
      for (var m = 0; m < t.tamaDataA.texture.length; m++)
        t.tamaDataA.texture[m] = PIXI.Texture.fromFrame(t.tamaDataA.texture[m]);
      for (var y = 0; y < t.tamaDataB.texture.length; y++)
        t.tamaDataB.texture[y] = PIXI.Texture.fromFrame(t.tamaDataB.texture[y]);
      t.tamaData = t.tamaDataA;
    }

    (t.tamaDataA.explosion = t.explosion),
      (t.tamaDataB.explosion = t.explosion),
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        15,
        20,
        o.unit.width + 30,
        o.unit.height + 24
      )),
      (o.dengerousBalloon.x = 5),
      (o.dengerousBalloon.y = 20),
      (o.tamaDataA = t.tamaDataA),
      (o.tamaDataB = t.tamaDataB),
      (o.shungokuHitEffectTextureList = []);
    for (var g = 0; g < 5; g++)
      o.shungokuHitEffectTextureList[g] = PIXI.Texture.fromFrame(
        "hit" + String(g) + ".gif"
      );
    return o;
  }

  update() {}

  shootStart() {
    this.tlShoot && this.tlShoot.kill();
    var t = D.player.unit,
      e = this.unit.width - this.unit.hitArea.width,
      o = t.x + t.width / 2 - this.unit.width / 2;
    o - e / 2 <= -e / 2 && (o = -e / 2),
      o >= i.GAME_WIDTH - this.unit.hitArea.width - e / 2 &&
        (o = i.GAME_WIDTH - this.unit.hitArea.width - e / 2),
      (this.tlShoot = new TimelineMax({
        delay: 0.5,
        onComplete: this.shootStart,
        onCompleteScope: this,
      }));
    var n = Math.random();
    if (n >= 0 && 0.34 >= n)
      this.tlShoot.to(this.unit, 0.4, {
        x: o,
      }),
        this.tlShoot.addCallback(this.onShootA, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.tamaData = this.tamaDataA),
              AudioManager.play("boss_goki_voice_tama0"),
              this.shoot();
          },
          "+=0.32",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onShootA, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.tamaData = this.tamaDataA), this.shoot();
          },
          "+=0.32",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onShootA, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.tamaData = this.tamaDataA),
              AudioManager.play("boss_goki_voice_tama0"),
              this.shoot();
          },
          "+=0.32",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onShootA, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.tamaData = this.tamaDataA), this.shoot();
          },
          "+=0.32",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onShootA, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.tamaData = this.tamaDataA),
              AudioManager.play("boss_goki_voice_tama0"),
              this.shoot();
          },
          "+=0.32",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onShootA, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.tamaData = this.tamaDataA), this.shoot();
          },
          "+=0.32",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onIdle, "+=0.3", null, this);
    else if (n >= 0.35 && 0.64 >= n)
      this.tlShoot.to(this.unit, 0.4, {
        x: o,
      }),
        this.tlShoot.addCallback(this.onShootB, "+=0", null, this),
        this.tlShoot.addCallback(
          function () {
            (this.tamaData = this.tamaDataB), this.shoot();
          },
          "+=0.4",
          null,
          this
        ),
        this.tlShoot.addCallback(this.onIdle, "+=0.8", null, this);
    else if (n >= 0.65 && 0.89 >= n)
      this.tlShoot.addCallback(this.ashuraSenku, "+=0.4", null, this),
        this.tlShoot.to(this.unit, 1.2, {
          y: i.GAME_HEIGHT - this.unit.height + 80,
        }),
        this.tlShoot.to(
          this.unit,
          0.7,
          {
            x: Math.random() * (i.GAME_WIDTH - this.unit.width),
            y: i.GAME_HEIGHT / 4,
          },
          "+=0.2"
        ),
        this.tlShoot.addCallback(this.onIdle, "+=0.3", null, this);
    else if (n >= 0.9 && 1 >= n) {
      var a = Math.random > 0.5 ? 60 : i.GAME_HEIGHT / 4;
      this.tlShoot.addCallback(this.ashuraSenku, "+=0", null, this),
        this.tlShoot.to(this.unit, 0.7, {
          x: Math.random() * (i.GAME_WIDTH - this.unit.width),
          y: a,
        }),
        this.tlShoot.addCallback(this.onIdle, "+=0.3", null, this);
    }
  }

  onIdle() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle),
      this.character.play(),
      this.shadow.play();
  }

  onShootA() {
    (this.character.textures = this.animList.shootA),
      (this.shadow.textures = this.animList.shootA),
      this.character.play(),
      this.shadow.play(),
      (this.character.loop = !1),
      (this.shadow.loop = !1);
  }

  onShootB() {
    (this.character.textures = this.animList.shootB),
      (this.shadow.textures = this.animList.shootB),
      this.character.play(),
      this.shadow.play(),
      (this.character.loop = !1),
      (this.shadow.loop = !1),
      AudioManager.play("boss_goki_voice_tama1");
  }

  ashuraSenku() {
    (this.character.textures = this.animList.syngoku),
      (this.shadow.textures = this.animList.syngoku),
      this.character.play(),
      this.shadow.play(),
      (this.character.loop = !1),
      (this.shadow.loop = !1),
      AudioManager.play("boss_goki_voice_ashura");
  }

  toujou() {
    AudioManager.play("boss_goki_voice_add");
  }

  shungokusatsu(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    AudioManager.play("boss_goki_voice_syungokusatu0");
    var o = new PIXI.Graphics(window.gameScene);
    // o.beginFill(0),
    o.fill(0),
      // o.drawRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      o.fillRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      // o.endFill(),
      this.addChild(o);
    var n = new PIXI.Graphics(window.gameScene);
    // n.beginFill(16777215),
    n.fill(16777215),
      // n.drawRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      n.fillRect(0, 0, i.GAME_WIDTH, i.GAME_HEIGHT),
      // n.endFill(),
      (n.alpha = 0),
      this.addChild(n);
    for (var a = new TimelineMax(), s = 0; s < 10; s++)
      a.addCallback(
        function () {
          var e = new PIXI.extras.AnimatedSprite(
            window.gameScene,
            this.shungokuHitEffectTextureList,
            "game_asset"
          );
          (e.x = t.x + Math.random() * t.width),
            (e.y = t.y + Math.random() * (t.height / 2)),
            (e.animationSpeed = 0.15),
            (e.loop = !1),
            // e.onComplete = this.effectComplete.bind(this, e),
            e.on("animationcomplete", this.effectComplete.bind(this, e)),
            e.play(),
            AudioManager.play("se_damage"),
            this.addChild(e);
        },
        "+=" + String(0.05),
        null,
        this
      ),
        a.addCallback(
          function () {
            n.alpha = 0.2;
          },
          "+=" + String(0),
          null,
          this
        ),
        a.addCallback(
          function () {
            n.alpha = 0;
          },
          "+=" + String(0.06),
          null,
          this
        );
    a.addCallback(
      function () {
        e
          ? ((this.character.textures = this.animList.syngokuFinishTen),
            (this.shadow.textures = this.animList.syngokuFinishTen))
          : ((this.character.textures = this.animList.syngokuFinish),
            (this.shadow.textures = this.animList.syngokuFinish));
      },
      "+=0",
      null,
      this
    ),
      a.to(
        o,
        0.3,
        {
          alpha: 0,
        },
        "+=0.7"
      ),
      a.addCallback(
        function () {
          AudioManager.play("boss_goki_voice_syungokusatu1");
        },
        "-=0.15",
        null,
        this
      ),
      a.addCallback(
        function () {
          (this.character.textures = this.animList.idle),
            (this.shadow.textures = this.animList.idle),
            this.character.play(),
            this.shadow.play(),
            (this.character.loop = !0),
            (this.shadow.loop = !0);
        },
        "+=1.5",
        null,
        this
      );
  }

  effectComplete(t) {
    (t.alpha = 0), this.removeChild(t);
  }

  onDead() {
    this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill()),
      AudioManager.play("boss_goki_voice_ko");
  }

  castAdded(t) {
    super.castAdded(t),
      (this.tlShoot = new TimelineMax()),
      (this.character.textures = this.animList.syngoku),
      (this.shadow.textures = this.animList.syngoku),
      this.character.play(),
      this.shadow.play(),
      (this.character.loop = !1),
      (this.shadow.loop = !1);
  }

  castRemoved(t) {
    super.castRemoved(t),
      this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill());
  }
}

export class Fang extends Boss {
  constructor(t) {
    super(t);

    var o = this;

    if ("object" !== typeof t.anim.idle[0]) {
      for (var i = 0; i < t.anim.idle.length; i++) {
        var n = PIXI.Texture.fromFrame(t.anim.idle[i]);
        t.anim.idle[i] = n;
      }
      for (var a = 0; a < t.anim.wait.length; a++) {
        var s = PIXI.Texture.fromFrame(t.anim.wait[a]);
        t.anim.wait[a] = s;
      }
      for (var r = 0; r < t.anim.charge.length; r++) {
        var h = PIXI.Texture.fromFrame(t.anim.charge[r]);
        t.anim.charge[r] = h;
      }
      for (var l = 0; l < t.anim.shoot.length; l++) {
        var u = PIXI.Texture.fromFrame(t.anim.shoot[l]);
        t.anim.shoot[l] = u;
      }
      for (var c = 0; c < t.tamaDataA.texture.length; c++)
        t.tamaDataA.texture[c] = PIXI.Texture.fromFrame(t.tamaDataA.texture[c]);
      (t.tamaDataA.name = "beam"), (t.tamaDataA.cnt = 0);
      for (var f = 0; f < t.tamaDataB.texture.length; f++)
        t.tamaDataB.texture[f] = PIXI.Texture.fromFrame(t.tamaDataB.texture[f]);
      (t.tamaDataB.name = "smoke"), (t.tamaDataB.cnt = 0);
      for (var d = 0; d < t.tamaDataC.texture.length; d++)
        t.tamaDataC.texture[d] = PIXI.Texture.fromFrame(t.tamaDataC.texture[d]);
      (t.tamaDataC.name = "meka"), (t.tamaData = t.tamaDataA);
    }

    return (
      (o.unit.hitArea = new PIXI.Rectangle(
        window.gameScene,
        35,
        55,
        o.unit.width + 70,
        o.unit.height + 70
      )),
      (o.dengerousBalloon.x = 70),
      (o.dengerousBalloon.y = 40),
      (o.tamaDataA = t.tamaDataA),
      (o.tamaDataB = t.tamaDataB),
      (o.tamaDataC = t.tamaDataC),
      o.unit.removeChild(o.shadow),
      o
    );
  }

  update() {
    this.moveFlg
      ? (this.unit.y >= 48 && (this.moveFlg = !1), (this.unit.y += 0.7))
      : (this.shootOn &&
          this.bulletFrameCnt % this.interval == 0 &&
          ((this.shootOn = !1),
          AudioManager.play("boss_fang_voice_add"),
          TweenMax.delayedCall(
            1,
            function () {
              this.shootStart();
            }.bind(this)
          )),
        this.bulletFrameCnt++);
  }

  shootStart() {
    this.tlShoot && this.tlShoot.kill(),
      (this.tlShoot = new TimelineMax({
        delay: 0.5,
        onComplete: this.shootStart,
        onCompleteScope: this,
      }));
    var t = Math.random();
    t >= 0 && 0.3 >= t
      ? ((this.tamaData = this.tamaDataA),
        this.tlShoot.addCallback(this.onCharge, "+=0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.5", null, this),
        this.tlShoot.addCallback(this.onBeamVoice2, "+=0.0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.5", null, this),
        this.tlShoot.addCallback(this.onBeamVoice2, "+=0.0", null, this),
        this.tlShoot.addCallback(this.onShoot, "+=0.5", null, this),
        this.tlShoot.addCallback(this.onBeamVoice2, "+=0.0", null, this),
        this.tlShoot.addCallback(this.onIdle, "+=0.3", null, this),
        this.tlShoot.addCallback(function () {}, "+=1", null, this))
      : t >= 0.31 && 0.7 >= t
      ? ((this.tamaData = this.tamaDataC),
        AudioManager.play("boss_fang_voice_beam1"),
        this.tlShoot.addCallback(this.shoot, "+=0.0", null, this),
        this.tlShoot.addCallback(this.onWait, "+=0.5", null, this),
        this.tlShoot.addCallback(function () {}, "+=4", null, this))
      : t >= 0.71 &&
        1 >= t &&
        ((this.tamaData = this.tamaDataB),
        this.tlShoot.addCallback(this.onSmoke, "+=0", null, this),
        this.tlShoot.addCallback(this.onWait, "+=1.0", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(this.shoot, "+=0.3", null, this),
        this.tlShoot.addCallback(function () {}, "+=7", null, this));
  }

  onCharge() {
    (this.character.textures = this.animList.charge),
      (this.shadow.textures = this.animList.charge),
      this.character.play(),
      this.shadow.play();
  }

  onBeamVoice2() {
    AudioManager.play("boss_fang_voice_beam0");
  }

  onBeamVoice() {
    AudioManager.play("boss_fang_voice_beam1");
  }

  onShoot() {
    (this.character.textures = this.animList.shoot),
      (this.shadow.textures = this.animList.shoot),
      this.character.play(),
      this.shadow.play(),
      this.shoot(),
      (this.character.loop = !1),
      (this.shadow.loop = !1);
  }

  onSmoke() {
    AudioManager.play("boss_fang_voice_tama");
  }

  onIdle() {
    (this.character.textures = this.animList.idle),
      (this.shadow.textures = this.animList.idle),
      this.character.play(),
      this.shadow.play(),
      (this.character.loop = !0),
      (this.shadow.loop = !0);
  }

  onWait() {
    (this.character.textures = this.animList.wait),
      (this.shadow.textures = this.animList.wait),
      this.character.play(),
      this.shadow.play(),
      (this.character.loop = !0),
      (this.shadow.loop = !0);
  }

  onDead() {
    this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill()),
      AudioManager.play("boss_fang_voice_ko");
  }

  castAdded(t) {
    super.castAdded(t),
      (this.tlShoot = new TimelineMax()),
      (this.unit.y = -249);
  }

  castRemoved(t) {
    super.castRemoved(t),
      this.tlShoot && (this.tlShoot.pause(), this.tlShoot.kill());
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
      (t.knockoutK = new Sprite(
        window.gameScene,
        0,
        0,
        "game_ui",
        "knockoutK.gif"
      )),
      (t.knockoutK.x = i.GAME_CENTER - t.knockoutK.width / 2),
      (t.knockoutK.y = i.GAME_MIDDLE),
      // t.knockoutK.anchor.set(0.5),
      t.knockoutK.setOrigin(0.5),
      (t.knockoutK.visible = !1),
      // (t.knockoutO = new PIXI.Sprite(PIXI.Texture.fromFrame("knockoutO.gif"))),
      (t.knockoutO = new Sprite(
        window.gameScene,
        0,
        0,
        "game_ui",
        "knockoutO.gif"
      )),
      (t.knockoutO.x = i.GAME_CENTER + t.knockoutO.width / 2),
      (t.knockoutO.y = i.GAME_MIDDLE),
      // t.knockoutO.anchor.set(0.5),
      t.knockoutO.setOrigin(0.5),
      (t.knockoutO.visible = !1),
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
        // AudioManager.play("voice_another_fighter"))
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
        // AudioManager.play(["voice_round" + n]);
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
    //       AudioManager.play("voice_fight");
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

  akebonofinish() {
    (this.knockoutK.visible = !0),
      // this.knockoutK.scale.set(0),
      this.knockoutK.setScale(0),
      (this.knockoutO.visible = !0),
      // this.knockoutO.scale.set(0);
      this.knockoutO.setScale(0);
    var t = new TimelineMax();
    // t.to(this.knockoutK.scale, .4, {
    t.to(this.knockoutK, 0.4, {
      // x: 1,
      scaleX: 1,
      // y: 1,
      scaleY: 1,
      ease: Back.easeOut,
    }),
      // t.to(this.knockoutO.scale, .4, {
      t.to(
        this.knockoutO,
        0.4,
        {
          // x: 1,
          scaleX: 1,
          // y: 1,
          scaleY: 1,
          ease: Back.easeOut,
        },
        "-=0.25"
      ),
      AudioManager.play("voice_ko"),
      AudioManager.play("se_finish_akebono");
  }

  stageClear() {
    // this.stageClearBg.visible = !0,
    // TweenMax.to(this.stageClearBg, .5, {
    //     delay: .3,
    //     alpha: 1
    // })
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
    this.akebonoBAudioManager.play();
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
