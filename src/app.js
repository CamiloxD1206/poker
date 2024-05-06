import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import roomRoutes from "./routes/room.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        credentials: true
    }
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('overlayValidated', (valid) => {
      console.log('Overlay validated:', valid);
      io.emit('overlayValidationStatus', valid);
  });
});


app.use('/api', authRoutes);
app.use('/api', roomRoutes);
app.use('/api', taskRoutes);

export default server;