from models import app, db, Coupon
from sample_coupons import sample_coupons

#to do: only add coupons not already in db, leaving the ones in db untouched
def add_sample_coupons():
    for coupon in sample_coupons:
        newCoupon = Coupon(id = coupon["id"], title=coupon["title"], desc=coupon["desc"],
            request_by=coupon["request_by"], requested_for=coupon["requested_for"], used=coupon["used"],
            color=coupon["color"], image=coupon["image"])
        db.session.add(newCoupon)
        db.session.commit()

#clear database of all existing entities
db.drop_all()
#create entities (defined in models.py) in db
db.create_all()
#populate entities with sample coupons
add_sample_coupons()
