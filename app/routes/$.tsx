import { Link } from "@remix-run/react";

export const meta = () => [
  {
    title: "404 | Page not found",
  },
];

export default function unknownPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="text-muted-foreground mt-2">
        This page could not be found.
      </p>
      <Link
        to="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2 text-sm transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
