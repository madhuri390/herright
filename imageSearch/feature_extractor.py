from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import Model
from pathlib import Path
from PIL import Image
import numpy as np

# See https://keras.io/api/applications/ for details

class FeatureExtractor:
    def __init__(self):
        base_model = VGG16(weights='imagenet',include_top=False)
        #self.model = Model(inputs=base_model.input, outputs=base_model.get_layer('fc1').output)

    def extract(self, img):
        """
        Extract a deep feature from an input image
        Args:
            img: from PIL.Image.open(path) or tensorflow.keras.preprocessing.image.load_img(path)
        Returns:
            feature (np.ndarray): deep feature with the shape=(4096, )
        """
        model = VGG16(weights='imagenet',include_top=False)
        img = img.resize((224, 224)) # VGG must take a 224x224 img as an input
        #img = img.convert('RGB')  # Make sure img is color
        x = image.img_to_array(img)  # To np.array. Height x Width x Channel. dtype=float32
        x = np.expand_dims(x, axis=0)  # (H, W, C)->(1, H, W, C), where the first elem is the number of img
        x = preprocess_input(x)  # Subtracting avg values for each pixel
        #model = Model(input=base_model.input, output=base_model.get_layer('fc2').output)
        # obtain the outpur of fc2 layer
        fc2_features = model.predict(x)[0] 
        #feature = self.model.predict(x)  # (1, 4096) -> (4096, )
        return fc2_features / np.linalg.norm(fc2_features)  # Normalize
