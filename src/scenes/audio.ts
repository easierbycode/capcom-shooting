export default {
  resource: {},

  play: function (key) {
    if (!this.resource[key].isPlaying) {
      this.resource[key].play();
    }
  },

  stop: function (key) {
    if (this.resource[key].isPlaying) {
      this.resource[key].stop();
    }
  },

  bgmPlay: function (key, e, o) {
    // console.log({
    //     start: e / 48e3,
    //     end: o / 48e3
    // })
    // if (!this.resource[key].isPlaying) {
    //     const soundConfig: Phaser.Types.Sound.SoundConfig = {
    //         loop: true
    //     }
    //     this.resource[key].play(
    //         key,
    //         {
    //             loop: true
    //         }
    //     )
    // }
  },
};
