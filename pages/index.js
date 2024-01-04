import Dropdown from "@/components/Dropdown";
import Head from "next/head";
const axios = require("axios");
import { useState, useEffect, useCallback } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { getFlagClassFromCurrencyCode } from "@/utils/getFlagClassFromCurrencyCode";

export default function Home({ currencies: { data } }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");

  const formatInput = useCallback((text) => {
    if (text === 0) return;

    // convert commas to dots
    let formatText = text.replace(/\,/gm, ".");
    // delete non digits characters except dots
    formatText = formatText.replace(/[^\d.]/gm, "");
    // delete consecutive dots, changing it to just ONE dot
    formatText = formatText.replace(/[.]+/gm, ".");
    // delete all dots after the first being typed
    formatText = formatText.replace(/\.+/gm, function (match, index) {
      return index === formatText.indexOf(".") ? "." : "";
    });

    return formatText;
  }, []);

  const calculation = (formatText) => {
    const coeficient = 1 / (data[fromCurrency].value / data[toCurrency].value);
    const result = (Number(formatText) * coeficient).toFixed(2);

    return result;
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    const formatText = formatInput(text);
    setInput(formatText);
  };

  useEffect(() => {
    const resultValue = calculation(input);
    setResult(resultValue);
  }, [input, fromCurrency, toCurrency]);

  const invertCurrency = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <>
      <Head>
        <title>Conversor de Moedas | Câmbio</title>
        <meta name="description" content="Conversor de moedas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="bg-white sm:min-w-[376px] w-screen sm:w-auto px-4 sm:px-8 py-6 sm:py-6 sm:rounded-lg shadow-lg border-gray-500/50 sm:border-2">
        <section>
          <h1 className="font-bold">Conversor de moedas</h1>
          <div className="flex gap-3 items-center justify-between">
            <input
              onChange={handleInputChange}
              className="input-text w-full"
              value={input}
              type="text"
              name="conversor"
              id="conversor"
              placeholder="ex: 1"
              autoComplete="false"
              autoCorrect="false"
            />
            <button onClick={invertCurrency}>
              <FaExchangeAlt className="text-primary hover:text-gray-700 active:text-gray-600 text-2xl transition-colors" />
            </button>
            <input
              value={result}
              className="input-text w-full"
              type="text"
              name="conversor"
              id="conversor"
              readOnly
              autoComplete="false"
              autoCorrect="false"
            />
          </div>
        </section>
        <section className="mt-4">
          <h1 className="font-bold">Câmbio</h1>
          <article className="flex items-center mt-2">
            <span className="mr-1">De: </span>
            <span
              className={
                getFlagClassFromCurrencyCode(fromCurrency) +
                " mb-1 shrink-0 text-[30px]"
              }
            ></span>
            <Dropdown
              currencyList={data}
              setInputValue={setFromCurrency}
              inputValue={fromCurrency}
              name={"from"}
            />

            <span className="ml-8 mr-1">Para: </span>
            <span
              className={
                getFlagClassFromCurrencyCode(toCurrency) +
                " mb-1 shrink-0 text-[30px]"
              }
            ></span>
            <Dropdown
              currencyList={data}
              setInputValue={setToCurrency}
              inputValue={toCurrency}
              name={"to"}
            />
          </article>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const url = `https://api.currencyapi.com/v3/latest?apikey=${process.env.API_KEY}`;
  const { data: currencies } = await axios.get(url);

  return {
    props: {
      currencies,
    }, // will be passed to the page component as props
    revalidate: 3600, // will generate this page hourly
  };
}
