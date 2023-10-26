import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Cat } from "@/types";

const CatCard = ({ cat }: { cat: Cat }) => {
  const breedName =
    cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].name : "Unknown Breed";
  return (
    <Link href={`/cat/${cat.id}`}>
      <Card
        style={{
          position: "relative",
          height: "300px",
          backgroundImage:
            'url("https://animalhaven.org/hubfs/raw_assets/public/animal-haven/images/placeholder--cat.png")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#C9CED3",
        }}
      >
        <Badge
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 10,
          }}
        >
          {breedName}
        </Badge>
        <Image
          className="rounded-md"
          src={cat.url}
          alt={cat.id}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Card>
    </Link>
  );
};

export default CatCard;
