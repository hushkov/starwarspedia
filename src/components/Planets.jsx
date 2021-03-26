import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,

    data,
    isFetching,
    isPreviousData,
  } = useQuery(["planets", page], () => fetchPlanets(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h1>Planets</h1>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Prev Page
      </button>
      <span>{page}</span>
      <button
        onClick={() => setPage((old) => (data?.next ? old + 1 : old))}
        disabled={isPreviousData || !data?.next}
      >
        Next page
      </button>
      {(isLoading || isFetching) && <div>Loading ...</div>}
      {isError && <div>Error fetching data</div>}
      {data && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
