import { jwtVerify } from 'jose';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

export const verificarToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({error: "Token não enviado."});

    const token = authHeader.split(' ')[1];

    try {

        //Jose fazendo uma verificação de forma assincrona
        const { payload } = await jwtVerify(token, SECRET_KEY);
        req.userId = payload.id;
        next();
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
}