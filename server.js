const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let issues = [
  { id: 1, title: "Issue 1", description: "Description of Issue 1" },
  { id: 2, title: "Issue 2", description: "Description of Issue 2" },
];

app.post("/create", (req, res) => {
  const issue = req.body;
  issues.push(issue);
  console.log("Created issue:", issue);
  res.status(201).json(issue);
});

app.get("/read", (req, res) => {
  res.json(issues);
});

app.put("/update", (req, res) => {
  const updatedIssue = req.body;
  let found = false;
  issues = issues.map((issue) => {
    if (issue.id === updatedIssue.id) {
      found = true;
      return updatedIssue;
    }
    return issue;
  });
  if (found) {
    console.log("Updated issue:", updatedIssue);
    res.json(updatedIssue);
  } else {
    res.status(404).json({ error: "Issue not found" });
  }
});

app.delete("/delete", (req, res) => {
  const issueId = req.body.id;
  const initialLength = issues.length;
  issues = issues.filter((issue) => issue.id !== issueId);
  if (issues.length < initialLength) {
    console.log("Deleted issue with id:", issueId);
    res.json({ message: "Issue deleted" });
  } else {
    res.status(404).json({ error: "Issue not found" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
