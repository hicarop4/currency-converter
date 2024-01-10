import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed w-full border-b bg-zinc-100">
      <section className="m-auto max-w-5xl flex h-16 justify-between items-center px-8">
        <h1>
          <Link href={"/"} className="font-bold">
            coinless
          </Link>
        </h1>

        <nav>
          <ul className="flex justify-center items-center gap-x-4 h-16">
            <li className="hover:text-orange-600 transition-colors">
              <Link target="_blank" href={"https://github.com/hicarop4"}>
                <FaGithub size={25} />
              </Link>
            </li>
            <li className="hover:text-orange-600 transition-colors">
              <Link
                target="_blank"
                href={"https://www.linkedin.com/in/hicarop4/"}
              >
                <FaLinkedin size={25} />
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
