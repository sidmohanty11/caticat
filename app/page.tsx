import ListCatCard from "@/components/ListCatCard";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import Link from "next/link";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let order = (searchParams.order as Order) || "RAND";
  if (
    order.toUpperCase() !== "RAND" &&
    order.toUpperCase() !== "ASC" &&
    order.toUpperCase() !== "DESC"
  ) {
    order = "RAND";
  }
  const page = parseInt(searchParams.page as string) || 1;
  const isAscOrDesc =
    order.toUpperCase() === "ASC" || order.toUpperCase() === "DESC";

  return (
    <main className="container space-y-4 my-4">
      <h2 className="text-center text-4xl font-mono">CatiCat</h2>
      <p className="text-center text-lg italic">Find your favorite cat here.</p>
      <ListCatCard order={order} page={page} />
      {isAscOrDesc ? (
        <div className="flex justify-center space-x-4">
          {page > 1 && (
            <Link href={`/?order=${order}&page=${page - 1}`}>
              <Button>Previous</Button>
            </Link>
          )}
          <Link href={`/?order=${order}&page=${page + 1}`}>
            <Button>Next</Button>
          </Link>
        </div>
      ) : null}
    </main>
  );
}
