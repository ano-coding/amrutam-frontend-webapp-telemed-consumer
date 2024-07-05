import axios from "axios";
let config = {
  baseURL: "https://amrutam-shopify-nodejs-dev.azurewebsites.net",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU0YTZjMWEzZTI1N2ExY2JmMmE1NCIsImlhdCI6MTcyMDA2NzQxMCwiZXhwIjoxNzI3ODQzNDEwfQ.tyMp4I-gninhfeteF23mJof17B3Bm_4kSrLo0IpvXPk`,
  },
  maxBodyLength: Infinity,
};

export async function getTopProducts(location) {
  try {
    const response = await axios.get(
      `/api/v1/products/topMongoProducts?location=${location}`,
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    const response = await axios.get(
      `/api/v1/products/${categoryId}/products`,
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleProduct(productId) {
  try {
    const response = await axios.get(
      `/api/v1/products/single/${productId}`,
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
export async function addToCart(data) {
  try {
    const response = await axios.post(
      "/api/v1/cart/add-to-cart",
      { ...data, userId: 6773619261693, cartId: 4595 },
      config,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCartByUserId() {
  try {
    const response = await axios.get(
      `/api/v1/cart/cart-items/6773619261693`,
      config,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCart(data) {
  try {
    const response = await axios.post(
      "/api/v1/cart/update-cart",
      { ...data, userId: 6773619261693, cartId: 4595 },
      config,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function clearCart() {
  try {
    const response = await axios.post(
      "/api/v1/cart/empty-cart/6773619261693/4595",
      {},
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
