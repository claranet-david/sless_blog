(function(){
	// body...
	angular
		.module('sless_blog')
		.controller('UploadController', UploadController);

		  /** @ngInject */

		function UploadController($scope, $http, $routeParams, loginService, customAWSService){

			var vm = this;

			vm.fileChooser = document.getElementById('file-chooser');
            var button = document.getElementById('upload-button');
            var printbutton = document.getElementById('print-button');
            vm.results = document.getElementById('results');
            vm.fileName; 
            vm.file;
            vm.obj = {};
            vm.newItem = {};

            vm.dropzone = document.getElementById('dropzone');

            vm.dropzone.ondrop = function(e){
                e.preventDefault();
                this.className = 'dropzone';

                
                if(e.dataTransfer.files.length==1){
                    console.log("Ok!");
                    console.log(e.dataTransfer.files[0]);
                    vm.newItem.file = e.dataTransfer.files[0]
                    console.log(vm.newItem.file);
                    vm.newItem.fileName = e.dataTransfer.files[0].name;
                    console.log("# FileName: " + vm.newItem.fileName);
                    vm.newItem.fileDate = e.dataTransfer.files[0].lastModifiedDate.toISOString().slice(0,10);
                    console.log("# FileDate: " + vm.newItem.fileDate);
                    $scope.$digest();
                    return e.dataTransfer.files[0];
                }
                else console.log("There was some sort of error: Should be exclusively one item!");
            }
            vm.dropzone.ondragover = function(e){
                this.className = 'dropzone over';
                return false;
            }
            vm.dropzone.ondragleave = function(e){
                this.className = 'dropzone';
                return false;
            }
            
                     
            // vm.stringyObj = {}; //JSON.stringify(vm.obj,null,"    ");
            //     vm.stringyObj.label = vm.fileLabel;
            //     vm.stringyObj.description = vm.fileDescription;
            //     vm.stringyObj.date = vm.fileDate;
            //     vm.stringyObj.type = vm.fileType;
            //     vm.stringyObj.tags = vm.fileTags;
            //     if(vm.newItem.file){
            //         vm.stringyObj.location = String(vm.fileType+"s/"+vm.fileName);
            //     }

            vm.populate = function(){
                vm.obj.label = vm.newItem.fileLabel;
                vm.obj.description = vm.newItem.fileDescription;
                vm.obj.date = vm.newItem.fileDate;
                vm.obj.type = vm.newItem.fileType;
                vm.obj.tags = vm.newItem.fileTags;
                if(vm.newItem.file){
                    vm.obj.location = String(vm.newItem.fileType+"s/"+vm.newItem.fileName);
                }
                console.log(vm.obj);
                console.log(JSON.stringify(vm.obj,null,"    "));
            }

            printbutton.addEventListener('click', function(){

                vm.populate();

                console.log("### Filechooser: " + vm.fileChooser.files[0]);
                console.log("\n### vm.newItem.file: ");
                console.log(vm.newItem.file);
                console.log("*********************\n");

            }, false);

            button.addEventListener('click', function() {

              //console.log(vm.fileChooser.files[0]);
              
              //vm.file = vm.fileChooser.files[0];

              if (vm.newItem.file) {
                vm.results.innerHTML = '';
                console.log(vm.newItem.file.name);
                vm.fileName = String(vm.newItem.file.name);
                vm.populate();


                var params = {
                    Key: "uploads/" + vm.obj.location, 
                    ContentType: vm.newItem.file.type, 
                    Body: vm.newItem.file,
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
                  vm.results.innerHTML = err ? 'ERROR!' + String(err) : 'UPLOADED.';
                });
              } else {
                vm.results.innerHTML = 'Nothing to upload.';
              }
            }, false);

		}
})();