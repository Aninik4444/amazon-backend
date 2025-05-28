const getTemplate = (data) => {
  let total = 0;

  if (Array.isArray(data.products)) {
    total = data.products.reduce((total, product) => {
      const quantity = product?.quantity || 1;
      const price = product?.productPrice || 0;
      return total + quantity * price;
    }, 0);
  }
  const productsHtml = Array.isArray(data.products)
    ? data.products.map(product => `
      <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
        <img src="${product?.productImage || ''}" alt="${product?.productName || 'Product'}" style="width: 80px; height: auto; border-radius: 4px;" />
        <p><strong>Product:</strong> ${product?.productName || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${product?.quantity || 1}</p>
        <p><strong>Price:</strong> ₹${product?.productPrice || 0}</p>
      </div>
    `).join('')
    : '<p>No products found in your order.</p>';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h2 style="color: #333;">Hi ${data?.name || 'Customer'}, Thank you for your order!</h2>
    <p style="font-size: 16px; color: #555;">Hello <strong>${data?.name || 'Customer'}</strong>,</p>
    <p style="font-size: 16px; color: #555;">
      We’ve received your order and will notify you once it’s on the way.
    </p>

    <hr style="border: none; border-top: 1px solid #eee;" />

    <h3 style="color: #333;">Order Summary</h3>
    <p style="font-size: 16px; color: #555;">Order ID: <strong>${data?.orderId || 'N/A'}</strong></p>
    <p style="font-size: 16px; color: #555;">Total: <strong>₹${total}</strong></p>

    ${productsHtml}

    <hr style="border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 16px; color: #555;">
      If you have any questions, reply to this email — we’re happy to help!
    </p>
    <p style="font-size: 16px; color: #555;">– The Shop Team</p>

    <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #999;">
      © 2025 Your Company. All rights reserved.
    </footer>
  </div>
</body>
</html>
`;
};

module.exports = {
  getTemplate,
};

