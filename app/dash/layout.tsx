import Sidebar from "@/components/sidebar/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <>{children}</>
        </div>
    )
}