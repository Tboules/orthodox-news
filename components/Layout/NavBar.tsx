import Link from "next/link";
import React, { useEffect } from "react";
import useSWR, { Fetcher } from "swr";
import { Categories } from "../../types/categoires";

const fetcher: Fetcher<Categories, string> = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const NavBar = () => {
  const { data, error } = useSWR("/api/nav-items", fetcher);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const displayLinks = () => {
    return data;
  };

  return (
    <div>
      <h1>Nav Bar</h1>
      <ul>
        {data != null &&
          data.categories.map((cat) => {
            return (
              <div key={cat.slug}>
                <li>
                  <Link href={cat.slug}>
                    <a>{cat.name}</a>
                  </Link>
                </li>
                {cat.subCategories && (
                  <ul>
                    {cat.subCategories.map((subCat) => (
                      <li key={subCat.slug}>
                        <Link href={`${cat.slug}/${subCat.slug}`}>
                          <a>{subCat.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default NavBar;
