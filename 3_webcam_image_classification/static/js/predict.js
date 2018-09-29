$("#load-button").click(function loadButton() {
loadModel();
});

let count = 0;
$("#webcam-button").click(function startButton() {
	if(count === 0){
		startWebcam();
		count = 1
	}else if(count === 1){
		stopWebcam();
		count = 0
	}
});

$("#capture-button").click(function captureButton() {
	predict()
});

let model;
async function loadModel() {
		console.log("model loading...");
		$("#console").html(`<li>model loading...</li>`);
		modelName = "vgg16";
		model = await tf.loadModel(`http://localhost:8080/vgg16/model.json`);
		console.log("model loaded.");
		$("#console").html(`<li>VGG16 model with ImageNet loaded.</li>`);
};

async function predict(){
		await captureWebcam()
    let image = $("#dummy-img").get(0);
    let tensor = preprocessImage(image,modelName);

    let prediction = await model.predict(tensor).data();
    let results = Array.from(prediction)
                .map(function(p,i){
    return {
        probability: p,
        className: IMAGENET_CLASSES[i]
    };
    }).sort(function(a,b){
        return b.probability-a.probability;
    }).slice(0,5);

		$("#console").empty();

		results.forEach(function(p){
		    $("#console").append(`<li>${p.className} : ${p.probability.toFixed(6)}</li>`);
		});
};


function preprocessImage(image,modelName){
    let tensor = tf.fromPixels(image)
    .resizeNearestNeighbor([224,224])
    .toFloat();//.sub(meanImageNetRGB)

    let meanImageNetRGB = tf.tensor1d([123.68,116.779,103.939]);
    return tensor.sub(meanImageNetRGB)
                .reverse(2)
                .expandDims();
}
