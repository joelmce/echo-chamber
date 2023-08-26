Whenever you update the Prisma schema, you will have to update your database schema using either `prisma migrate dev` or `prisma db push. This will keep the database schema in sync with the Prisma schema. The commands will also regenerate Prisma Client.

1. `createdb echo-chamber`
2. `npm install`
3. Create a `.env` file with:
   `DATABASE_URL="postgresql://username:password@localhost:5432/echo-chamber?schema=public"`
4. `npx prisma migrate dev`
5. If you want to use prisma's GUI to view/edit DB tables run `npx prisma studio`