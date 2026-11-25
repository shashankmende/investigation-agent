const { CopilotClient } = require("@github/copilot-sdk");

const understandTicket = async (ticketContext) => {
  const client = new CopilotClient();

  try {
    await client.start();

    const session = await client.createSession({
      model: process.env.AI_MODEL || "auto",
    });

const prompt = `
You are a senior production support engineer and software investigator.

Your responsibility is ONLY to understand the ticket and prepare for investigation.

Treat the ticket as evidence.

Your job is to extract structured investigation information.

Return ONLY valid JSON.

Schema:

{
  "issue_summary": "",
  "issue_category": "",
  "affected_feature": "",
  "expected_behavior": "",
  "actual_behavior": "",
  "business_impact": "",

  "entities": {
    "devices": [],
    "ponds": [],
    "schedules": [],
    "tickets": [],
    "users": [],
    "dates": [],
    "environments": [],
    "metrics": []
  },

  "attachments_summary": [],

  "comments_summary": [],

  "known_facts": [],

  "unknowns": [],

  "investigation_questions": [],

  "gitlab_search_terms": [],

  "recommended_data_sources": [],

  "investigation_type": "",

  "confidence": 0
}

Definitions:

issue_category:
One of:
- feed_mismatch
- device_offline
- schedule_issue
- reporting_issue
- do_readings_issue
- rq_issue
- alert_issue
- communication_issue
- backend_error
- unknown

investigation_type:
One of:
- code_investigation
- data_investigation
- device_investigation
- reporting_investigation
- mixed

known_facts:
Only include facts explicitly present in the ticket.

unknowns:
Information required but not provided.

investigation_questions:
Questions an engineer must answer before reaching RCA.

gitlab_search_terms:
Specific technical terms suitable for GitLab searching.
Prefer:
- API names
- feature names
- service names
- module names
- business terminology

recommended_data_sources:
Examples:
- schedule_running_api
- hourly_feed_api
- daily_feed_collection
- feed_logs
- device_logs
- alerts_collection
- do_readings_collection

attachments_summary:
Summarize each attachment separately.

comments_summary:
Summarize meaningful investigation comments only.
Ignore comments such as:
- "ok"
- "sure"
- "please close"
- acknowledgements

confidence:
Number between 0 and 1 indicating understanding confidence.

Rules:

- Do not invent entities.
- Do not assume root cause.
- Ignore operational noise.
- Extract every pond/device/schedule identifier mentioned.
- Use ticket title, description, comments and attachment findings.
- Return ONLY JSON.

Ticket Context:

${JSON.stringify(ticketContext, null, 2)}
`;

    const response = await session.sendAndWait({
      prompt,
    });

    const content = response?.data?.content;

    if (!content) {
      throw new Error("Copilot returned an empty response");
    }

    // Remove markdown fences if the model adds them
    const cleaned = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const understanding = JSON.parse(cleaned);

    return understanding;
  } finally {
    await client.stop();
  }
};

module.exports = {
  understandTicket,
};
