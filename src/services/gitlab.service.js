const axios = require("axios");
require("dotenv").config();
async function testGitlabAccess() {
    const token = process.env.GITLAB_TOKEN;
  if (!token) {
    console.error("GitLab token is not set in environment variables.");
    return;
  }
  const response = await axios.get("https://gitlab.com/api/v4/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search: "web.pondlogs.com",
    },
  });

  console.log('Response:', response.data);
}

const getProjects = async () => {
  const response = await axios.get("https://gitlab.com/api/v4/projects", {
    headers: {
      Authorization: `Bearer ${process.env.GITLAB_TOKEN}`,
    }
  });
  
  console.dir(
    response.data.map((project) => ({
      id: project.id,
      name: project.name,
    })),
    { depth: null },
  );
};

const getFileContent = async (projectId, filePath) => {
  const encodedPath = encodeURIComponent(filePath);

  const response = await axios.get(
    `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${encodedPath}/raw`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITLAB_TOKEN}`,
      },
      params: {
        ref: "prod",
      },
    },
  );

  return response.data;
};

module.exports = {
  testGitlabAccess,
  getProjects,
};
