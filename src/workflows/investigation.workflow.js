const { understandTicket } = require("../services/ai.service");

const runInvestigation = async (ticketContext) => {
  console.log("Starting Copilot ticket understanding...");

  const understanding = await understandTicket(ticketContext);

  console.log("Copilot understanding:");
  console.dir(understanding, { depth: null });

  return understanding;
};

module.exports = {
  runInvestigation,
};
