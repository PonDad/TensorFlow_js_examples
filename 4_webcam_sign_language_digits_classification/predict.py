import numpy as np
import keras
from keras import layers
from keras import models
from keras import optimizers
from keras.preprocessing import image
from keras.models import load_model
from keras.applications import imagenet_utils, vgg16

classes = ['zero', 'one', 'two', 'three', 'four','five', 'six', 'seven', 'eight', 'nine']

# path to test image
#img_path = "/home/pondad/tfjs_test_4/static/img/cats_and_dogs_small_data/test/cats/cat.1505.jpg"
img_path = "./static/img/dataset/test/8/8_151.jpg"

img = image.load_img(img_path, target_size=(100, 100))
img_array = image.img_to_array(img)
pImg = np.expand_dims(img_array, axis=0)/255
#pImg = vgg16.preprocess_input(img_array)

model_path = './static/sign_language_vgg16_1.h5'

sign_language_vgg16 = load_model(model_path)

prediction = sign_language_vgg16.predict(pImg)[0]

print(prediction)
print(np.argmax(prediction))

#results = imagenet_utils.decode_predictions(prediction)
#print(results)

top_indices = prediction.argsort()[-5:][::-1]
result = [(classes[i] , prediction[i]) for i in top_indices]
for x in result:
    print(x)
