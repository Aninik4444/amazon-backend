const generateOrderMessage = (data) => {
  const productLines = data.products.map((p, i) => 
    `${i + 1}. ${truncate(p.productName, 30)} (x${p.quantity})`
  ).join(', ');

  return `Hi ${data.name}, your order ${data.orderId} with ${data.products.length} item(s) is confirmed: ${productLines}. - The Shop Team`;
};

const truncate = (str, len) => str.length > len ? str.slice(0, len - 1) + '…' : str;


module.exports = {
  generateOrderMessage
};
