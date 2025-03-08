import {
  ErrorResponse,
  Form,
  isRouteErrorResponse,
  Link,
  MetaFunction,
  redirectDocument,
  useRouteError,
} from "@remix-run/react";
import { CircleX, UserCircle2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { CustomActionFunctionArgs } from "~/types";
import ErrorInstance from "~/components/error-instance";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { useUser } from "~/context";
import { Label } from "~/components/ui/label";
import { useState } from "react";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const action = async ({
  request,
  context,
}: CustomActionFunctionArgs) => {
  const { prisma, verifyRefreshToken, refreshCookie } = context;

  const getAllCookies = request.headers.get("Cookie");

  const rcp = verifyRefreshToken(await refreshCookie.parse(getAllCookies));

  const formData = Object.fromEntries(await request.formData()) as {
    full_name: string;
    username: string;
    password: string;
    confirm_password: string;
  };

  if (formData.password) {
    if (formData.password !== formData.confirm_password) {
      throw Response.json(null, {
        status: 401,
        statusText: "konfirmasi password tidak sesuai",
      });
    }
  }

  const { full_name, username, password } = formData;

  await prisma.user.update({
    where: {
      id: rcp?.id,
    },
    data: {
      full_name,
      username,
      password,
    },
  });

  return redirectDocument("/profile");
};

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <LoginComponent error={error} />;
  }

  return <ErrorInstance error={error} />;
};

export default function Profile() {
  return <LoginComponent />;
}

const LoginComponent = ({ error }: { error?: ErrorResponse }) => {
  const user = useUser();

  const [password, setPassword] = useState("");

  return (
    <div className="grid h-svh place-content-center">
      <div className="m-4">
        <div className="mx-auto my-4 grid text-center">
          <UserCircle2 className="mx-auto my-4 size-10" />
          <h1 className="text-lg font-semibold">Setelan Profile</h1>
        </div>

        {!!error && (
          <Alert className="mb-4">
            <CircleX className="h-4 w-4" />
            <AlertTitle>{error?.status}</AlertTitle>
            <AlertDescription>{error?.statusText}</AlertDescription>
          </Alert>
        )}

        <Form method="POST" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="full_name">Nama Lengkap</Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Nama Lengkap"
              maxLength={24}
              minLength={4}
              required
              defaultValue={user?.full_name}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              required
              name="username"
              type="text"
              placeholder="username"
              maxLength={24}
              minLength={4}
              defaultValue={user?.username}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password Baru</Label>
            <Input
              name="password"
              type="password"
              placeholder="password"
              maxLength={32}
              minLength={4}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm_password">Konfirmasi Password Baru</Label>
            <Input
              required={!!password}
              disabled={!password}
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="password"
              maxLength={32}
              minLength={4}
            />
          </div>

          <div className="grid gap-y-2">
            <Button type="submit">Simpan</Button>
            <Button type="button" variant="outline" asChild>
              <Link to="/">Kembali</Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
