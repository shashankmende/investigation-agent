const repositoryCatalog = require("../knowledge/repository-catalog");

const selectRepositories = (understanding) => {
  const searchText = [
    understanding.issue_summary,
    ...understanding.gitlab_search_terms,
  ]
    .join(" ")
    .toLowerCase();

  return repositoryCatalog.filter((repo) => {
    return repo.keywords.some((keyword) =>
      searchText.includes(keyword.toLowerCase()),
    );
  });
};

module.exports = {
  selectRepositories,
};
