var Store = require('./_base');
var Dispatcher = require('../dispatcher');

var INITIAL_STATES = [
  {
    id: 'A',
    x: 0, y: 0, w: 120, h: 120,
    bg: 'http://lorempixel.com/120/120/abstract/2/',
    connections: [{
      target: 'B',
      x: 20, y: 20, w: 60, h: 60
    }, {
      target: 'C',
      x: 100, y: 100, w: 20, h: 20
    }]
  },
  {
    id: 'B',
    x: 320, y: 200, w: 120, h: 120,
    bg: 'http://lorempixel.com/120/120/abstract/4/',
    connections: [{
      target: 'A',
      x: 80, y: 40,
      w: 40, h: 40
    }]
  },
  {
    id: 'C',
    x: 20, y: 200, w: 120, h: 120,
    bg: 'http://lorempixel.com/120/120/abstract/1/'
  }
];

var StatesStore = new Store(INITIAL_STATES);

Dispatcher.register(function (action) {
  if (action.type === 'STATE_MOVE') {
    StatesStore.update(action.query, action.data);
  }

  StatesStore.emitChange();
  return true;
});

module.exports = StatesStore;
