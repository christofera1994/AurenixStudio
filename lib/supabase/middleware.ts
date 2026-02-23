import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminLogin = path === "/admin/login";
  const isAdmin = path.startsWith("/admin");

  const response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  const { data } = await supabase.auth.getUser();

  if (isAdmin && !isAdminLogin && !data.user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (isAdminLogin && data.user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}
