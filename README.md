# Remix With JWT Auth

## Deskripsi
implementasi konfigurasi sederhana untuk melakukan autentikasi JWT pada framework Remix

## Instalasi Depedensi
```bash
npm install
```

## Initialisasi Prisma
```bash
npx prisma init
npx prisma push db
```

## Konfigurasi ENV
```bash
# simpan dan ubah konfigurasi tanbahan ini pada file .env

JWT_SESSION_SECRET=secret_key
JWT_SESSION_EXP=expired_access_token_in_milliseconds

JWT_REFRESH_SECRET=secret_key
JWT_REFRESH_EXP=expired_refresh_token_in_milliseconds
```

## Penggunaan
### Development
```bash
npm run dev
```

### Build
```bash
# build untuk development
npm run build

# build untuk production
npm run build:prod
```

### Production
```bash
npm run start
```

## Tech Stack
- [React](https://react.dev) + [Remix](https://remix.run/)
- [Prisma](https://www.prisma.io/)
- [shadcn-ui](https://ui.shadcn.com/)
- [tailwindcss](https://tailwindcss.com/)
