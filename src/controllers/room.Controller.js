import Room from '../models/room.model.js';

export const createRoom = async(req, res) => {
    const { roomname } = req.body;

    try {
        const existingRoom = await Room.findOne({ roomname });

        const newRoom = new Room({ roomname });
        await newRoom.save();

        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error al crear la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al crear la sala' });
    }
};

export const getAllRooms = async(req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error al obtener las salas:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener las salas' });
    }
};
export const joinRoom = async (req, res) => {
    const roomId = req.params.roomId;
    const userId = req.user.id;

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        if (room.users.length >= 8) {
            return res.status(400).json({ error: 'La sala está llena' });
        }

        if (room.users.includes(userId)) {
            return res.status(400).json({ error: 'El usuario ya está en la sala' });
        }

        room.users.push(userId);
        await room.save();

        res.status(200).json({ message: 'Unido a la sala exitosamente', room });
    } catch (error) {
        console.error('Error al unirse a la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al unirse a la sala' });
    }
};


export const getUsersInRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const room = await Room.findById(roomId)
            .populate('users', 'username mode')
            .populate('admin', 'username mode');

        if (!room) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        const usersWithAdmin = [];

        room.users.forEach((user, index) => {
            if (user) {
                const isAdmin = index === 0; 
                usersWithAdmin.push({
                    _id: user._id, 
                    username: user.username,
                    mode: user.mode,
                    isAdmin: isAdmin
                });
            }
        });

        res.status(200).json(usersWithAdmin);
    } catch (error) {
        console.error('Error al obtener usuarios en la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener usuarios en la sala' });
    }
};


export const getRoomNameById = async(req, res) => {
    const roomId = req.params.roomId;

    try {
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        res.status(200).json({ roomname: room.roomname });
    } catch (error) {
        console.error('Error al obtener el nombre de la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener el nombre de la sala' });
    }
};

export const getRoomByAdmin = async(req, res) => {
    const adminId = req.user.id;

    try {
        const room = await Room.findOne({ admin: adminId });

        if (!room) {
            return res.status(404).json({ error: 'El administrador no tiene ninguna sala creada' });
        }

        res.status(200).json(room);
    } catch (error) {
        console.error('Error al obtener la sala del administrador:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener la sala del administrador' });
    }
};
//---------------------------
export const deleteUserById = async (req, res) => {
    const { roomId } = req.params;
    const { userId } = req.body;
    const userDeletingId = req.user.id; 

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

       
        const userMakingRequest = room.users.find(user => user._id.toString() === userDeletingId);
        if (!userMakingRequest) {
            return res.status(403).json({ error: 'No estás autorizado para realizar esta acción' });
        }

   
        const userToDeleteIndex = room.users.findIndex(user => user._id.toString() === userId);
        if (userToDeleteIndex === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado en la sala' });
        }

    
        room.users.splice(userToDeleteIndex, 1);
        await room.save();

        res.status(200).json({ message: 'Usuario eliminado exitosamente', deletedUserId: userId });
    } catch (error) {
        console.error('Error al eliminar usuario de la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar usuario de la sala' });
    }
};
