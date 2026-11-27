const axios = require("axios");

const searchRepository = async (projectId, searchTerm) => {
  const response = await axios.get(
    `https://gitlab.com/api/v4/projects/${projectId}/search`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITLAB_TOKEN}`,
      },
      params: {
        scope: "blobs",
        search: searchTerm,
      },
    },
  );

  return response.data;
};

module.exports = {
  searchRepository,
};
