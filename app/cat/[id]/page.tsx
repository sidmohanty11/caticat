"use client";

import { Card } from "@/components/ui/card";
import ColorMeter from "@/components/ui/color-meter";
import Loader from "@/components/ui/loader";
import { keysToNames } from "@/lib/utils";
import { Cat } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [cat, setCat] = React.useState<Cat | null>(null);

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCat(data);
        }
      } catch (error) {
        console.error("Error fetching cat:", error);
      }
    };
    getCat();
  }, [id]);

  const renderAccToKeys = (key: string, value: any) => {
    if (key === "Id" || key === "Description") {
      return null;
    }

    if (typeof value === "object") {
      // its weight object
      return (
        <div key={key} className="flex items-center">
          <span className="text-gray-500 text-sm mr-2">{key}</span>
          <span className="text-gray-700 text-sm">{value.metric} kg</span>
        </div>
      );
    }

    const isRating = parseInt(value) >= 0 && parseInt(value) <= 5;
    if (isRating) {
      return (
        <div key={key} className="flex items-center">
          <span className="text-gray-500 text-sm mr-2">{key}</span>
          <ColorMeter rating={value} />
        </div>
      );
    }

    if (key.includes("url")) {
      return (
        <div key={key} className="flex items-center">
          <span className="text-gray-500 text-sm mr-2">{key}</span>
          <span className="text-blue-500 text-sm">
            <a href={value} target="_blank" rel="noreferrer">
              {value}
            </a>
          </span>
        </div>
      );
    }

    return (
      <div key={key} className="flex items-center">
        <span className="text-gray-500 text-sm mr-2">{key}</span>
        <span className="text-gray-700 text-sm">{value}</span>
      </div>
    );
  };

  if (!cat) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container flex justify-center items-center my-10">
      <Card className="flex flex-col lg:flex-row p-4">
        <div className="relative min-h-[500px] min-w-[500px] lg:w-1/2">
          <Image
            className="rounded-md"
            src={cat?.url}
            alt={cat?.id}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        {cat.breeds ? (
          <div
            style={{
              width: "60%",
            }}
            className="ml-4"
          >
            <h1 className="text-2xl font-bold">{cat?.breeds[0].name}</h1>
            <p className="text-gray-500 text-sm">
              {cat?.breeds[0].description}
            </p>
            <div className="mt-4">
              {
                Object.entries(keysToNames(cat.breeds[0])).map(([key, value]) =>
                  renderAccToKeys(key, value)
                )
              }
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default DetailsPage;
