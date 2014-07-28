'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;
      $scope.name = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 5);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage && $scope.name) {
            $scope.messages.$add({text: $scope.newMessage, name: $scope.name});
            $scope.newMessage = null;
            $scope.name = null;
         }
      };
   }])

      .controller('SellCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newProduct = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.products = syncData('products', 5);

      // add new messages to the list
      $scope.addProduct = function() {
         if( $scope.newProduct) {
            $scope.products.$add({text: $scope.newMessage});
            $scope.newProduct = null;
         }
      };
   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(cb) {
         $scope.err = null;
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else {
            loginService.login($scope.email, $scope.pass, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', function($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
      $scope.syncAccount = function() {
         $scope.user = {};
         syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
            $scope.unBindAccount = unBind;
         });
      };
      // set initial binding
      $scope.syncAccount();

      $scope.logout = function() {
         loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
         $scope.emailerr = null;
         $scope.emailmsg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      $scope.updateEmail = function() {
        $scope.reset();
        // disable bind to prevent junk data being left in firebase
        $scope.unBindAccount();
        changeEmailService(buildEmailParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         };
      }
      function buildEmailParms() {
         return {
            newEmail: $scope.newemail,
            pass: $scope.pass,
            callback: function(err) {
               if( err ) {
                  $scope.emailerr = err;
                  // reinstate binding
                  $scope.syncAccount();
               }
               else {
                  // reinstate binding
                  $scope.syncAccount();
                  $scope.newemail = null;
                  $scope.pass = null;
                  $scope.emailmsg = 'Email updated!';
               }
            }
         };
      }

   }])

.controller("SellCtrl", ['$scope', 'syncData',  function ($scope, syncData) {
    
    $scope.vm = model;
    
    $scope.addNewItem = function (nameNewItem, qtyNewItem, kgpriceNewItem, picNewItem) {
        $scope.vm.items.push({hide: false, name: nameNewItem, qty: qtyNewItem, kgprice: kgpriceNewItem, price: "", pic: picNewItem });
    };
    
    $scope.calculatePrice = function (fqty, fkgprice) {
        var price = (fqty) * (fkgprice);
        
        return price;
    };
    
        
    $scope.countVisibleItems = function () {
        var countV = 0;
        angular.forEach($scope.vm.items, function (item) {
            if (!item.hide) {countV++}
        });
        return countV;
    };
    
    $scope.countHiddenItems = function () {
        var countH = 0;
        angular.forEach($scope.vm.items, function (item) {
            if (item.hide) {countH++}
    
    });
        return countH;
    };
    
    
    }]);