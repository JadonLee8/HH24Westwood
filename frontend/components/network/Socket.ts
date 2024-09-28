import { io } from 'socket.io-client';

const Socket = io('http://localhost:8765');
export default Socket;
