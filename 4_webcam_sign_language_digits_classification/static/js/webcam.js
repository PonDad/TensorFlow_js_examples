let localStream;
var isWebcamOn = 0;

function startWebcam() {
	var video = $('#main-stream-video').get(0);
	vendorUrl = window.URL || window.webkitURL;

	navigator.getMedia = navigator.getUserMedia ||
						 navigator.webkitGetUserMedia ||
						 navigator.mozGetUserMedia ||
						 navigator.msGetUserMedia;

	navigator.getMedia({
		video: true,
		audio: false
	}, function(stream) {
		localStream = stream;
		//video.src = vendorUrl.createObjectURL(stream);
    video.srcObject = stream;
		video.play();
		isWebcamOn = 1;
    $("#console").html(`<li>Camera on.</li>`);
	}, function(error) {
		alert("Something wrong with webcam!");
		isWebcamOn = 0;
	});

}

function stopWebcam() {
	localStream.getVideoTracks()[0].stop();
	isWebcamOn = 0;
  $("#console").html(`<li>Camera off.</li>`);
}

function captureWebcam() {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var video_img = document.querySelector("video");
  canvas.width = video_img.videoWidth;
  canvas.height = video_img.videoHeight;
  context.drawImage(video_img, 0, 0);
  var jpeg_img = document.getElementById("dummy-img");
  jpeg_img.src = canvas.toDataURL("image/jpeg", 0.8);
}
