# Proof-of-concept for a 3D Print on Demand platform

This is a proof-of-concept for a 3D Print on Demand platform.

## Features

Check out this video for a quick overview of the platform:
https://www.loom.com/share/5224d8056c994aebb958f6c193736bb1?sid=e0f6182e-a46e-4274-aaa1-10f33375eb67

[![3D Print on Demand platform](https://cdn.loom.com/sessions/thumbnails/5224d8056c994aebb958f6c193736bb1-9d2e4a458b017a77.jpg)](https://www.loom.com/share/5224d8056c994aebb958f6c193736bb1?sid=e0f6182e-a46e-4274-aaa1-10f33375eb67)

## Try it out

You can try out the platform at [https://poc-3d-print-on-demand.vercel.app/](https://poc-3d-print-on-demand.vercel.app/).

You can log in with any active Google account.

You can use the following files to test the platform:

- [AEROSPACE_TOOLING_SAMPLE_v4.step](./demo_resources/AEROSPACE_TOOLING_SAMPLE_v4.step)
- [SpeedShape_v1.iges](./demo_resources/SpeedShape_v1.iges)

## Technologies

Technologies used in this project are intended to be modern and scalable, focusing on developer experience and performance.
The objective is to create a platform that can be easily maintained and scaled in a quick and efficient way.

This project uses the following technologies:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [OpenCascade.js](https://ocjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TRPC](https://trpc.io/)
- [DrizzleORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vercel](https://vercel.com/)
- [Vercel Blob Storage](https://vercel.com/docs/solutions/file-storage)

## Development

Run the following commands to start the development server:

```bash
npm install
npm run db:migrate
npm run dev
```

## License

This project is offered as-is under the MIT license.
