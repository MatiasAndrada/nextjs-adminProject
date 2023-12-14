const { db } = require("@vercel/postgres");
const {
  invoices,
  customers,
  revenue,
  users,
  task_group,
  tasks,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seed_next_auth_tables(client) {
  try {
    await client.sql`
    CREATE TABLE IF NOT EXISTS verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,

  PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,

  PRIMARY KEY (id)
);

  `;
    console.log(`Created "next_auth" tables`);
  } catch (error) {
    console.error("Error seeding next_auth tables:", error);
    throw error;
  }
}
{
  /*
async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
        password VARCHAR(255) NOT NULL,
      );
    `;
    //validación de email con expresión regular
    //permite cualquier valor alfanumérico antes del @, luego un punto y luego 2 o mas letras

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (user_id, email, password)
        VALUES (${user.user_id}, ${user.email}, ${hashedPassword})
        ON CONFLICT (user_id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}
    */
}
async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        image_url VARCHAR(255) DEFAULT '/customers',
        phone VARCHAR(18) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url, phone)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url}, ${customer.phone})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

async function seed_tasks_groups(client) {
  try {
    //Create the "task_group" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS task_group (
        task_group_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        owner_id UUID NOT NULL,
        name VARCHAR(80) NOT NULL,
        description VARCHAR(1000) NULL,
        criticality VARCHAR(18) NOT NULL,
        status VARCHAR(18) NOT NULL,
        progress VARCHAR(18) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        ends_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `;
    console.log(`Created "task_group" table`);
    // Insert data into the "task_group" table
    const inserted_task_group = await Promise.all(
      task_group.map(async (task_group) => {
        return client.sql`
        INSERT INTO task_group (user_id, owner_id, name, description, criticality, status, progress) 
        VALUES (${task_group.user_id}, ${task_group.owner_id}, ${task_group.name}, ${task_group.description}, ${task_group.criticality}, ${task_group.status}, ${task_group.progress})
        ON CONFLICT (task_group_id) DO NOTHING;
      `;
      })
    );
  } catch (err) {
    console.error("Error seeding task group:", err);
    throw err;
  }
}

async function seed_tasks(client) {
  try {
    //Create the "task" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tasks(
        task_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        task_group_id UUID NOT NULL,
        user_id UUID NOT NULL,
        owner_id UUID NOT NULL,
        name VARCHAR(80) NOT NULL,
        description VARCHAR(1000) NULL,
        status VARCHAR(18) NOT NULL,
        progress INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        ends_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `;
    console.log(`Created "tasks" table`);
    // Insert data into the "tasks" table
    const inserted_task_group = await Promise.all(
      tasks.map(async (task) => {
        return client.sql`
        INSERT INTO tasks (task_group_id, user_id, owner_id, name, description, status, progress) 
        VALUES  (${task.task_group_id}, ${task.user_id}, ${task.owner_id}, ${task.name}, ${task.description}, ${task.status}, ${task.progress})
        ON CONFLICT (task_id) DO NOTHING;
      `;
      })
    );
    console.log(`Seeded ${inserted_task_group.length} tasks`);
  } catch (err) {
    console.error("Error seeding tasks:", err);
    throw err;
  }
}

async function main() {
  const client = await db.connect();
  await seed_next_auth_tables(client);
  //await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
  await seed_tasks_groups(client);
  await seed_tasks(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
