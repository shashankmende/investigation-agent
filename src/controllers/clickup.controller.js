async function receiveTicket(req, res) {
  console.log("====================================");
  console.log("METHOD:", req.method);

  console.log("HEADERS:");
  console.dir(req.headers, { depth: null });

  console.log("BODY:");
  console.dir(req.body, { depth: null });

  console.log("QUERY:");
  console.dir(req.query, { depth: null });

  console.log("====================================");

  return res.status(200).json({
    received: true,
  });
}

module.exports = {
  receiveTicket,
};
