"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "./components/Container";
import Video from "./components/Download";
import Search from "./components/Search";
import Header from "./components/Header";
import Support from "./components/Support";
import { DEVELOPMENT_URL } from "./libs/api";

export interface ResultInterface {
  format: [];
  thumbnail: string;
  title: string;
  url: string;
}

export interface selectedFormat {
  qualityLabel: string;
  itag: number;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<ResultInterface | null>();
  const [selectedFormat, setSelectedFormat] = useState<selectedFormat>({
    qualityLabel: "",
    itag: 0,
  });

  async function onSubmit(events: React.FormEvent<HTMLFormElement>) {
    events.preventDefault();
    try {
      setFetching(true);
      const res = await axios.post(DEVELOPMENT_URL + "/api/url", {
        url,
      });
      setResult(res?.data?.result);
      setFetching(false);
    } catch (error: any) {
      console.log(error);
      setFetching(false);
      setError(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    error && setResult(null);
  }, [error]);

  useEffect(() => {
    setError("");
  }, [result]);

  return (
    <Container>
      <div className="space-y-6">
        <Search
          url={url}
          setUrl={setUrl}
          onSubmit={onSubmit}
          fetching={fetching}
        />
        <Header />
        {fetching
          ? null
          : result && (
              <Video
                setSelectedFormat={setSelectedFormat}
                selectedFormat={selectedFormat}
                url={url}
                thumbnail={result?.thumbnail}
                title={result?.title}
                format={result?.format}
              />
            )}

        {!fetching && error && (
          <div className="flex justify-center ">
            <div className="rounded-xl flex items-center justify-center h-14 w-full md:w-[45rem] border border-red-700">
              <h1 className="text-2xl text-red-500 font-medium">{error}</h1>
            </div>
          </div>
        )}
      </div>
      <Support />
    </Container>
  );
}
