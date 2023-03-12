import Dropdown from "@/components/Dropdown";
import Head from "next/head";
const axios = require("axios");
import { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";

export default function Home({ currencies: { data } }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");

  const formatInput = (text) => {
    // THANKS CHATGPT
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
  };

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
        <title>Meu app</title>
        <meta name="description" content="Conversor de moedas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white min-w-[376px] px-8 py-6 rounded-lg shadow-lg border-gray-500/50 border-2">
        <section>
          <h1 className="font-bold">Conversor de moedas</h1>
          <div className="flex gap-3 items-center">
            <input
              onChange={handleInputChange}
              className="input-text"
              value={input}
              type="text"
              name="conversor"
              id="conversor"
              placeholder="ex: 1"
              autoComplete="false"
              autoCorrect="false"
            />
            <button onClick={invertCurrency}>
              <FaExchangeAlt className="text-primary hover:text-gray-700 text-2xl transition-colors" />
            </button>
            <input
              value={result}
              className="input-text"
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
          <span>De: </span>
          <Dropdown
            currencyList={data}
            setInputValue={setFromCurrency}
            inputValue={fromCurrency}
            name={"from"}
          />
          <span className="ml-8">Para: </span>
          <Dropdown
            currencyList={data}
            setInputValue={setToCurrency}
            inputValue={toCurrency}
            name={"to"}
          />
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const url = `https://api.currencyapi.com/v3/latest?apikey=${process.env.API_KEY}`;
  const { data: currencies } = await axios.get(url);

  return {
    props: {
      currencies,
    }, // will be passed to the page component as props
  };
}
