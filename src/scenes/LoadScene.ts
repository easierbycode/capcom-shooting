import AudioManager from "./audio";
import Phaser from "phaser";

export const i = {
  LANG: (function () {
    switch (document.documentElement.lang) {
      case "ja":
        return "ja";
      default:
        return "en";
    }
  })(),
  // BASE_PATH: ("baseUrl"in window ? baseUrl : "http://localhost/").replace(/^https?\:\/\/[^\/]+/, "").replace(/\/api\/$/, ""),
  BASE_PATH: "",
  boss_bison_bgm_info: {
    name: "boss_bison_bgm",
    start: 914888,
    end: 6111881,
  },
  boss_barlog_bgm_info: {
    name: "boss_barlog_bgm",
    start: 782400,
    end: 4315201,
  },
  boss_sagat_bgm_info: {
    name: "boss_sagat_bgm",
    start: 1635142,
    end: 6883739,
  },
  boss_vega_bgm_info: {
    name: "boss_vega_bgm",
    start: 513529,
    end: 4325295,
  },
  boss_goki_bgm_info: {
    name: "boss_goki_bgm",
    start: 864e3,
    end: 6130287,
  },
  boss_fang_bgm_info: {
    name: "boss_fang_bgm",
    start: 888672,
    end: 5802799,
  },
  RESOURCE: {
    recipe: "assets/game.json",
    //   game_ui: "assets/game_ui.json",
    //   game_asset: "assets/game_asset.json",
    voice_titlecall: "assets/sounds/scene_title/voice_titlecall.mp3",
    se_decision: "assets/sounds/ui/se_decision.mp3",
    se_correct: "assets/sounds/ui/se_correct.mp3",
    se_cursor_sub: "assets/sounds/ui/se_cursor_sub.mp3",
    se_cursor: "assets/sounds/ui/se_cursor.mp3",
    se_over: "assets/sounds/ui/se_over.mp3",
    adventure_bgm: "assets/sounds/scene_adventure/adventure_bgm.mp3",
    g_adbenture_voice0: "assets/sounds/scene_adventure/g_adbenture_voice0.mp3",
    voice_thankyou: "assets/sounds/voice_thankyou.mp3",
    se_explosion: "assets/sounds/se_explosion.mp3",
    se_shoot: "assets/sounds/se_shoot.mp3",
    se_shoot_b: "assets/sounds/se_shoot_b.mp3",
    se_ca: "assets/sounds/se_ca.mp3",
    se_ca_explosion: "assets/sounds/se_ca_explosion.mp3",
    se_damage: "assets/sounds/se_damage.mp3",
    se_guard: "assets/sounds/se_guard.mp3",
    se_finish_akebono: "assets/sounds/se_finish_akebono.mp3",
    se_barrier_start: "assets/sounds/se_barrier_start.mp3",
    se_barrier_end: "assets/sounds/se_barrier_end.mp3",
    voice_round0: "assets/sounds/voice_round0.mp3",
    voice_round1: "assets/sounds/voice_round1.mp3",
    voice_round2: "assets/sounds/voice_round2.mp3",
    voice_round3: "assets/sounds/voice_round3.mp3",
    voice_fight: "assets/sounds/voice_fight.mp3",
    voice_ko: "assets/sounds/voice_ko.mp3",
    voice_another_fighter: "assets/sounds/voice_another_fighter.mp3",
    g_stage_voice_0: "assets/sounds/scene_game/g_stage_voice_0.mp3",
    g_stage_voice_1: "assets/sounds/scene_game/g_stage_voice_1.mp3",
    g_stage_voice_2: "assets/sounds/scene_game/g_stage_voice_2.mp3",
    g_stage_voice_3: "assets/sounds/scene_game/g_stage_voice_3.mp3",
    g_stage_voice_4: "assets/sounds/scene_game/g_stage_voice_4.mp3",
    g_damage_voice: "assets/sounds/g_damage_voice.mp3",
    g_powerup_voice: "assets/sounds/g_powerup_voice.mp3",
    g_ca_voice: "assets/sounds/g_ca_voice.mp3",
    boss_bison_bgm: "assets/sounds/boss_bison_bgm.mp3",
    boss_bison_voice_add: "assets/sounds/boss_bison_voice_add.mp3",
    boss_bison_voice_ko: "assets/sounds/boss_bison_voice_ko.mp3",
    boss_bison_voice_faint: "assets/sounds/boss_bison_voice_faint.mp3",
    boss_bison_voice_faint_punch:
      "assets/sounds/boss_bison_voice_faint_punch.mp3",
    boss_bison_voice_punch: "assets/sounds/boss_bison_voice_punch.mp3",
    boss_barlog_bgm: "assets/sounds/boss_barlog_bgm.mp3",
    boss_barlog_voice_add: "assets/sounds/boss_barlog_voice_add.mp3",
    boss_barlog_voice_ko: "assets/sounds/boss_barlog_voice_ko.mp3",
    boss_barlog_voice_tama: "assets/sounds/boss_barlog_voice_tama.mp3",
    boss_barlog_voice_barcelona:
      "assets/sounds/boss_barlog_voice_barcelona.mp3",
    boss_sagat_bgm: "assets/sounds/boss_sagat_bgm.mp3",
    boss_sagat_voice_add: "assets/sounds/boss_sagat_voice_add.mp3",
    boss_sagat_voice_ko: "assets/sounds/boss_sagat_voice_ko.mp3",
    boss_sagat_voice_tama0: "assets/sounds/boss_sagat_voice_tama0.mp3",
    boss_sagat_voice_tama1: "assets/sounds/boss_sagat_voice_tama1.mp3",
    boss_sagat_voice_kick: "assets/sounds/boss_sagat_voice_kick.mp3",
    boss_vega_bgm: "assets/sounds/boss_vega_bgm.mp3",
    boss_vega_voice_add: "assets/sounds/boss_vega_voice_add.mp3",
    boss_vega_voice_ko: "assets/sounds/boss_vega_voice_ko.mp3",
    boss_vega_voice_crusher: "assets/sounds/boss_vega_voice_crusher.mp3",
    boss_vega_voice_warp: "assets/sounds/boss_vega_voice_warp.mp3",
    boss_vega_voice_tama: "assets/sounds/boss_vega_voice_tama.mp3",
    boss_vega_voice_shoot: "assets/sounds/boss_vega_voice_shoot.mp3",
    boss_goki_bgm: "assets/sounds/boss_goki_bgm.mp3",
    boss_goki_voice_add: "assets/sounds/boss_goki_voice_add.mp3",
    boss_goki_voice_ko: "assets/sounds/boss_goki_voice_ko.mp3",
    boss_goki_voice_tama0: "assets/sounds/boss_goki_voice_tama0.mp3",
    boss_goki_voice_tama1: "assets/sounds/boss_goki_voice_tama1.mp3",
    boss_goki_voice_ashura: "assets/sounds/boss_goki_voice_ashura.mp3",
    boss_goki_voice_syungokusatu0:
      "assets/sounds/boss_goki_voice_syungokusatu0.mp3",
    boss_goki_voice_syungokusatu1:
      "assets/sounds/boss_goki_voice_syungokusatu1.mp3",
    boss_fang_bgm: "assets/sounds/boss_fang_bgm.mp3",
    boss_fang_voice_add: "assets/sounds/boss_fang_voice_add.mp3",
    boss_fang_voice_ko: "assets/sounds/boss_fang_voice_ko.mp3",
    boss_fang_voice_beam0: "assets/sounds/boss_fang_voice_beam0.mp3",
    boss_fang_voice_beam1: "assets/sounds/boss_fang_voice_beam1.mp3",
    boss_fang_voice_tama: "assets/sounds/boss_fang_voice_tama.mp3",
    bgm_continue: "assets/sounds/scene_continue/bgm_continue.mp3",
    bgm_gameover: "assets/sounds/scene_continue/bgm_gameover.mp3",
    voice_countdown0: "assets/sounds/scene_continue/voice_countdown0.mp3",
    voice_countdown1: "assets/sounds/scene_continue/voice_countdown1.mp3",
    voice_countdown2: "assets/sounds/scene_continue/voice_countdown2.mp3",
    voice_countdown3: "assets/sounds/scene_continue/voice_countdown3.mp3",
    voice_countdown4: "assets/sounds/scene_continue/voice_countdown4.mp3",
    voice_countdown5: "assets/sounds/scene_continue/voice_countdown5.mp3",
    voice_countdown6: "assets/sounds/scene_continue/voice_countdown6.mp3",
    voice_countdown7: "assets/sounds/scene_continue/voice_countdown7.mp3",
    voice_countdown8: "assets/sounds/scene_continue/voice_countdown8.mp3",
    voice_countdown9: "assets/sounds/scene_continue/voice_countdown9.mp3",
    voice_gameover: "assets/sounds/scene_continue/voice_gameover.mp3",
    g_continue_yes_voice0:
      "assets/sounds/scene_continue/g_continue_yes_voice0.mp3",
    g_continue_yes_voice1:
      "assets/sounds/scene_continue/g_continue_yes_voice1.mp3",
    g_continue_yes_voice2:
      "assets/sounds/scene_continue/g_continue_yes_voice2.mp3",
    g_continue_no_voice0:
      "assets/sounds/scene_continue/g_continue_no_voice0.mp3",
    g_continue_no_voice1:
      "assets/sounds/scene_continue/g_continue_no_voice1.mp3",
    voice_congra: "assets/sounds/scene_clear/voice_congra.mp3",
    title_bg: "assets/img/title_bg.jpg",
    stage_loop0: "assets/img/stage/stage_loop0.png",
    stage_loop1: "assets/img/stage/stage_loop1.png",
    stage_loop2: "assets/img/stage/stage_loop2.png",
    stage_loop3: "assets/img/stage/stage_loop3.png",
    stage_loop4: "assets/img/stage/stage_loop4.png",
    stage_end0: "assets/img/stage/stage_end0.png",
    stage_end1: "assets/img/stage/stage_end1.png",
    stage_end2: "assets/img/stage/stage_end2.png",
    stage_end3: "assets/img/stage/stage_end3.png",
    stage_end4: "assets/img/stage/stage_end4.png",
  },
  SCENE_NAME_LOAD: "LoadScene",
  SCENE_NAME_TITLE: "TitleScene",
  SCENE_NAME_HOWTOPLAY: "HowToPlayScene",
  SCENE_NAME_DEMO: "DemoScene",
  SCENE_NAME_ADV: "AdvScene",
  SCENE_NAME_GAME: "GameScene",
  SCENE_NAME_ENDING: "EndingScene",
  SCENE_NAME_RESULT: "ResultScene",
  STAGE_PROLOGUE_ID: 0,
  STAGE_ENDING_ID: 4,
  STAGE_SPENDING_ID: 5,
  GAME_WIDTH: 256,
  GAME_HEIGHT: 480,
  GAME_CENTER: 128,
  GAME_MIDDLE: 240,
  BASE_ANIMATION_SPEED: 0.33,
  STAGE_WIDTH: window.innerWidth,
  STAGE_HEIGHT: window.innerHeight,
  STAGE_CENTER: window.innerWidth / 2,
  STAGE_MIDDLE: window.innerHeight / 2,
  FPS: 30,
};

export const g = {
  play: function (t) {
    D.lowModeFlg || B.resource[t].sound.play();
  },
  bgmPlay: function (t, e, o) {
    if (!D.lowModeFlg) {
      var i,
        n = B.resource[t].sound,
        a = !1;
      !(function t() {
        a
          ? ((i = n.play({
              // 48e3 == 48000 in scientific notation
              start: e / 48e3,
              end: o / 48e3,
            })).on("progress", s),
            i.on("end", t.bind(this)))
          : ((i = n.play({
              start: 0,
              end: o / 48e3,
            })).on("end", t.bind(this)),
            i.on("progress", s),
            (a = !0));
      })();
    }
    function s(t) {}
  },
  stop: function (t) {
    D.lowModeFlg || B.resource[t].sound.stop();
  },
};

export const D = {
  baseUrl: "",
  lowModeFlg: !1,
  hitarea: !1,
  debugFlg: "game.capcom.com" !== location.hostname,
  player: null,
  playerHp: 0,
  playerMaxHp: 0,
  caDamage: 0,
  combo: 0,
  maxCombo: 0,
  stageId: 0,
  akebonoCnt: 0,
  cagage: 0,
  score: 0,
  continueCnt: 0,
  highScore: 0,
  frame: 0,
  beforeHighScore: 0,
  // shootMode: M.SHOOT_NAME_NORMAL,
  enemyBulletList: [],
};

export const B = {
  resource: {},
  Manager: "",
};

function Xn(t, e) {
  for (var o = 0; o < e.length; o++) {
    var i = e[o];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(t, i.key, i);
  }
}

new ((function () {
  function t() {
    var e = this;
    !(function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    })(this, t),
      //   F.dlog("App.constructor start."),
      (this.loadListener = function (t) {
        return e.init(t);
      }),
      window.addEventListener("load", this.loadListener); //,
    //   F.dlog("App.constructor end.")
  }
  var e, o, n;
  return (
    (e = t),
    (o = [
      {
        key: "init",
        value: function () {
          window.removeEventListener("load", this.loadListener),
            (D.baseUrl = document.getElementById("baseUrl").innerHTML); //,
          // B.Manager = new jn,
          // B.Manager.game = new PIXI.Application({
          //   antialias: !1,
          //   transparent: !1,
          //   resolution: 1,
          //   width: i.GAME_WIDTH,
          //   height: i.GAME_HEIGHT,
          //   backgroundColor: 0
          // }),
          // B.Manager.interact = new PIXI.interaction.InteractionManager(B.Manager.game.view),
          // B.Manager.interact.hitTestRectangle = St.hitTestFunc,
          // document.getElementById("canvas").appendChild(B.Manager.game.view),
          // B.Manager.begin()
        },
      },
    ]) && Xn(e.prototype, o),
    n && Xn(e, n),
    t
  );
})())();

const files = [
  {
    type: "image",
    key: "loading_bg.png",
    url: "assets/img/loading/loading_bg.png",
  },
  {
    type: "image",
    key: "loading0.gif",
    url: "assets/img/loading/loading0.gif",
  },
  {
    type: "image",
    key: "loading1.gif",
    url: "assets/img/loading/loading1.gif",
  },
  {
    type: "image",
    key: "loading2.gif",
    url: "assets/img/loading/loading2.gif",
  },
];

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "hello-world",
      pack: { files },
    });
  }

  init() {
    var t;
    // !function(t, e) {
    //   if (!(t instanceof e))
    //     throw new TypeError("Cannot call a class as a function")
    // }(this, e),
    t = this; // Mn(this, Bn(e).call(this));
    var o = ["loading0.gif", "loading1.gif", "loading2.gif"];
    return (
      (t.loadingG = new AnimatedSprite(this, o)),
      (t.loadingG.x = i.GAME_CENTER - 64),
      (t.loadingG.y = i.GAME_MIDDLE - 64),
      (t.loadingG.animationSpeed = 0.15),
      (t.loadingTexture = "loading_bg.png"),
      (t.loadingBg = this.add.image(0, 0, t.loadingTexture).setOrigin(0)),
      (t.loadingBg.alpha = 0.09),
      (t.loadingBgFlipCnt = 0),
      document.cookie.split(";").forEach(function (t) {
        var e = t.split("=");
        "afc2021_highScore" == e[0] && (D.highScore = +e[1]);
      }),
      t
    );
  }

  preload() {
    this.load.atlas(
      "game_asset",
      require("../assets/images/game_asset.png"),
      require("../assets/images/game_asset.json")
    );

    this.load.atlas(
      "game_ui",
      require("../assets/images/game_ui.png"),
      require("../assets/images/game_ui.json")
    );

    let fileTypes = {
      jpg: "image",
      json: "json",
      mp3: "audio",
      png: "image",
    };

    let audioFiles: string[] = [];

    for (var n in i.RESOURCE) {
      let fileType = i.RESOURCE[n].match(/\w+$/)[0];

      if (fileTypes[fileType] === "audio") audioFiles.push(n);

      this.load[fileTypes[fileType]](n, D.baseUrl + i.RESOURCE[n]);
    }

    this.load.on("complete", (loader, totalComplete, totalFailed) => {
      B.resource = {
        recipe: {
          data: loader.cacheManager.json.get("recipe"),
        },
      };

      audioFiles.forEach((n) => {
        B.resource[n] = { sound: loader.cacheManager.audio.get(n) };
        AudioManager.resource[n] = this.sound.add(n);
        g[n] = B.resource[n].sound;
      });

      (g.voice_titlecall.volume = 0.7),
        (g.se_decision.volume = 0.75),
        (g.se_correct.volume = 0.9),
        (g.se_cursor_sub.volume = 0.9),
        (g.se_cursor.volume = 0.9),
        (g.se_over.volume = 0.9),
        (g.adventure_bgm.volume = 0.2),
        (g.g_adbenture_voice0.volume = 0.5),
        (g.voice_thankyou.volume = 0.7),
        (g.se_explosion.volume = 0.35),
        (g.se_shoot.volume = 0.3),
        (g.se_shoot_b.volume = 0.3),
        (g.se_ca.volume = 0.8),
        (g.se_ca_explosion.volume = 0.9),
        (g.se_damage.volume = 0.15),
        (g.se_guard.volume = 0.2),
        (g.se_finish_akebono.volume = 0.9),
        (g.se_barrier_start.volume = 0.9),
        (g.se_barrier_end.volume = 0.9),
        (g.voice_round0.volume = 0.7),
        (g.voice_round1.volume = 0.7),
        (g.voice_round2.volume = 0.7),
        (g.voice_round3.volume = 0.7),
        (g.voice_fight.volume = 0.7),
        (g.voice_ko.volume = 0.7),
        (g.voice_another_fighter.volume = 0.7),
        (g.g_stage_voice_0.volume = 0.55),
        (g.g_stage_voice_1.volume = 0.7),
        (g.g_stage_voice_2.volume = 0.45),
        (g.g_stage_voice_3.volume = 0.45),
        (g.g_stage_voice_4.volume = 0.55),
        (g.g_damage_voice.volume = 0.7),
        (g.g_powerup_voice.volume = 0.55),
        (g.g_ca_voice.volume = 0.7),
        (g.boss_bison_bgm.volume = 0.4),
        (g.boss_bison_voice_add.volume = 0.65),
        (g.boss_bison_voice_ko.volume = 0.9),
        (g.boss_bison_voice_faint.volume = 0.55),
        (g.boss_bison_voice_faint_punch.volume = 0.65),
        (g.boss_bison_voice_punch.volume = 0.65),
        (g.boss_barlog_bgm.volume = 0.4),
        (g.boss_barlog_voice_add.volume = 0.7),
        (g.boss_barlog_voice_ko.volume = 0.9),
        (g.boss_barlog_voice_tama.volume = 0.6),
        (g.boss_barlog_voice_barcelona.volume = 0.7),
        (g.boss_sagat_bgm.volume = 0.4),
        (g.boss_sagat_voice_add.volume = 0.9),
        (g.boss_sagat_voice_ko.volume = 0.9),
        (g.boss_sagat_voice_tama0.volume = 0.45),
        (g.boss_sagat_voice_tama1.volume = 0.65),
        (g.boss_sagat_voice_kick.volume = 0.65),
        (g.boss_vega_bgm.volume = 0.3),
        (g.boss_vega_voice_add.volume = 0.7),
        (g.boss_vega_voice_ko.volume = 0.9),
        (g.boss_vega_voice_crusher.volume = 0.7),
        (g.boss_vega_voice_warp.volume = 0.7),
        (g.boss_vega_voice_tama.volume = 0.7),
        (g.boss_vega_voice_shoot.volume = 0.7),
        (g.boss_goki_bgm.volume = 0.4),
        (g.boss_goki_voice_add.volume = 0.7),
        (g.boss_goki_voice_ko.volume = 0.9),
        (g.boss_goki_voice_tama0.volume = 0.7),
        (g.boss_goki_voice_tama1.volume = 0.7),
        (g.boss_goki_voice_ashura.volume = 0.7),
        (g.boss_goki_voice_syungokusatu0.volume = 0.7),
        (g.boss_goki_voice_syungokusatu1.volume = 0.7),
        (g.boss_fang_bgm.volume = 0.4),
        (g.boss_fang_voice_add.volume = 0.6),
        (g.boss_fang_voice_ko.volume = 0.9),
        (g.boss_fang_voice_beam0.volume = 0.6),
        (g.boss_fang_voice_beam1.volume = 0.6),
        (g.boss_fang_voice_tama.volume = 0.6),
        (g.bgm_continue.volume = 0.25),
        (g.bgm_gameover.volume = 0.3),
        (g.voice_countdown0.volume = 0.7),
        (g.voice_countdown1.volume = 0.7),
        (g.voice_countdown2.volume = 0.7),
        (g.voice_countdown3.volume = 0.7),
        (g.voice_countdown4.volume = 0.7),
        (g.voice_countdown5.volume = 0.7),
        (g.voice_countdown6.volume = 0.7),
        (g.voice_countdown7.volume = 0.7),
        (g.voice_countdown8.volume = 0.7),
        (g.voice_countdown9.volume = 0.7),
        (g.voice_gameover.volume = 0.7),
        (g.g_continue_yes_voice0.volume = 0.7),
        (g.g_continue_yes_voice1.volume = 0.7),
        (g.g_continue_yes_voice2.volume = 0.7),
        (g.g_continue_no_voice0.volume = 0.7),
        (g.g_continue_no_voice1.volume = 0.7),
        (g.voice_congra.volume = 0.7),
        document.addEventListener(
          "visibilitychange",
          function () {
            "hidden" === document.visibilityState
              ? window.game.sound.pauseAll()
              : "visible" === document.visibilityState &&
                window.game.sound.resumeAll();
          },
          !1
        );

      TweenMax.to([this.loadingG, this.loadingBg], 0.2, {
        alpha: 0,
        onComplete: () => {
          this.scene.start("title-scene");
        },
      });
    });
  }

  create() {
    this.events.on("shutdown", this.sceneRemoved, this);
  }

  private sceneRemoved() {
    // F.dlog("LoadScene.sceneRemoved() Start."),
    // Dn(Bn(e.prototype), "sceneRemoved", this).call(this),
    this.loadingG.destroy(!0), this.loadingBg.destroy(!0); //,
    // B.Scene = new mn,
    // B.Manager.game.stage.addChild(B.Scene),
    // F.dlog("LoadScene.sceneRemoved() End.")
  }
}

export class AnimatedSprite extends Phaser.GameObjects.Sprite {
  // variables
  private frameRate: number | null = null;

  constructor(
    scene: Phaser.Scene,
    frameKeys: string[],
    texture?: string,
    addToScene?: boolean
  ) {
    if (addToScene === undefined) addToScene = true;

    super(scene, 0, 0, frameKeys[0]);

    if (texture) this.setTexture(texture, frameKeys[0]);

    this.setOrigin(0);

    let frames = [
      ...frameKeys.map((k) => {
        return { key: k, frame: 0 };
      }),
    ];

    if (texture) {
      frames = [
        ...frameKeys.map((k) => {
          return { key: texture, frame: k };
        }),
      ];
    }

    this.anims.create({
      key: "default",
      frames,
      frameRate: 9,
      repeat: -1,
    });

    if (addToScene) {
      this.scene.time.addEvent({
        callback: () => this.play("default"),
      });

      scene.add.existing(this);
    }
  }

  set animationSpeed(percentOfSixty: number) {
    this.frameRate = 60 * percentOfSixty;
  }

  play(key: string = "default") {
    if (this.frameRate) {
      super.play({
        key,
        frameRate: this.frameRate,
      });
    } else {
      super.play(key);
    }
  }
}
