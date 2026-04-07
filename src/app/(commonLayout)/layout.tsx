import { Navbar } from "@/components/modules/home/Navbar";

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}