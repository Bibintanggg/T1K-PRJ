import PillNav from "@/components/PillNav";
import logo from "@/public/Images/logo.png";

export default function Home() {
    return (
        <div className="bg-black min-h-screen">
            <div className="items-center justify-center mx-auto flex ">

            <PillNav
                logo={logo}
                items={[
                    { label: "Home", href: "/" },
                    { label: "Games", href: "/about" },
                ]}
                activeHref="/"
                pillTextColor="#fff"
                initialLoadAnimation
                className="custom-nav mt-10"
                />
                </div>
        </div>
    );
}
