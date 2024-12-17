import Link from "next/link";

type ButtonLinkProps = {
  title: string;
  href: string;
};

export default function ButtonLink({ title, href }: ButtonLinkProps) {
  return (
    <Link
      className="hover:text-blue/50 cursor-pointer font-semibold text-blue-600"
      href={href}
      target="_blank"
    >
      {title}
    </Link>
  );
}
