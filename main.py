from flask import Flask, request, render_template, make_response
from backend.sample_coupons import sample_coupons
from flask_cors import CORS

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)

coupons = sample_coupons.copy()

@app.route('/', defaults={'path': ''})
def index(path):
    return render_template("index.html")

#GET: returns all coupons in their db
@app.route('/api/coupons', methods=['GET'])
def get_coupons():
    return make_response({'coupons':coupons},200)

@app.route('/api/redeem', methods=['PUT'])
def redeem():
    data = request.json
    print(data)
    coupons[data["id"] - 1]["used"] = True
    return make_response({'coupons':coupons})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, threaded=True, debug=True)