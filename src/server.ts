import { app } from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`Servidor da API de IA rodando na porta ${env.PORT}.`);
});
