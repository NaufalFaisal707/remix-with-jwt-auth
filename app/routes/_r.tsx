import { Outlet, useLoaderData } from "@remix-run/react";
import { redirect, replace } from "@remix-run/node";
import { CustomLoaderFunctionArgs } from "~/types";
import { UserProvider } from "~/context";

export const loader = async ({
  request,
  context,
}: CustomLoaderFunctionArgs) => {
  const {
    prisma,
    accessCookie,
    clearAccessCookie,
    verifyAccessToken,
    generateAccessToken,
    refreshCookie,
    clearRefreshCookie,
    verifyRefreshToken,
  } = context;

  const getAllCookies = request.headers.get("Cookie");

  const acp = verifyAccessToken(await accessCookie.parse(getAllCookies));
  const rcp = verifyRefreshToken(await refreshCookie.parse(getAllCookies));

  if (acp) {
    const { id } = acp as { id: string };

    const findUserByUnique = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        full_name: true,
        username: true,
        logout: true,
        created_at: true,
        logout_at: true,
      },
    });

    if (!findUserByUnique || findUserByUnique.logout) {
      throw replace("/login", {
        headers: [
          ["Set-Cookie", await clearAccessCookie.serialize("")],
          ["Set-Cookie", await clearRefreshCookie.serialize("")],
        ],
      });
    }

    return Response.json(findUserByUnique);
  }

  if (rcp) {
    const { id } = rcp as { id: string };

    const findUserByUnique = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        full_name: true,
        username: true,
        logout: true,
        created_at: true,
        logout_at: true,
      },
    });

    if (!findUserByUnique || findUserByUnique.logout) {
      throw replace("/login", {
        headers: [
          ["Set-Cookie", await clearAccessCookie.serialize("")],
          ["Set-Cookie", await clearRefreshCookie.serialize("")],
        ],
      });
    }

    const gat = generateAccessToken(id);

    return Response.json(findUserByUnique, {
      headers: {
        "Set-Cookie": await accessCookie.serialize(gat),
      },
    });
  }

  return redirect("/login", {
    headers: [
      ["Set-Cookie", await clearAccessCookie.serialize("")],
      ["Set-Cookie", await clearRefreshCookie.serialize("")],
    ],
  });
};

export default function Room() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <UserProvider user={loaderData}>
      <Outlet />
    </UserProvider>
  );
}
