import TourCard from "./TourCard";

const FeaturedTours = () => {
  return (
    <section className="flex flex-col mt-11">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col mb-6">
          <h2 className="font-bold text-2xl uppercase text-gray-900">
            Featured Tours
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <TourCard />
          <TourCard />
          <TourCard />
          <TourCard />
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
