# T3/Mesh TaskManagerApp

This is sample project for learning T3 Stack.

## What does this project do?
This project is a simple task manager app that allows the user to create, read, update, and delete tasks.

## How to run this project?
1. Clone this repository
2. create .env file and add 'DATABASE_URL="file:./db.sqlite"'
3. Run `npx prisma db push`
4. Run `npm install`
3. Run `npm run dev`

## What does this project use?
1. The project uses Prisma as an ORM.
2. The project uses Tailwind CSS for styling.
3. The project uses tRPC for API communication.
4. The project uses Next.js (w/ Page Router) for routing.

## What does this project not use?
1. The project does not use NextAuth.js for authentication.
2. The project does not use Next.js (w/ App Router) for routing.

# Features

## 1. Select and connect a wallet
![](./assets/selectWallet.png)
![](./assets/chooseWallet.png)


## 2. Create a task
![](./assets/addTask.png)

## 3. Toggle a task as completed/not complete or delete a task
![](./assets/completeOrDelete.png)
