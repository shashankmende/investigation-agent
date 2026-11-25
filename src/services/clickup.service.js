const axios = require("axios");
const { config } = require("dotenv");
config();
const getTaskDetails = async (taskId) => {
    console.log("TaskId:", taskId);
    console.log(`https://api.clickup.com/api/v2/task/${taskId}`);
    try {
        const response = await axios.get(
            `https://api.clickup.com/api/v2/task/${taskId}`,
            {
                headers: {
                    Authorization: process.env.CLICKUP_API_TOKEN,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error.response? error.response.data : error.message);
        throw error;
    }
}

const getTaskComments = async (taskId) => {
  try {
    const response = await axios.get(
      `https://api.clickup.com/api/v2/task/${taskId}/comment`,
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = {
  getTaskDetails,
  getTaskComments,
};
