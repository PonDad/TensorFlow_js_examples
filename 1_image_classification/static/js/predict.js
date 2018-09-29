let model;
$("#load-button").click(async function loadModel() {
		console.log("model loading..");
		$("#console").html(`<li>model loading...</li>`);
		modelName = "vgg";
		model=await tf.loadModel(`http://localhost:8080/vgg16/model.json`);
		console.log("model loaded.");
		$("#console").html(`<li>VGG16 model with ImageNet loaded.</li>`);
});

$("#upload-button").change(function(){
    let reader = new FileReader();

    reader.onload = function(){
        let dataURL = reader.result;
        $("#selected-image").attr("src",dataURL);
        $("#console").html(`<li>image uploaded.</li>`);
    }
    let file = $("#upload-button").prop('files')[0];
    reader.readAsDataURL(file);

});

$("#predict-button").click(async function(){
    let image = $('#selected-image').get(0);
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
});

function preprocessImage(image,modelName){
    let tensor=tf.fromPixels(image)
    .resizeNearestNeighbor([224,224])
    .toFloat();

    let meanImageNetRGB= tf.tensor1d([123.68,116.779,103.939]);
    return tensor.sub(meanImageNetRGB)
                .reverse(2)
                .expandDims();

}
