import Head from "next/head";
import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

export default function Home() {
  const [currency, setCurrency] = useState();

  return (
    <>
      <Head>
        <title>Meu app</title>
        <meta name="description" content="Conversor de moedas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white max-w-xl px-8 py-6 rounded-md shadow-lg">
        <section>
          <h1 className="font-bold">Conversor de moedas</h1>
          <div className="flex gap-3 items-center">
            <input
              className="input-text"
              type="text"
              name="conversor"
              id="conversor"
              placeholder="ex: USD, BRL, EUR"
            />
            <button>
              <FaExchangeAlt className="text-primary text-2xl" />
            </button>
            <input
              className="input-text"
              type="text"
              name="conversor"
              id="conversor"
              placeholder="ex: USD, BRL, EUR"
            />
          </div>
        </section>

        <section className="mt-4">
          <h1 className="font-bold">Taxa de câmbio</h1>
          <div>
            <article className="chart"></article>
          </div>
        </section>
      </main>
    </>
  );
}
