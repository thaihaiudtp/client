import SidebarAdminPage from "@/app/sidebar";
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }){
    return (
        <>
            <SidebarAdminPage />
            {children}
        </>
    )
}