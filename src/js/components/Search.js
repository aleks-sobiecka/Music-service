import {templates, select} from './../settings.js';
import utils from './../utils.js';
import Song from './Song.js';

class Search{
  constructor(AllSongsList){
    const thisSearch = this;

    thisSearch.AllSongsList = AllSongsList;
    thisSearch.SerchedSongsList = [];

    thisSearch.render();
    thisSearch.SearchResult();
  }

  render(){
    const thisSearch = this;

    thisSearch.dom = {};
    thisSearch.dom.wrapper = document.querySelector(select.containerOf.search);

    const generatedHTML = templates.search(thisSearch.dom.wrapper);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisSearch.dom.wrapper.appendChild(generatedDOM);
  }

  SearchResult(){
    const thisSearch = this;

    thisSearch.button = document.querySelector(select.search.button);


    thisSearch.button.addEventListener('click', function(event){
      event.preventDefault();
      thisSearch.resetSongSearch();
      thisSearch.initSongSearch();
    });
  }

  initSongSearch(){
    const thisSearch = this;

    thisSearch.filteredSongList = {};

    thisSearch.input = document.querySelector(select.search.input);

    for(let songData in thisSearch.AllSongsList){
      thisSearch.songDetails = thisSearch.AllSongsList[songData].filename;

      if (thisSearch.songDetails.includes(thisSearch.input.value)){
        thisSearch.SerchedSongsList.push(thisSearch.AllSongsList[songData]);
      }
    }

    thisSearch.initSong();
  }

  initSong(){
    const thisSearch = this;

    for(let songData in thisSearch.SerchedSongsList){
      new Song(thisSearch.SerchedSongsList[songData].id, thisSearch.SerchedSongsList[songData], select.containerOf.search);
    }

    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  }

  resetSongSearch(){
    const thisSearch = this;

    thisSearch.SerchedSongsList = [];
  }
}


export default Search;