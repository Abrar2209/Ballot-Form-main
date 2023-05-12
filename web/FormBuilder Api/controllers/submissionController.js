import db from "../index.js";
const Submission = db.submissions;

// Create submission
export const createSubmission = async (req, res) => {
    const data = req.body;

    const result = await Submission.create(data);
    res.status(200).send(result);
  };


  // Get all forms
export const getSubmissions = async (req, res) => {
    try {
      const data = await Submission.findAll();
      if (data) {
        res.status(200).json({
          data: data,
        });
      } else {
        res.status(400).json({
          data: `Submission table is empty!`,
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };