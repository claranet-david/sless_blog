(function(){
	// body...
	angular
		.module('yoProjectJS')
		.controller('UploadController', UploadController);

		UploadController.$inject = ['$scope', '$http', '$routeParams','loginService', 'customAWSService'];

		function UploadController($scope, $http, $routeParams, loginService, customAWSService){

			var vm = this;

			var fileChooser = document.getElementById('file-chooser');
            var button = document.getElementById('upload-button');
            var results = document.getElementById('results');
            vm.fileName; 
            vm.file;
            vm.obj = {};

            button.addEventListener('click', function() {
              
              vm.file = fileChooser.files[0];

              if (vm.file) {
                results.innerHTML = '';
                //console.log(vm.file.name);
                vm.fileName = String(vm.file.name);
                vm.populate();

                console.log(vm.obj);

                var params = {
                    Key: "uploads/" + vm.obj.location, 
                    ContentType: vm.file.type, 
                    Body: vm.file,
                    Metadata: {
                        file: String(vm.fileLabel),
                        description: String(vm.fileDescription),
                        date: String(vm.fileDate),
                        type: String(vm.fileType),
                        tags: String(vm.fileTags),
                        locatiion: String(vm.obj.location)
                    }
                };

                customAWSService.bucket.config.credentials = customAWSService.AWS.config.credentials;
                
                customAWSService.bucket.upload(params, function (err, data) {
                  results.innerHTML = err ? 'ERROR!' + String(err) : 'UPLOADED.';
                });
              } else {
                results.innerHTML = 'Nothing to upload.';
              }
            }, false);

            
            vm.stringyObj = {}; //JSON.stringify(vm.obj,null,"    ");
                vm.stringyObj.label = vm.fileLabel;
                vm.stringyObj.description = vm.fileDescription;
                vm.stringyObj.date = vm.fileDate;
                vm.stringyObj.type = vm.fileType;
                vm.stringyObj.tags = vm.fileTags;
                if(vm.file){
                    vm.stringyObj.location = String(vm.fileType+"s/"+vm.fileName);
                }
            vm.populate = function(){
                vm.obj.label = vm.fileLabel;
                vm.obj.description = vm.fileDescription;
                vm.obj.date = vm.fileDate;
                vm.obj.type = vm.fileType;
                vm.obj.tags = vm.fileTags;
                if(vm.file){
                    vm.obj.location = String(vm.fileType+"s/"+vm.fileName);
                }
                console.log(JSON.stringify(vm.obj,null,"    "));
            };

		}
})();