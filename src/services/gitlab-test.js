// gitlab-test.js

const axios = require("axios");

async function test() {
  const response = await axios.get(
    `${process.env.GITLAB_URL}/api/v4/projects`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITLAB_TOKEN}`,
      },
    },
  );

  console.log(response.data);
}

test();
