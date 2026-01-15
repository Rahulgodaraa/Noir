export const openWhatsApp = (productName, contact) => {
  const phoneNumber = "6350694838"; // your business number

  const message = `
New Product Enquiry
Product: ${productName}
Customer Contact: ${contact || "Not provided"}
`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
