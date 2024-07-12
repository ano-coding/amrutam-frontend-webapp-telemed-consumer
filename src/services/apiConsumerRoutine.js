import axios from "axios";

const API_BASE_URL =
  "https://amrutam-routine-nodejs-dev.azurewebsites.net/api/v1";

const STORE_API_BASE_URL =
  "https://amrutam-shopify-nodejs-dev.azurewebsites.net/api/v1";

export const fetchReminderTemplates = async (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminderlist/list/templates`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTodayReminders = async (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminder/find/today`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReminderList = async (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminderlist`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRoutine = async (routineData, token) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminderlist`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(routineData),
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateRoutine = async (routineData, token, routineId) => {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminderlist/${routineId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(routineData),
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategories = async (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/category`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRoutine = async (routineId, token) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminderlist/${routineId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createWeeklyBenefits = async (benefitsData, token) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/benefit`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(benefitsData),
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateWeeklyBenefit = async (benefitData, token, benefitId) => {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/benefit/${benefitId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(benefitData),
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteWeeklyBenefit = async (token, benefitId) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/benefit/${benefitId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProductReminder = async (token, reminderId) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminder/${reminderId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleRoutine = async (token, routineId) => {
  if (!routineId) {
    return {};
  }
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminderlist/${routineId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUnits = async (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/units`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleUnit = async (token, unitId) => {
  if (!unitId) {
    return {};
  }

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/units/${unitId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUnit = async (unitData, token) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/units`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(unitData),
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProductReminder = async (reminderData, token) => {
  console.log(token);
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminder`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(reminderData),
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProductReminder = async (
  reminderData,
  token,
  reminderId,
) => {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminder/${reminderId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(reminderData),
  };
  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createActivityReminder = async (reminderData, token) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminder-activity`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(reminderData),
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateActivityReminder = async (
  reminderData,
  token,
  reminderId,
) => {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminder-activity/${reminderId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(reminderData),
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteActivityReminder = async (token, reminderId) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/reminder-activity/${reminderId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createReminderChannel = async (channelData, token) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/channel`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(channelData),
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReminderChannel = async (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/patient/channel`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearchedProductsFromStore = async (token, searchQuery) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${STORE_API_BASE_URL}/products/searchProducts?q=${searchQuery}`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU0YTZjMWEzZTI1N2ExY2JmMmE1NCIsImlhdCI6MTcxOTU2NTIwMywiZXhwIjoxNzI3MzQxMjAzfQ.oVB2tY2lw-K_oWJ5yBnUA8kenujhHfF4jpB5oJbuh84",
    },
  };

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleProductFromStore = async (token, productId) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${STORE_API_BASE_URL}/products/single/${productId}`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU0YTZjMWEzZTI1N2ExY2JmMmE1NCIsImlhdCI6MTcxOTU2NTIwMywiZXhwIjoxNzI3MzQxMjAzfQ.oVB2tY2lw-K_oWJ5yBnUA8kenujhHfF4jpB5oJbuh84",
    },
  };

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/////////////////////////////////
