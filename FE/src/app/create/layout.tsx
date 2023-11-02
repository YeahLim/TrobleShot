import UseSidebar from "../trouble/UseSidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="h-16"></div>
      <div className="px-2 flex justify-center">{children}</div>
    </>
  );
}