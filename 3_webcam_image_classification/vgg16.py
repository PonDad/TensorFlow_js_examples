import numpy as np
from keras.preprocessing import image
from keras.models import Model
from keras.applications import imagenet_utils, vgg16
import tensorflowjs as tfjs

def process_image(img_path):
	img = image.load_img(img_path, target_size=(224, 224))
	img_array = image.img_to_array(img)
	img_array = np.expand_dims(img_array, axis=0)
	pImg = vgg16.preprocess_input(img_array)
	return pImg

if __name__ == '__main__':
	test_img_path = test_img_path = "./static/img/coffee.jpg"
	pImg = process_image(test_img_path)
	vgg16 = vgg16.VGG16()
	prediction = vgg16.predict(pImg)
	results = imagenet_utils.decode_predictions(prediction)
	print(results)

	# convert the vgg16 model into tf.js model
	save_path = "./output/vgg16"
	tfjs.converters.save_keras_model(vgg16, save_path)
	print("[INFO] saved tf.js vgg16 model to disk..")
