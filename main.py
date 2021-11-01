from flask import Flask, request, make_response
from backend.models import app, db, Coupon
#GET: returns all coupons in their db
@app.route('/api/coupons', methods=['GET'])
def get_coupons():
    coupon_list = Coupon.query.order_by(Coupon.id).all()
    response = list()
    coupon_dict={}
    for coupon in coupon_list:
        coupon_dict["id"] = coupon.id
        coupon_dict["title"] = coupon.title
        coupon_dict["desc"] = coupon.desc
        coupon_dict["request_by"] = coupon.request_by
        coupon_dict["requested_for"] = coupon.requested_for
        coupon_dict["used"] = coupon.used
        response.append(coupon_dict.copy())
    return make_response({'coupons':response},200)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, threaded=True, debug=True)