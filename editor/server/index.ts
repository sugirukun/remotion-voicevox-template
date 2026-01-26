import express from 'express';
import cors from 'cors';
import { scriptRouter } from './routes/script.js';
import { settingsRouter } from './routes/settings.js';
import { metadataRouter } from './routes/metadata.js';
import { actionsRouter } from './routes/actions.js';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/script', scriptRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/metadata', metadataRouter);
app.use('/api/actions', actionsRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Script Editor API running on http://localhost:${PORT}`);
});
