'use strict';

/* Navbar Controller */

angular.module('myApp.navbar', ['firebase.utils', 'simpleLogin', 'ui.bootstrap'])
.controller('NavbarCtrl', ['$scope', 'simpleLogin', 'fbutil', '$location', '$modal',
	function($scope, simpleLogin, fbutil, $location, $modal) {
		$scope.logout = function() {
			simpleLogin.logout();
			$location.path('/home');
		};

		$scope.loginModal = function () {
			var modalInstance = $modal.open({
				templateUrl: 'loginModal.html',
				controller: ModalInstanceCtrl
			});
		};

		var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.createMode = false;

			$scope.login = function(email, pass) {
				$scope.err = null;
				simpleLogin.login(email, pass)
					.then(function(/* user */) {
						$modalInstance.close();
						$location.path('/account');
					}, function(err) {
						$scope.err = errMessage(err);
					});
			};

			$scope.createAccount = function(email, pass, confirm) {
				$scope.err = null;
				if (!email) {
					$scope.err = 'Please enter an email address';
				}
				else if (!pass || !confirm) {
					$scope.err = 'Please enter a password';
				}
				else if (pass != confirm ) {
					$scope.err = 'Passwords do not match';
				}

				if (!$scope.err) {
					simpleLogin.createAccount(email, pass).then(function(/* user */) {
						$modalInstance.close()
						$location.path('/account');
					}, function(err) {
						$scope.err = errMessage(err);
					});
				}
			};

			function errMessage(err) {
				return angular.isObject(err) && err.code ? err.code : err + '';
			}
		};

	}
]);
