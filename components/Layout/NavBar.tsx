import Link from "next/link";
import React, { useEffect } from "react";
import useSWR, { Fetcher } from "swr";
import { Category } from "../../src/generated/graphql";

const fetcher: Fetcher<{ categories: Category[] }, string> = async (
  url: string
) => {
  const res = await fetch(url);
  return res.json();
};

const NavBar = () => {
  const { data, error } = useSWR("/api/nav-items", fetcher);

  return (
    <div>
      <h1>Nav Bar</h1>
      <ul>
        {data != null &&
          data.categories.map((cat) => {
            return (
              <div key={cat.slug}>
                <li>
                  <Link href="/[category]" as={`/${cat.slug}`}>
                    <a>{cat.name}</a>
                  </Link>
                </li>
                {cat.subCategories && (
                  <ul>
                    {cat.subCategories.map((subCat) => (
                      <li key={subCat.slug}>
                        <Link
                          href="/[category]/[subCategory]"
                          as={`/${cat.slug}/${subCat.slug}`}
                        >
                          <a>{subCat.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        <li>
          <Link href="/issues">
            <a>Issues</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
