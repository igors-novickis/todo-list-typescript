# ToDo list API

## Setup

### Steps to run this project using Lando:

1. Install latest `Lando` version. https://lando.dev
2. Run `cp app/.env.example app/.env`
3. Edit `.env` settings
4. Run `lando start` command

### Steps to run this project independently:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `cp app/.env.example app/.env`
4. Edit `.env` settings
5. Run `npm start` command

## API documentation

### Authentication

`POST /auth/login`

#### Params
| Parameter name | Accepted values | Required |
|----------------|-----------------|----------|
| username       | string          | Yes      |
| password       | string          | Yes      |

#### Return
Returns JWT auth token to be used on protected routes.

---

### ToDo list

`GET /todo/list`

#### Params
| Parameter name | Accepted values       | Required |
|----------------|-----------------------|----------|
| status         | integer (from 1 to 3) | No       |
| skip           | integer               | No       |
| take           | integer               | No       |

#### Statuses meanings
| Num | Value     |
|-----|-----------|
| 1   | New       |
| 2   | Read      |
| 3   | Completed |

#### Return
Returns array with todo list tasks.

---

### ToDo add

`POST /todo/add`

#### Params
| Parameter name | Accepted values       | Required |
|----------------|-----------------------|----------|
| task           | string                | Yes      |

#### Return
Returns newly object of created todo task.

---

### ToDo update

`PATCH /todo/update/{id}`

#### Params
| Parameter name | Accepted values       | Required |
|----------------|-----------------------|----------|
| status         | integer               | No       |
| task           | string                | No       |

#### Statuses meanings
| Num | Value     |
|-----|-----------|
| 1   | New       |
| 2   | Read      |
| 3   | Completed |

#### Return
On success returns status code `204` with empty response.

---

### ToDo delete

`DELETE /todo/delete/{id}`

#### Return
On success returns status code `204` with empty response.
