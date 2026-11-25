const buildTicketContext = ({ task, comments }) => {
  const attachments =
    task.attachments?.map((file) => ({
      id: file.id,
      title: file.title,
      mimeType: file.mime_type,
      url: file.url,
    })) || [];

  return {
    taskId: task.id,
    title: task.name,
    description: task.description,

    comments:
      comments.comments?.map((comment) => ({
        text: comment.comment_text,
        user: comment.user?.username,
      })) || [],

    attachments,
  };
};

module.exports = {
  buildTicketContext,
};
