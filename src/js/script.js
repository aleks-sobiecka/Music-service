import { select, classNames, settings } from './settings.js';
import Home from './components/Home.js';
import Song from './components/Song.js';


const app = {
  initPages: function(){
    const thisApp = this;
  
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
  
    const idFromHash = window.location.hash.replace('#/', '');
  
    let pageMatchingHash = thisApp.pages[0].id;
  
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
  
    thisApp.activatePage(pageMatchingHash);
  
    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        event.preventDefault();
        const clickedElement = this;
  
        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
  
        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);
  
        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },
  
  activatePage: function(pageId){
    const thisApp = this;
  
    /* add class "active" to matching pages, remove from non-maching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
  
  },

  initSongs: function(){
    const thisApp = this;

    for(let songData in thisApp.data.songs){
      new Song(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
    }
  },

  initData: function() {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        thisApp.data.songs = parsedResponse;

        /* execute initMenu method */
        thisApp.initSongs();
      });
  },

  initHome: function(){
    const thisApp = this;

    thisApp.homeElem = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(thisApp.homeElem, thisApp.dataHome);
  },

  init: function() {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
    thisApp.initHome();
  },
};

app.init();