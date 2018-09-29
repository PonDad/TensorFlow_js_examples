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

$("#predict-button").click(function captureButton() {
	predict()
});

const CLASSES = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four',5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'}

let model;
async function loadModel() {
		console.log("model loading...");
		$("#console").html(`<li>model loading...</li>`);
		modelName = "vgg16";
		model = await tf.loadModel(`http://localhost:8080/sign_language_vgg16/model.json`);
		console.log("model loaded.");
		$("#console").html(`<li>vgg16 pre-trained model loaded.</li>`);
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
        className: CLASSES[i]
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
    let tensor = tf.fromPixels(image).resizeNearestNeighbor([100,100]);

		tensor = tf.cast(tensor, 'float32').div(tf.scalar(255));

    return tensor.expandDims();

}
