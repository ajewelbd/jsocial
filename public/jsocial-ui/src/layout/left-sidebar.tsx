import { BoltIcon, BookOpenIcon, ChartPieIcon } from "@heroicons/react/20/solid"

const sidebarMenus = [
    {
        id: 1,
        title: "Posts",
        href: "/posts",
        color: "text-sky-500",
        icon: ChartPieIcon

    },
    {
        id: 2,
        title: "Groups",
        href: "/groups",
        color: "text-violet-500",
        icon: BoltIcon
    },
    {
        id: 3,
        title: "Pages",
        href: "/pages",
        color: "text-orange-700",
        icon: BookOpenIcon

    }
]
export default function LeftSidebar() {
    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {sidebarMenus.map(menu => (
                        <li key={menu.id}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <menu.icon className="w-5 h-5"/>
                                <span className="ml-3">{menu.title}</span>
                            </a>
                        </li>
                    ))}

                </ul>
            </div>
        </aside>
    )
}