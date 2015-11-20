//var socket = new WebSocket("ws://127.0.0.1:8080");
var mainModule = angular.module('app', []);

mainModule.controller('mainViewController', ['$scope', function ($scope) {

    $scope.frameUrl = "sequencer.html"
    function hasGetUserMedia() {
     // Note: Opera builds are unprefixed.
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    var newBlob;
    var recorder;
    $scope.state = "Rec";
    $scope.globalStream = null;
    $scope.query = "Type here";
    $scope.user = null;
    $scope.name = "";
    $scope.recording = false;
    $scope.isUserNull = function()
    {
        console.log("isUserNull = ", $scope.user === null);
        return ($scope.user === null);
    }
    $scope.setUser = function(name)
    {
        $scope.user = name;
    }
   
    $scope.rec = function()
    {
        recorder.start(20000);
    }
    
    $scope.stop = function()
    {
        recorder.stop();
    }
 
    $scope.startRecord = function()
    {
        

        if( $scope.recording )
        {
            $scope.state = "Rec";
            console.log($scope.globalStream);

            $scope.globalStream.stop();
            $scope.recording = false;
            return;
        }
        $scope.state = "Stop";
        $scope.recording = true;
        navigator.getUserMedia = navigator.getUserMedia || 
                                 navigator.webkitGetUserMedia ||
                                 navigator.mozGetUserMedia || 
                                 navigator.msGetUserMedia;

        var onFailSoHard = function(e) {
            console.log('Reeeejected!', e);
            };

        navigator.getUserMedia({video: true, audio :true}, function(localMediaStream) {
        var video = document.querySelector('#source');
        video.src = window.URL.createObjectURL(localMediaStream);

        video.onloadedmetadata = function(e) {
        // Ready to go. Do some stuff.
        };
        var mediaRecorder = new MultiStreamRecorder(localMediaStream);
//        mediaRecorder.mimeType = 'video/webm';
        mediaRecorder.ondataavailable = function (blob) {
            console.log("ondataavailable", blob.audio);
            console.log("ondataavailable", blob.video);
            b2 = new Blob([blob.audio, blob.video]);
            var blobURL = URL.createObjectURL(b2);
            var videoDest = document.querySelector('#dest');
            videoDest.src = blobURL;
            videoDest.muted = false;
        }
        recorder = mediaRecorder;
        //mediaRecorder.start(3000);
  }, onFailSoHard);


        // Not showing vendor prefixes.
       // navigator.getUserMedia( {audio: true, video: true}, function(stream) {
       //     var mediaRecorder = new MediaStreamRecorder(stream);
            //var mediaRecorder = new MediaStreamRecorder(stream);
            //mediaRecorder.mimeType = 'video/webm';
           // mediaRecorder.ondataavailable = function (blob) {
            // POST/PUT "Blob" using FormData/XHR2
            //var blobURL = URL.createObjectURL(blob);
            //mediaRecorder.mimeType = 'video/webm';
           // mediaRecorder.ondataavailable = function (blob) {
            // POST/PUT "Blob" using FormData/XHR2
            //var blobURL = URL.createObjectURL(blob);
            //document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
//            var video = angular.element(document.querySelector('video'));
//            console.log(video);
//            video.src = window.webkitURL.createObjectURL(stream);
//            console.log(video.src);
//            $scope.globalStream = stream;
            // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
            // See crbug.com/110938.
//            video.onloadedmetadata = function(e) {
//                console.log("lil");
//            };
       // };
         //   mediaRecorder.start(3000);
 
            
//        }, onFailSoHard);
    
    }

}]);

mainModule.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", 
            function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
    };
});


