import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-4 text-center text-xs">
      <p>
        {"Made with ❤️ by "}
        <Link
          href="https://github.com/paupenin"
          target="_blank"
          className="underline"
        >
          Pau Penin
        </Link>
      </p>
    </footer>
  );
}
