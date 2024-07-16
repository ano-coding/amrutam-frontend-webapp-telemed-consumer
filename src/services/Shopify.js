import axios from "axios";
const token = localStorage.getItem("token");
let shopifyToken;
if (token) {
  shopifyToken = localStorage.getItem("shopifyToken");
}

let config = {
  baseURL: "https://amrutam-shopify-nodejs-dev.azurewebsites.net",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${shopifyToken}`,
  },
  maxBodyLength: Infinity,
};

export async function getShopifyToken() {
  try {
    const response = await axios.post(
      "/api/v1/Users/login",
      {
        email: "care@amrutam.global",
        password: "Telemed@123$",
      },
      {
        baseURL: "https://amrutam-shopify-nodejs-dev.azurewebsites.net",
        maxBodyLength: Infinity,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

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
      { ...data },
      config,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCartByUserId(shopifyId) {
  try {
    const response = await axios.get(
      `/api/v1/cart/cart-items/${shopifyId}`,
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
      { ...data },
      config,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function clearCart(shopifyId, cartId) {
  try {
    const response = await axios.post(
      `/api/v1/cart/empty-cart/${shopifyId}/${cartId}`,
      {},
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function shopfloCheckout(_id) {
  try {
    const response = await axios.post(
      "/api/v1/cart/create-checkout-to-web",
      {
        cartId: _id,
        backUrl:
          "https://webhook.site/68c5c2fb-0e91-426b-becc-0e88d97fb0cf?backurl=here",
        sf_session_id: "56478a4dc9750ae96f973a26576a05b8d17469ae",
        success_url:
          "https://webhook.site/68c5c2fb-0e91-426b-becc-0e88d97fb0cf?successurl=here",
      },
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function markAsCheckedOutCart(shopifyId, cartId) {
  try {
    const response = await axios.post(
      `/api/v1/cart/cart-checkout/${shopifyId}/${cartId}`,
      {},
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
      `/api/v1/products/judgeMe?id=${id}`,
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductReviews(id) {
  try {
    const response = await axios.get(
      `/api/v1/products/judgeMe/productReview?id=${id}&perpage=10&page=1`,
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createReview(
  id,
  name,
  email,
  rating,
  body,
  title,
  picture_urls,
) {
  try {
    const response = await axios.post(
      `/api/v1/products/judgeMe/createReview?id=${id}&name=${name}&email=${email}&rating=${rating}&body=${body}&title=${title}&picture_urls=${picture_urls}`,
      {},
      config,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleProductMeta(id) {
  try {
    const response = await axios.get(
      `/api/v1/products/getProductMeta/single/${id}`,
      config,
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
          Authorization: `Bearer ${token}`,
        },
        maxBodyLength: Infinity,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
