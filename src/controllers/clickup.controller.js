async function receiveTicket(req, res) {
    console.log("Headers:");
    console.log(req.headers);

    console.log("Body:");
    console.dir(req.body, { depth: null });


  res.status(200).json({
    success: true,
  });
}

module.exports = {
  receiveTicket,
};
