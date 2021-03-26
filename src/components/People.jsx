import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,

    data,
    isFetching,
    isPreviousData,
  } = useQuery(["people", page], () => fetchPeople(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h1>People</h1>
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
      {(isLoading || isFetching) && <div className="loading">Loading ...</div>}
      {isError && <div>Error fetching data</div>}
      {data && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
