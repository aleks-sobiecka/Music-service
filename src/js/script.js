import { select, classNames, settings } from './settings.js';

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
  
    /* add class "active" to matching links, remove from non-maching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  
  },
  

  initData: function() {
    const url = settings.db.url + '/' + settings.db.songs;
    this.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        this.data.songs = parsedResponse;
      });
  },

  init: function() {
    const thisApp = this;
    thisApp.initData();
  },
};

app.init();