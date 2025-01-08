from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = 'products'  # Optional, if you want to explicitly set the table name
    
    id = db.Column(db.Integer, primary_key=True)  # Auto-incrementing ID
    name = db.Column(db.String(255), nullable=False)  # Product name with more characters
    price = db.Column(db.Numeric(10, 2), nullable=False)  # Price with precision
    quantity = db.Column(db.Integer, nullable=False, default=0)  # Stock quantity, default 0

    def __repr__(self):
        return f'<Product {self.name}>'
