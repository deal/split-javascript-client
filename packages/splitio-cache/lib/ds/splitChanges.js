/* @flow */'use strict';

var log = require('debug')('splitio-cache:http');
var url = require('../url');
var splitMutatorFactory = require('../mutators/splitChanges');
var sinceValue = 0;

function splitChangesDataSource(_ref) {
  var authorizationKey = _ref.authorizationKey;

  var nocache = Date.now();

  return fetch(url('/splitChanges?since=' + sinceValue + '&_nocache=' + nocache), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authorizationKey
    }
  }).then(function (resp) {
    return resp.json();
  }).then(function (json) {
    var till = json.till;
    var splits = json.splits;

    log('[' + authorizationKey + '] /splitChanges response using since=' + sinceValue, json);

    sinceValue = till;

    return splitMutatorFactory(splits);
  }).catch(function (error) {
    log('[' + authorizationKey + '] failure fetching splits using since [' + sinceValue + '] => [' + error + ']');

    return error;
  });
}

module.exports = splitChangesDataSource;
//# sourceMappingURL=splitChanges.js.map