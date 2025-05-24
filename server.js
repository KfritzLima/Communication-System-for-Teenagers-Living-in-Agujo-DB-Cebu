const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Update this to your actual dist folder!
const buildFolder = path.join(__dirname, 'dist/login-form-final-project-angular');

app.use(express.static(buildFolder));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildFolder, 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
