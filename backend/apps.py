from flask import Flask, request, jsonify
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)


@app.route("/", methods=['post', ])
def poh_check():
    app.logger.debug(request.json)

    signer = request.json.get('address')
    message = request.json.get('message')
    signature = request.json.get('signature')
    if signer and message and signature:
        data = f"signer: {signer}, message: {message}, signed value: {signature}"
        app.logger.info(data)
        return jsonify({
            "message": "data received successfully"
        }), 200
    else:
        return jsonify({
            "message": "Error, data is not valid"
        }), 400
