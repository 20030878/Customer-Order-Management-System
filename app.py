from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Sample products
products = [
    {"id": 1, "name": "Coffee", "price": 3, "description": "Fresh brewed coffee", "image": "coffee.jpg"},
    {"id": 2, "name": "Tea", "price": 2.5, "description": "Relaxing tea", "image": "tea.jpeg"},
    {"id": 3, "name": "Sandwich", "price": 5, "description": "Delicious sandwich", "image": "sandwich.jpeg"},
]

cart = []
orders = []

# Route to display the homepage
@app.route('/')
def home():
    return render_template('index.html', products=products)

# Route to add a product to the cart
@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        cart.append(product)
    return redirect(url_for('home'))

# Route to view the cart
@app.route('/cart')
def view_cart():
    total = sum(item['price'] for item in cart)
    return render_template('cart.html', cart=cart, total=total)

# Route to checkout and place an order
@app.route('/checkout')
def checkout():
    if not cart:
        return redirect(url_for('view_cart'))
    total = sum(item['price'] for item in cart)
    order = {
        'id': len(orders) + 1,
        'items': cart,
        'total': total,
        'status': 'Pending',
    }
    orders.append(order)
    cart.clear()  # Clear the cart after checkout
    return redirect(url_for('view_orders'))

# Route to view orders
@app.route('/orders')
def view_orders():
    return render_template('orders.html', orders=orders)

if __name__ == '__main__':
    app.run(debug=True)
