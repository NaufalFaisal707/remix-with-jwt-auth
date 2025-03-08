import { Form, Link } from "@remix-run/react";
import Container2xl from "~/components/container-2xl";
import { Button } from "~/components/ui/button";
import { useUser } from "~/context";

export default function RIndex() {
  const user = useUser();

  return (
    <Container2xl className="flex h-svh flex-col items-center justify-center gap-4">
      <h1>Berhasil Login</h1>
      <h1>{JSON.stringify(user)}</h1>
      <div className="flex gap-4">
        <Form action="/logout" method="GET">
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </Form>
        <Button asChild variant="outline">
          <Link to="/profile">Edit Profil</Link>
        </Button>
      </div>
    </Container2xl>
  );
}
