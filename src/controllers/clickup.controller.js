async function receiveTicket(req, res) {
  console.log("===============");
  console.log("CLICKUP EVENT");
  console.log("===============");

  console.dir(req.body, {
    depth: null,
  });

  res.status(200).json({
    success: true,
  });
}

module.exports = {
  receiveTicket,
};
