import getAllUsers from "@/actions/getAllUsers";
import { getUser } from "@/actions/getUser";
import EmptyState from "@/components/EmptyState";
import DesktopSidebar from "@/components/Sidebar/DesktopSidebar";
import MobileFooter from "@/components/Sidebar/MobileFooter";
import UserList from "@/components/User/UserList";
import { ExtendedUser } from "@/types/types";

export default async function Home() {
  const user = await getUser({ protectedRoute: true });
  const allUsers = await getAllUsers();
  return (
    <div>
      <DesktopSidebar user={user as ExtendedUser} />
      <MobileFooter />
      <UserList items={allUsers as ExtendedUser[]} />
      <div className="hidden lg:block lg:pl-90 h-full">
        <EmptyState />
      </div>
    </div>
  );
}

// font-[family-name:var(--font-geist-sans)]
