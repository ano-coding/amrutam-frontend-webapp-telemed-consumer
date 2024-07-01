import axios from "axios";
let config = {
  baseURL: "https://amrutam-shopify-nodejs-dev.azurewebsites.net",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU0YTZjMWEzZTI1N2ExY2JmMmE1NCIsImlhdCI6MTcxOTU2Nzk4MywiZXhwIjoxNzI3MzQzOTgzfQ.whBFbofx3bpxBOMs7JJRN0xRSLTRKEty6utFKMXz31M`,
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
