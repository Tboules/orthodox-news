import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NavBar = () => {
  const { data, error } = useSWR("/api/nav-items", fetcher);

  if (!data) return null;

  return <div>Nav Bar </div>;
};

export default NavBar;
