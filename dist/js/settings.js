export const select = {
  containerOf: {
    pages: '#pages',
    home: '#home-wrapper',
    search: '#search-wrapper',
    song: '#song-wrapper',
    discover: '#discover-wrapper',
  },
  templateOf: {
    home: '#template-home',
    songsList: '#template-songs-list',
    search: '#template-search',
    discover: '#template-discover',
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    button: '.btn-search',
    input: '.input-search',
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
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
};