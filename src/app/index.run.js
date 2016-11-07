(function() {
  'use strict';

  angular
    .module('yoProjectJS')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('finished runBlock');
  }

})();
