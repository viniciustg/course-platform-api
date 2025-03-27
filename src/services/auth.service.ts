// Importa biblioteca para encriptar e comparar senhas
import bcrypt from 'bcryptjs';
// Importa o JWT e as configurações de segredo e tempo
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { prisma } from '../lib/prisma';

// Define a estrutura de um usuário
interface User {
  id: number;
  email: string;
  password: string; // senha encriptada
}

// Banco de dados fake (em memória por enquanto)
const users: User[] = [];

let userIdCounter = 1;

interface TokenPayload {
  sub: number;
  iat: number;
  exp: number;
}

export class AuthService {
  // Registra um novo usuário
  static async register(email: string, password: string) {
    // Verifica se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 8);

    // Salva o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    return user;
  }

  // Autentica o usuário e retorna JWT + Refresh Token
  static async login(email: string, password: string) {
    // Procura o usuário
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Compara a senha informada com a senha salva
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Senha inválida');
    }

    // Cria o token de acesso
    const token = jwt.sign(
      { sub: user.id }, // payload: quem é o dono do token
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn }
    );

    // Cria o refresh token
    const refreshToken = jwt.sign(
      { sub: user.id },
      authConfig.refreshToken.secret,
      { expiresIn: authConfig.refreshToken.expiresIn }
    );

    return {
      token,
      refreshToken
    };
  }

  static async refresh(refreshToken: string) {
    try {
      // Verifica o refresh token usando a chave secreta apropriada
      const decoded = jwt.verify(
        refreshToken,
        authConfig.refreshToken.secret
      ) as unknown as TokenPayload;

      // Garante que o ID do usuário está disponível no token decodificado
      const userId = decoded.sub;

      // Gera um novo token de acesso
      const token = jwt.sign(
        { sub: userId },
        authConfig.jwt.secret,
        { expiresIn: authConfig.jwt.expiresIn }
      );

      // Gera um novo refresh token
      const newRefreshToken = jwt.sign(
        { sub: userId },
        authConfig.refreshToken.secret,
        { expiresIn: authConfig.refreshToken.expiresIn }
      );

      // Retorna os novos tokens
      return { token, refreshToken: newRefreshToken };

    } catch (err) {
      // Se o token for inválido ou expirado, dispara erro
      throw new Error('Refresh token inválido ou expirado');
    }
  }
}
