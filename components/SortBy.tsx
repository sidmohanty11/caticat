import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Order } from "@/types";

const SortBy = ({ order }: { order: Order }) => {
  const router = useRouter();
  return (
    <Select
      value={order.toUpperCase()}
      onValueChange={(value) => {
        router.replace(`/?order=${value}&page=1`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="RAND">Random</SelectItem>
          <SelectItem value="ASC">Ascending</SelectItem>
          <SelectItem value="DESC">Descending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
