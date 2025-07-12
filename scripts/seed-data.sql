-- Seed data for Food Delivery Platform

-- Insert categories
INSERT INTO categories (name, description, is_active) VALUES
('Pizza', 'Delicious handcrafted pizzas', true),
('Burgers', 'Juicy burgers and sandwiches', true),
('Salads', 'Fresh and healthy salads', true),
('Desserts', 'Sweet treats and desserts', true),
('Beverages', 'Refreshing drinks', true);

-- Insert sample users
INSERT INTO users (email, password_hash, name, phone, role) VALUES
('john@example.com', '$2b$10$hash1', 'John Doe', '(555) 123-4567', 'user'),
('jane@example.com', '$2b$10$hash2', 'Jane Smith', '(555) 987-6543', 'user'),
('admin@foodexpress.com', '$2b$10$hash3', 'Admin User', '(555) 000-0000', 'admin');

-- Insert addresses
INSERT INTO addresses (user_id, street, city, state, zip_code, is_default) VALUES
(1, '123 Main St', 'Springfield', 'IL', '62701', true),
(2, '456 Oak Ave', 'Springfield', 'IL', '62702', true);

-- Insert menu items
INSERT INTO menu_items (name, description, price, category_id, prep_time, is_vegetarian, rating) VALUES
('Margherita Pizza', 'Fresh tomatoes, mozzarella cheese, and basil leaves', 18.99, 1, '25-30 min', true, 4.8),
('Pepperoni Pizza', 'Classic pepperoni with mozzarella cheese', 21.99, 1, '25-30 min', false, 4.7),
('Supreme Pizza', 'Loaded with pepperoni, sausage, peppers, and onions', 24.99, 1, '30-35 min', false, 4.6),
('Chicken Burger', 'Grilled chicken breast with lettuce, tomato, and mayo', 12.99, 2, '15-20 min', false, 4.6),
('Veggie Burger', 'Plant-based patty with fresh vegetables', 11.99, 2, '15-20 min', true, 4.4),
('Bacon Cheeseburger', 'Beef patty with bacon and cheese', 14.99, 2, '15-20 min', false, 4.5),
('Caesar Salad', 'Crisp romaine lettuce with parmesan and croutons', 9.99, 3, '10-15 min', true, 4.5),
('Greek Salad', 'Fresh vegetables with feta cheese and olives', 10.99, 3, '10-15 min', true, 4.3),
('Garden Salad', 'Mixed greens with seasonal vegetables', 8.99, 3, '10-15 min', true, 4.2),
('Chocolate Cake', 'Rich chocolate cake with chocolate frosting', 6.99, 4, '5 min', true, 4.9),
('Tiramisu', 'Classic Italian dessert with coffee and mascarpone', 7.99, 4, '5 min', true, 4.8),
('Cheesecake', 'Creamy New York style cheesecake', 6.99, 4, '5 min', true, 4.7);

-- Insert sample orders
INSERT INTO orders (order_number, user_id, status, subtotal, delivery_fee, total, payment_method, payment_status) VALUES
('ORD001', 1, 'delivered', 31.98, 3.99, 35.97, 'card', 'completed'),
('ORD002', 2, 'preparing', 22.98, 3.99, 26.97, 'card', 'completed'),
('ORD003', 1, 'pending', 18.99, 3.99, 22.98, 'cash', 'pending');

-- Insert order items
INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES
(1, 1, 1, 18.99),
(1, 4, 1, 12.99),
(2, 2, 1, 21.99),
(3, 1, 1, 18.99);

-- Insert sample reviews
INSERT INTO reviews (user_id, menu_item_id, order_id, rating, comment) VALUES
(1, 1, 1, 5, 'Amazing pizza! Fresh ingredients and perfect crust.'),
(1, 4, 1, 4, 'Good burger, could use more seasoning.'),
(2, 2, 2, 5, 'Best pepperoni pizza in town!');
