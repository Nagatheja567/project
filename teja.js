const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require('key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://quilt-scrawny-hadrosaurus.glitch.me',
});

// Define a route to read data from Firebase
app.get('/read-data', async (req, res) => {
  try {
    const db = admin.database();
    const ref = db.ref('Register + login'); // Replace with your desired database path

    const snapshot = await ref.once('value');
    const data = snapshot.val();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
