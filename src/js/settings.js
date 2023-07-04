export const select = {
  containerOf: {
    pages: '#pages',
    home: '#home-wrapper',
  },
  templateOf: {
    home: '#template-home',
    songsList: '#template-songs-list',
  },
  nav: {
    links: '.main-nav a',
  },
};

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
  }
};

export const templates = {
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  songsList: Handlebars.compile(document.querySelector(select.templateOf.songsList).innerHTML),
};