const receiveTicket = async (req, res) => {
  console.log("====================================");
    console.log("CLICKUP EVENT");
    
    console.log("BODY TYPE:");
    console.log(typeof req.body);

    console.log("BODY:");
    console.dir(req.body, {
      depth: null,
    });

  console.log("\nHEADERS:");
  console.dir(req.headers, { depth: null });

  console.log("\nBODY:");
  console.dir(req.body, { depth: null });

  console.log("\nQUERY:");
  console.dir(req.query, { depth: null });

  console.log("====================================");

  res.status(200).json({
    success: true,
  });
};

module.exports = {
  receiveTicket,
};
