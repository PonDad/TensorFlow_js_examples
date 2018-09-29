let model;
$("#load-button").click(async function loadModel() {
		console.log("model loading..");
		$("#console").html(`<li>model loading...</li>`);
		modelName = "cats_dogs_vgg16";
		model=await tf.loadModel(`http://localhost:8080/cats_dogs_vgg16/model.json`);
		console.log("model loaded.");
		$("#console").html(`<li>VGG16 model with Dogs and Cats loaded.</li>`);
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
    pre = prediction[0].toFixed(6);

		console.log(pre);

		if(prediction < 0.5){
			result = CATS_DOGS_CLASSES[0]
			console.log(result);
		}else if (prediction >= 0.5) {
			result = CATS_DOGS_CLASSES[1]
			console.log(result);
		}

		$("#console").empty();
		$("#console").append(`<li>${result} : ${pre}</li>`);

});

function preprocessImage(image,modelName){
    let tensor = tf.fromPixels(image).resizeNearestNeighbor([150,150]);

		tensor = tf.cast(tensor, 'float32').div(tf.scalar(255));

    return tensor.expandDims();

}
