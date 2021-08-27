
import { i } from './LoadScene'
import { en, ja } from './lang'


export default class AdvScene extends Phaser.Scene
{
    constructor()
    {
        super('adv-scene')

        this.senario = "ja" == i.LANG ? ja : en
    }

    create()
    {
        
    }
}