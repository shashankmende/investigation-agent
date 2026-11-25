const processAttachments = async (attachments) => {
  const findings = [];

  for (const file of attachments) {
    findings.push({
      fileName: file.title,
      type: file.mimeType,
      summary: `Attachment found: ${file.title}`,
    });
  }

  return findings;
};

module.exports = {
    processAttachments,
};