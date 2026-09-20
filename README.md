# api_typescript_infnet

API REST para gerenciamento de cursos e matrículas, desenvolvida com Node.js, TypeScript e Express.

## Tecnologias

- **Node.js** + **TypeScript**
- **Express 5**
- **JWT** para autenticação
- **Bcrypt** para hash de senhas
- **Zod** para validação
- **Swagger** para documentação
- **Jest** para testes

## Instalação

```bash
npm install
```

Configure o arquivo `.env` na raiz do projeto:

```env
JWT_SECRET=<sua_chave_secreta>
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor (porta 3000) |
| `npm run build` | Compila o TypeScript |
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
