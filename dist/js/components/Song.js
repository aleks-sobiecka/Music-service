import {templates} from './../settings.js';
import utils from './../utils.js';

//wzór tego jak ma wyglądać obiekt dla pojedyńczej Song
class Song {
  constructor(id, data, wrapper){
    const thisSong = this;

    thisSong.id = id;
    thisSong.data = data;
    thisSong.wrapper = wrapper;

    thisSong.renderInPage();

  }

  //wygenerowanie Songs (wszytskich instanci klasy) na stronie Home
  renderInPage(){
    const thisSong = this;

    /* generate HTML based on template */
    const generatedHTML = templates.songsList(thisSong.data);

    /* create element using utils.createElementFromHTML */
    thisSong.element = utils.createDOMFromHTML(generatedHTML);

    /* find songs list containers */
    const songsListContainer = document.querySelector(thisSong.wrapper);

    /* add element to list */
    songsListContainer.appendChild(thisSong.element);

  }


}

export default Song;