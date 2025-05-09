const express = require('express');
const router = express.Router();
const { checkRelevance } = require('../utils/checkRelevance');
const { generateBrief } = require('../services/openai');

router.post('/', async (req, res) => {
  const { transcript, reason } = req.body;

  const relevant = await checkRelevance(transcript, reason);
  if (!relevant) return res.status(400).json({ error: "Transcript doesn't match reason." });

  const output = await generateBrief(transcript, reason);
  res.json({ output });
});

module.exports = router;
