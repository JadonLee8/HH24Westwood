from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
# Initialize the OpenAI client
openai.api_key = os.environ.get("OPENAI_KEY")
@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json

    if 'prompt' not in data:
        return jsonify({"error": "Prompt is required."}), 400

    prompt = data['prompt']

    try:
        # Call the OpenAI API to generate an image using the new method
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            n=1,  # Number of images to generate
            size="1024x1024"  # Image size
        )
        image_url = response.data[0].url  # Extract the image URL from the response
        print(image_url)
        return jsonify({"image_url": image_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
