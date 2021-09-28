import numpy as np
from PIL import Image
from feature_extractor import FeatureExtractor
from datetime import datetime
from flask import Flask, request, render_template
from pathlib import Path
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import Model
import random
app = Flask(__name__)

#read img features
fe = FeatureExtractor()
features = []
img_paths = []
for feature_path in Path("./static/feature").glob("*.npy"):
    features.append(np.load(feature_path))
    img_paths.append(Path("./static/img") / (feature_path.stem + ".jpg"))
features = np.array(features)

# Read image features
@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files["query_img"]

        #save query img
        img = Image.open(file.stream) #PLI image
        uploaded_img_path = "static/uploaded/"+ \
            datetime.now().isoformat().replace(":",".")+"_"+file.filename
        img.save(uploaded_img_path)

        query = fe.extract(img)
        dists = np.linalg.norm(features - query, axis=1)  # L2 distances to features
        ids = np.argsort(dists)[:30]  # Top 30 results
        ple = []
        while(len(ple)<=10):
            a = random.randrange(80)
            if(a not in ple):
                ple.append(a)
            
        scores = [( dists[i], img_paths[i]) for i in ple]
        return render_template("index.html",query_path=uploaded_img_path,scores = scores)
    else:    
        return render_template("index.html")


if __name__=="__main__":
    app.run(debug = True)