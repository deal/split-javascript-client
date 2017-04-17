/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/
'use strict';

/*eslint-disable eqeqeq */

const log = require('debug')('splitio-engine:matcher');
const _startsWith = require('lodash/startsWith')

function startsWithMatcherContext(vo /*: unaryStringObject */) /*: Function */ {
  return function startsWithMatcher(value /*: string */) /*: boolean */ {
    let startsWith = _startsWith(value, vo.value);

    log(`[startsWithMatcher] ${value} starts with ${vo.value}? ${startsWith}`);

    return startsWith;
  };
}

module.exports = startsWithMatcherContext;