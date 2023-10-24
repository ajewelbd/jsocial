import Header from "../layout/header";
import LeftSidebar from "../layout/left-sidebar";
import RightSidebar from "../layout/right-sidebar";
import MainContent from "./main-content";

export default function Dashboard() {
    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <div className="flex">
                <LeftSidebar />
                <MainContent />
                <RightSidebar />
            </div>
        </div>
    )
}