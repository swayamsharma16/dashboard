import Head from "next/head";
import DateRangePicker from "../components/DateRangePicker";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center align-middle pt-10">
        {" "}
        <DateRangePicker />
      </div>
    </div>
  );
}
