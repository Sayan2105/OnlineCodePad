const express = require('express');
const app = express();
const PORT = 3000;

app.get('/test', (req, res) => {
    res.json({ message: 'Node backend connected' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
