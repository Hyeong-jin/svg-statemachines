var lodash = require('lodash');
var EventEmitter = require('events').EventEmitter;

class Store extends EventEmitter {
  constructor(data) {
    this.data = data || [];
  }

  emitChange() {
    this.emit('change');
  }

  add(item) {
    this.data.push(item);
    return true;
  }

  remove(item) {
    var index = this.data.indexOf(item);
    if (index < 0) { return false; }

    this.data.splice(index, 1);
    return true;
  }

  update(query, data) {
    var item = lodash.findWhere(this.data, query);
    if (lodash.isUndefined(item)) { return false; }
    return lodash.merge(item, data);
  }

  getAll() {
    return this.data;
  }
}

module.exports = Store;
