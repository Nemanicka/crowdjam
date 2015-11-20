var app = angular.module('app', []);
app.controller('seqCtrl', function($scope) {
	$scope.rows = 2;
	$scope.columns = 5;
	$scope.tracks = new Array();
	$scope.frameUrl = "frame.html"
	var size = $scope.tracks.length;	
	/*
	$scope.init = function()
	{
		var sampleDivs = document.querySelector(".tb");
		for(var i=0; i<sampleDivs.length; ++i)
		{
			sampleDivs[i].addEventListener('onmousedown', function()
			{
				console.log("onmousedown");
			})
		}
	}
	*/
	
	var startPosX = undefined;
	
	$scope.onmousedown = function(e)
	{
		startPosX = e.x;
		elem = e.currentTarget;
		
		var pos = parseInt(elem.style.left, 10);
		console.log(startPosX);
		
		
		document.onmouseup = function(me)
		{
			document.onmousemove = null;
		}
		
		document.onmousemove = function(me)
		{
			console.log("me = ", me.x);
			console.log("start = ", startPosX);
			console.log("elem.style.left = ", elem.style.left);
			console.log("elem.style.left + me.x - startPosX = ",  parseInt(elem.style.left, 10) + me.x - startPosX);
			elem.style.left = pos + me.x - startPosX;
			
		}
		
	}
	
	$scope.getTimes = function(val)
	{
		return new Array(val);
	}
	
	$scope.addTrack = function()
	{	
		$scope.tracks.push("track");
		console.log($scope.tracks.length);
	}
	
	$scope.tracksSizeChanged = function()
	{
		return $scope.tracks.length;
	}
});