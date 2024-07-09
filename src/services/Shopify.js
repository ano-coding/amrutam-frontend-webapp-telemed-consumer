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

export async function shopfloCheckout() {
  try {
    const response = await axios.post(
      "/api/v1/cart/create-checkout",
      {
        cartId: "668773c74d83b3b4b89a9ef2",
        backUrl: "www.amrutam.global",
      },
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function searchWizzy(query) {
  try {
    const response = await axios.get(
      `/api/v1/products/searchProducts?q=${query}`,
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getInternalProductID(id) {
  try {
    const response = await axios.get(
      `https://judge.me/api/v1/products/888?shop_domain=amrutam3.myshopify.com&api_token=XsfSYKV1toU1cHKtcQnBG7q2FCA&external_id=${id}`,
      {
        maxBodyLength: Infinity,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function mostReviewedDoctors() {
  try {
    const response = await axios.get(
      "/api/v1/patient/doctors/most-reviewed-or-booked",
      {
        baseURL: "https://amrutam-dev-backend.azurewebsites.net",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDUyMzg0ZjZjYmNmYjMwNWNhYmYxZiIsImlhdCI6MTcxNDM3OTY1NywiZXhwIjoxNzE0NDY2MDU3fQ.BaA4TJTU0c6XvHFpesG-V0TJg32lOBrJTWgXqKV2eEE`,
        },
        maxBodyLength: Infinity,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
