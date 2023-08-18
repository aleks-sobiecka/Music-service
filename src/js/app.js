import { select, classNames, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';


const app = {
  //wyświetla poszczególne podstrony
  initPages: function(){
    const thisApp = this;
  
    //znalezienie wszystkich dzieci kontenera stron (czyli sekcje podstron)
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    //znalezienie wszystkich linków
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
  
    //automatyczne wyświetlenie wcześniej klikniętej strony
    const idFromHash = window.location.hash.replace('#/', '');
  
    //zmienna która pokazuje hash domyślnej strony
    let pageMatchingHash = thisApp.pages[0].id;
  
    //sprawdzamy czy hash pasuje do jakiejś strony
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
  
    //wyświelanie strony pasującej do hash
    thisApp.activatePage(pageMatchingHash);
  
    //aktywowanie klikniętej podstrony
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
  
  //aktywowanie wybranej lub domyślnej podstrony
  activatePage: function(pageId){
    const thisApp = this;
  
    /* add class "active" to matching pages, remove from non-maching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links, remove from non-maching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  
  },

  //pobiera z serwera obiekt z danymi i przypisuje go do thisApp.data - łatwy dostęp do danych
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

        new Home (thisApp.data.songs);
        new Search (thisApp.data.songs);
        new Discover (thisApp.data.songs);
      });
  },

  init: function() {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
  },
};


app.init();