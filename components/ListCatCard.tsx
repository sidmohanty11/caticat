"use client";

import React, { useEffect, useState, memo } from "react";
import CatCard from "./CatCard";
import SortBy from "./SortBy";
import { Cat, Order } from "@/types";
import Loader from "./ui/loader";

const ListCatCard = ({ order, page }: { order: Order; page: number }) => {
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState<Cat[] | undefined>();

  const fetchCats = async (order: Order, page: number) => {
    setLoading(true);
    try {
      const cats = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}&order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
          },
        }
      );
      const catsJson = await cats.json();
      setCats(catsJson);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats(order, page);
  }, [order, page]);

  return (
    <div className="space-y-4">
      <SortBy order={order} />
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cats?.map((cat: Cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ListCatCard);
