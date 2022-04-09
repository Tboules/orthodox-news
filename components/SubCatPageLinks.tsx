import Link from "next/link";
import React from "react";
import { SubCategory } from "../src/generated/graphql";

type Props = {
  subCategories: SubCategory[];
  parentSlug: string;
};

const SubCatPageLinks: React.FC<Props> = ({ subCategories, parentSlug }) => {
  return (
    <div>
      <ul>
        {subCategories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href="/[category]/[subCategory]"
              as={`/${parentSlug}/${cat.slug}`}
            >
              <a>{cat.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCatPageLinks;
