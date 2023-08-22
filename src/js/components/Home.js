import {templates, select} from './../settings.js';
import utils from './../utils.js';
import Song from './Song.js';

class Home{
  constructor(AllSongsList){
    const thisHome = this;

    thisHome.AllSongsList = AllSongsList;

    thisHome.render();
    thisHome.initSong();
  }

  render(){
    const thisHome = this;

    thisHome.dom = {};
    thisHome.dom.wrapper = document.querySelector(select.containerOf.home);

    const generatedHTML = templates.search(thisHome.dom.wrapper);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisHome.dom.wrapper.appendChild(generatedDOM);
  }

  initSong(){
    const thisHome = this;

    for(let songData in thisHome.AllSongsList){
      new Song(thisHome.AllSongsList[songData].id, thisHome.AllSongsList[songData], select.containerOf.home);
    }

    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '#home .player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });

    
  }

}

export default Home;