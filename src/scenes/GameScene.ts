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
      // this.title.on(Oi.EVENT_START, this.gameStart.bind(Yi(Yi(o)))),
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
      (this.player.unitY = this.player.unit.y);
  }

  update(time: number, delta: number): void {
    if (!this.theWorldFlg) {
      // this.player.loop(),
      this.player.update(),
        // this.hud.loop();
        // enemyHitTestList
        // itemHitTestList
        this.stageBg.loop(this.stageBgAmountMove); //,
    }
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
        "game_asset"
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
              ? ((this.shadow.scale.y = -1),
                (this.shadow.y = 2 * this.shadow.height - this.shadowOffsetY))
              : (this.shadow.y = this.shadow.height - this.shadowOffsetY);
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
        o.unit.width - 14,
        o.unit.height - 40
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
            this.unitX <= this.unit.input.hitArea.width / 2 &&
              (this.unitX = this.unit.input.hitArea.width / 2),
              this.unitX >= i.GAME_WIDTH - this.unit.input.hitArea.width / 2 &&
                (this.unitX = i.GAME_WIDTH - this.unit.input.hitArea.width / 2);
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
              ((o = new S(this.shootNormalData)).unit.rotation =
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
                g.stop("se_shoot"),
                g.play("se_shoot");
              break;
            case e.SHOOT_NAME_BIG:
              ((o = new S(this.shootBigData)).unit.rotation =
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
                g.stop("se_shoot_b"),
                g.play("se_shoot_b");
              break;
            case e.SHOOT_NAME_3WAY:
              for (var t = 0; t < 3; t++) {
                var o = new S(this.shoot3wayData);
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
              g.stop("se_shoot"), g.play("se_shoot");
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
                g.play("g_damage_voice"),
                g.play("se_damage");
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
            (this.explosion.onComplete = this.explosionComplete.bind(this)),
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
            this.removeChild(e);
          }
          g.play("se_explosion"), g.play("g_continue_no_voice0");
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

  castAdded(t) {}

  castRemoved(t) {
    this.akebonoBg &&
      (this.akebonoBg.destroy(), this.removeChild(this.akebonoBg)),
      this.akebonoTen &&
        (this.removeChild(this.akebonoTen),
        this.removeChild(this.akebonoTenShock)),
      this.removeChild(this.bg),
      this.removeChild(this.bgEnd);
  }
}
