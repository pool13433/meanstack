var app = angular.module('myApp', []);
app.controller('appCtrl',['$scope','$http',function($scope,$http){
	$scope.contact = {};
	var refresh = function(){
		$http.get('/contactDb').success(function(response){
			//console.log(response);
			$scope.contactList = response;
			$scope.contact = {};
		});
	}
	refresh();
	$scope.addContact = function(){
		//$scope.contact.name 
		console.log('addContact');
		$http.post('/contactList',$scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	}	
	$scope.deleteContact = function(id){
		console.log(id);
		$http.delete('/contactList/'+id).success(function(response){
			console.log(response);
			refresh();
		});
	}
	/*
	* การอัพเดท
	*/
	/*$scope.editContact = function(contact){
		$scope.contact  = contact;
	}*/
	$scope.editContact = function(id){
		$http.get('/contactList/'+id).success(function(response){
			$scope.contact = response;
		});
	}
	/*
	*
	*/
	$scope.updateContact = function(){
		console.log($scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id,$scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	}
	$scope.clear = function(){
		$scope.contact = {};
	}
}]);