// Configurações de autenticação
export default {
    jwt: {
      secret: 'seuSegredoSuperSecreto', // depois vamos usar .env
      expiresIn: '15m' as const, // Token de acesso dura 15 minutos
    },
    refreshToken: {
      secret: 'refreshSuperSecreto',
      expiresIn: '7d' as const // Refresh token dura 7 dias
    }
}