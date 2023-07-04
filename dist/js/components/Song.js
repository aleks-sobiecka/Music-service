import {select, templates} from './../settings.js';
import utils from './../utils.js';

class Song {
  constructor(id, data){
    const thisSong = this;

    thisSong.id = id;
    thisSong.data = data;

    thisSong.renderInPage();

  }
  renderInPage(){
    const thisSong = this;

    /* generate HTML based on template */
    const generatedHTML = templates.songsList(thisSong.data);

    /* create element using utils.createElementFromHTML */
    thisSong.element = utils.createDOMFromHTML(generatedHTML);

    /* find songs list container */
    const songsListContainer = document.querySelector(select.containerOf.home);

    /* add element to list */
    songsListContainer.appendChild(thisSong.element);
  }

}

export default Song;