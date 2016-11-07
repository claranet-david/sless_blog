// loginFBService
(function(){
	angular
		.module('yoProjectJS')
		.service('loginFBService', loginFBService);

		loginFBService.$inject = ['customAWSService', 'globalService'];

		function  loginFBService(customAWSService, globalService){
			/*!
			* Login to your application using Facebook.
			* Uses the Facebook SDK for JavaScript available here:
			* https://developers.facebook.com/docs/javascript/gettingstarted/
			*/

			var vm = this;

			vm.bucket = customAWSService.bucket;

			(function(d) {
				var a = d.createElement('a'); a.href = '#';
				a.id = 'LoginWithFB';
				a.className = "btn btn-primary btn-md";
				a.innerHTML = 'Login via FB';
				d.getElementById('LoginArea').appendChild(a);
			})(document);

			(function(d) {
				var a = d.createElement('a'); a.href = '#';
				a.id = 'LogoutFB';
				a.className = "btn btn-primary btn-md";
				a.innerHTML = 'Logout';
				d.getElementById('LoginArea').appendChild(a);
			})(document);
			
			//Facebook app Id
			var appId = '524137347748230';

			var loginWithFB = document.getElementById('LoginWithFB');
			loginWithFB.style.display = 'block';

			// window.fbAsyncInit //Use this to login onLoad
			loginWithFB.onclick = function () {
				FB.init({
					appId: appId,
					status: true, 
					cookie: true, 
					xfbml: true,
					version: 'v2.4'
				});
				FB.login(function (response) {
					customAWSService.AWS.config.credentials = new AWS.WebIdentityCredentials({
						ProviderId: 'graph.facebook.com',
						RoleArn: customAWSService.roleArnFB,
						WebIdentityToken: response.authResponse.accessToken
					});
					fbUserId = response.authResponse.userID;
					//button1.style.display = 'block';
					//button2.style.display = 'block';

					console.log("FB User ID "+fbUserId);
					console.log("Credentials "+JSON.stringify(customAWSService.AWS.config.credentials));

					var logmessageElement = document.getElementById('logmessage');
					logmessageElement.innerHTML = 'LOGGED IN!';
					logmessageElement.className = 'ok';       
					//document.getElementById('navigationmenu').style.display = 'block';
					document.getElementById('LogoutFB').style.display = 'block';
					document.getElementById('LoginWithFB').style.display = 'none';
					// window.location.replace(adresstogo);
				});

			};

			document.getElementById('LogoutFB').onclick = function () {

				customAWSService.AWS.config.credentials = new AWS.WebIdentityCredentials({
					ProviderId: '',
					RoleArn: '',
					WebIdentityToken: ''
				});

				console.log("Credentials "+JSON.stringify(customAWSService.AWS.config.credentials));

				document.getElementById('LogoutFB').style.display = 'none';
				document.getElementById('LoginWithFB').style.display = 'block';
				document.getElementById('logmessage').innerHTML = 'not logged in!';
				document.getElementById('logmessage').className = 'ko';       
				//document.getElementById('navigationmenu').style.display = 'none';

				// FB.init({
				// 	appId: appId,
				// 	status: true, 
				// 	cookie: true, 
				// 	xfbml: true,
				// 	version: 'v2.4'
				// });
				// FB.logout(function() {

				// 	document.getElementById('LogoutFB').style.display = 'none';
				// 	document.getElementById('LoginWithFB').style.display = 'block';
				// 	document.getElementById('logmessage').innerHTML = 'not logged in!';
				// 	document.getElementById('logmessage').className = 'ko';       
				// 	document.getElementById('navigationmenu').style.display = 'none';
				// });

			};


			// Load the Facebook SDK asynchronously
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {
					return;
				}
				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

		}
})();