const { CopilotClient } = require("@github/copilot-sdk");

async function main() {
  const client = new CopilotClient();

  try {
    await client.start();

    const session = await client.createSession({
      model: "auto",
    });

    const response = await session.sendAndWait({
      prompt: "Reply with exactly: Copilot connection successful",
    });

    console.log(response.data.content);
  } finally {
    await client.stop();
  }
}

main().catch(console.error);
