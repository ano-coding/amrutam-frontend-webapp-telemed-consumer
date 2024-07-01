import axios from "axios";

const uploadFileToS3 = async (file, token) => {
  try {
    const data = new FormData();
    data.append("file", file);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/utils/upload/s3",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default uploadFileToS3;
