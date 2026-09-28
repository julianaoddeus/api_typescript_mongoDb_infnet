# API TYPESCRIPT + MONGODB

API REST para gerenciamento de cursos e matrículas, desenvolvida com Node.js, TypeScript, Express e MongoDB.

## Tecnologias

- **Node.js** + **TypeScript**
- **Express 5**
- **MongoDB** + **Mongoose**
- **TSOA** para geração de rotas e spec OpenAPI
- **JWT** para autenticação
- **Bcrypt** para hash de senhas
- **Swagger** para documentação
- **Jest** para testes

## Instalação

```bash
npm install
```

Configure o arquivo `.env` na raiz do projeto:

```env
JWT_SECRET=<sua_chave_secreta>
MONGODB_URI=mongodb://<usuario>:<senha>@localhost:27017/<banco>?authSource=admin
MONGODB_DATABASE=<nome_do_banco>
PORT=3000
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm start` | Gera rotas TSOA e inicia o servidor |
| `npm run build` | Gera rotas TSOA e compila o TypeScript |
| `npm run tsoa` | Gera rotas e spec OpenAPI via TSOA |
| `npm test` | Executa os testes |

## Documentação

Após iniciar o servidor, acesse a documentação Swagger em:

```
http://localhost:3000/docs
```

## Endpoints

### Auth
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/login` | Realiza login e retorna JWT | ❌ |

### Users
| Método | Rota | Descrição | Auth | Role |
|---|---|---|---|---|
| POST | `/users` | Criar usuário | ❌ | - |
| GET | `/users` | Listar usuários | ✅ | Admin |
| GET | `/users/:id` | Buscar usuário por ID | ✅ | Admin |
| PUT | `/users/:id` | Atualizar usuário | ✅ | Admin |
| DELETE | `/users/:id` | Deletar usuário | ✅ | Admin |

### Courses
| Método | Rota | Descrição | Auth | Role |
|---|---|---|---|---|
| POST | `/courses` | Criar curso | ✅ | Admin |
| GET | `/courses` | Listar cursos | ✅ | - |
| GET | `/courses/:id` | Buscar curso por ID | ✅ | - |
| GET | `/courses/enrollments/:userId` | Cursos com matrícula do usuário | ✅ | - |
| PUT | `/courses/:id` | Atualizar curso | ✅ | Admin |
| DELETE | `/courses/:id` | Deletar curso | ✅ | Admin |

### Enrollments
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/enrollments` | Criar matrícula | ✅ |
| PATCH | `/enrollments/:id` | Cancelar matrícula | ✅ |

## Autenticação

As rotas protegidas requerem o header:

```
Authorization: Bearer <token>
```
