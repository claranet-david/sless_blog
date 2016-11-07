(function() {
  'use strict';

  angular
    .module('yoProjectJS')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar(globalService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'navm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, globalService) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
