
export default {
    resource: {},
    
    play: function(key) {
        if (!this.resource[key].isPlaying) {
            this.resource[key].play()
        }
    }
}