## Getting Started

To get started with the project, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your machine:

Node.js
MySQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/declan-rice-41/Wilson_Law_Lucky_Draw.git
```

2. Navigate to the project directory:

```bash
cd lucky-draw-system
```

3. Install the dependencies:

```bash
yarn install
```

4. Create schema `lucky-draw`

5. Set up the environment variables:

Create a new file named `.env` in the root directory of the project and define the following environment variables:

```plaintext
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lucky-draw
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
SERVER_PORT=8000
```

Make sure to replace the placeholder values with your actual database connection details.

6. Execute database migration

```bash
yarn migrate:dev
```

7. Execute database seeding

```bash
yarn seed
```

### Usage

To start the Express.js server, use the following command:

```bash
yarn start
```

The server will start running on `http://localhost:8000`.

### API Documentation

API documentation with Swagger is available at `http://localhost:8000/docs`.

### Probability Manuipulation

Each prize probability can be manuipulated by changing the `mockPrizes` of prize seeder (i.e. [label](seeders/20231018063638-prize.cjs))
It could be manuipulated by API in next update.
