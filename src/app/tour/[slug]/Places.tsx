import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface PlacesProps {
  gallery: {
    id: number;
    title: string;
    image: string;
  }[];
}

const Places = ({ gallery }: PlacesProps) => {
  return (
    <div className="w-full mt-10">
      <h2 className="text-2xl font-bold text-muted-foreground">
        Places You’ll See
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-6"
      >
        <CarouselContent>
          {gallery.map((g) => (
            <>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={g.id}>
                <div className="h-[280px] relative">
                  <Image
                    src={g.image}
                    alt={g.title}
                    className="object-cover rounded-md"
                    fill
                  />
                </div>
                <h3 className="text-muted-foreground font-medium text-1xl mt-2">
                  {g.title}
                </h3>
              </CarouselItem>
            </>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Places;
