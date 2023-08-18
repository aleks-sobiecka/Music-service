import {templates, select} from './../settings.js';
import utils from './../utils.js';
import Song from './Song.js';

class Discover{
  constructor(AllSongsList){
    const thisDiscover = this;
  
    thisDiscover.AllSongsList = AllSongsList;
    thisDiscover.DiscoveredSong = [];
  
    thisDiscover.render();
    thisDiscover.discoverSong();
  }

  render(){
    const thisDiscover = this;

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = document.querySelector(select.containerOf.discover);

    const generatedHTML = templates.discover(thisDiscover.dom.wrapper);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisDiscover.dom.wrapper.appendChild(generatedDOM);
  }

  discoverSong(){
    const thisDiscover = this;

    thisDiscover.songsNumber = 0;

    
    for(let songId in thisDiscover.AllSongsList){
      thisDiscover.songsNumber++;
      console.log(songId);
    }

    thisDiscover.randomSongId = Math.floor(Math.random() * thisDiscover.songsNumber);

    thisDiscover.initSong();
  }

  initSong(){
    const thisDiscover = this;

    new Song(thisDiscover.AllSongsList[thisDiscover.randomSongId].id, thisDiscover.AllSongsList[thisDiscover.randomSongId], select.containerOf.discover);

    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });

  }

}

export default Discover;