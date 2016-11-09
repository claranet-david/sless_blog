(function() {
  'use strict';

  angular
    .module('sless_blog')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('finished runBlock');
  }

})();
