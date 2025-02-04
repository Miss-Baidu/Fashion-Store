import flask
import flask_cors
import sqlalchemy

app = flask.Flask(__name__)
flask_cors.CORS(app);

queryResults = []
try:
    engine = sqlalchemy.create_engine("mysql+mysqlconnector://fash:FashionStore?5@localhost/store");
    print('connected!!!!')
    with engine.connect() as conn:
        print(conn)
        try:
            results = conn.execute(sqlalchemy.text("SELECT * FROM products"));
            print(results);
            for row in results:
                queryResults.append({
                'product_id': row.product_id,
                'product_name': row.product_name, 
                'price': row.price,
                'quantity': row.quantity,
                'img_src': row.img_src
                })
                print(queryResults);
        except Exception as e:
            print(f"error occured {e}")
except Exception as e:
    print(f"error when connecting to database {type(e)}");



@app.route('/')
def home():
    print(queryResults);
    return flask.jsonify({'products': queryResults}); 

@app.route('/checkout', methods=['POST'])
def checkout():
    cartDetails = flask.request.get_json();
    print('PRINTING IN CARRRRTTTTTTT');
    for x in cartDetails['cart']:
        print(" PRODUCT ID  = ", x["product_id"])
        with engine.connect() as conn:
            try: 
                #query = conn.execute(sqlalchemy.text("select quantity from products where product_id = :id"), {"id": x["product_id"]});
                query = conn.execute(sqlalchemy.text("update products set quantity = quantity - :x_quantity where product_id = :x_id"), {"x_quantity": x["quantity"], "x_id": x["product_id"]});
                print("update done")
            except Exception as e:
                print("ERRORRRRR")
    return "Success"


with app.app_context():
    print("Database and tables created successfully!")


if __name__ == "__main__":
    app.run(debug=True, port= 4000);
