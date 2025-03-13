<----------setup---------->
install package: npm install

<----------command---------->
- run project: npm run dev
- check deploy: npm run build
- delete folder for new test run build: Remove-Item -Recurse -Force .next

<----------command prisma---------->
- create prisma: npx prisma migrate dev --name .... 
- use seed file in prisma: npx prisma db seed  
- new prisma.schema.prisma : npx prisma generate


