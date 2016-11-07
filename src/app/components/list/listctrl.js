(function(){
    angular
        .module('yoProjectJS')
        .controller('ListController', ListController);

        ListController.$inject = ['$scope', '$http', 'loginService'];

        function ListController($scope, $http, loginService){

            var vm = this;

            vm.filterOptions = {
                        files: [
                            {id : 1, name : 'ALL', type: "all" },
                            {id : 2, name : 'ebextensions', type: "ebextension" },
                            {id : 3, name : 'packages', type: "package"},
                            {id : 4, name : 'scripts', type: "script" }
                        ]
            };
            //*** Mapped to the model to filter ***/
            vm.filterItem = {
                files: vm.filterOptions.files[0]
            };

            vm.customFilter = function (data) {
                    if (data.type === vm.filterItem.files.type) {
                      return true;
                    } else if (vm.filterItem.files.type === "all") {
                      return true;
                    } else {
                      return false;
                    }
            };
            $http.get("assets/data.json").success(function(data) {
                vm.entries = data;
            });
        }

})();