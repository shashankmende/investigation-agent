
const ACK_MESSAGE = require("../templates/acknowledgement");
const {
  getTaskDetails,
  getTaskComments,
} = require("../services/clickup.service");
const { processAttachments } = require("../services/attachment.service");
const { buildTicketContext } = require("../utils/context-builder");
const { runInvestigation } = require("../workflows/investigation.workflow");
// const { searchGitlab } = require("../services/gitlab-search.service");
const { testGitlabAccess, getProjects } = require("../services/gitlab.service");
const { selectRepositories } = require("../services/repository-selector.service");
const { searchRepository } = require("../services/gitlab-search.service");

console.log("ACK:");
console.log(ACK_MESSAGE);

const receiveTicket = async (req, res) => {
    try {
        const { taskId, taskName, description } = req.body;
        console.log("Received ticket:", { taskId, taskName, description });
        const taskDetails = await getTaskDetails(taskId);

        const comments = await getTaskComments(taskId);
        // console.log("Comments:", comments);

        const ticketContext = buildTicketContext({ task: taskDetails, comments });
        const findings = await processAttachments(ticketContext.attachments);

        const investigationContext = {
          ...ticketContext,
          attachmentFindings: findings,
        };
        const investigationResult = await runInvestigation(investigationContext);
        // const files = await searchGitlab(understanding.gitlab_search_terms);
        const selectedRepos = selectRepositories(investigationResult);    
      const searchTerm = investigationResult.gitlab_search_terms.join(" ");

      const allResults = [];

      for (const repo of selectedRepos) {
        const files = await searchRepository(repo.id, searchTerm);

        allResults.push({
          repository: repo.name,
          files,
        });
      }
        console.dir(allResults, {
          depth: null,
        });
        res.status(200).json({
            success: true,
        });
    }catch (error) {
        console.error("Error receiving ticket:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
  receiveTicket,
};
