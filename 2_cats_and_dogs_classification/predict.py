import numpy as np
import keras
from keras import layers
from keras import models
from keras import optimizers
from keras.preprocessing import image
from keras.models import load_model
from keras.applications import imagenet_utils, vgg16

# path to test image
#img_path = "/home/pondad/tfjs_test_4/static/img/cats_and_dogs_small_data/test/cats/cat.1505.jpg"
img_path = "/home/pondad/tfjs_test_4/static/img/cats_and_dogs_small_data/test/dogs/dog.1505.jpg"

img = image.load_img(img_path, target_size=(150, 150))
img_array = image.img_to_array(img)
pImg = np.expand_dims(img_array, axis=0)/255
#pImg = vgg16.preprocess_input(img_array)

model_path = '/home/pondad/tfjs_test_4/static/cats_dogs_small_1.h5'

cats_dogs_vgg16 = load_model(model_path)

prediction = cats_dogs_vgg16.predict(pImg)

print(prediction)

#results = imagenet_utils.decode_predictions(prediction)
#print(results)
