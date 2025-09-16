import LeftNavbar from "@/components/LeftNavbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const res = await fetch("http://localhost:3001/api/check_user", {
    method: "Post",
    headers: {
      cookie: cookieString,
    },
  });

  if (!res.ok) {
    redirect("/signin");
  }

  const data = (await res.json()) as { user_id: string; success: boolean };
  if (!data.success) {
    redirect("/signin");
  }

  return (
    <section className="flex bg-[#4B4B3E] min-h-screen min-w-screen">
      <LeftNavbar userId={data.user_id} />
      <div className="flex-1 md:my-1.5 bg-[#252424] md:rounded-tl-2xl md:rounded-bl-2xl">
        {children}
      </div>
    </section>
  );
};

export default layout;
