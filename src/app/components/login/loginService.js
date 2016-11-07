// login General Service

(function(){
	angular
		.module('yoProjectJS')
		.service('loginService', loginService);

		loginService.$inject = ['loginFBService'];

		function  loginService(loginFBService){

			//default right now is FB
			document.getElementById('LoginWithFB').style.display = 'block';

		}
})();