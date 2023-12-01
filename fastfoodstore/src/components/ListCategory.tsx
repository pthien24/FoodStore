import * as React from "react";
import { useState, useEffect } from "react";
import categoryService, { ICategory } from "../services/categoryService";

const ListCategory: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const loaddata = () => {
    categoryService.list().then((res) => {
      setCategories(res.data);
    });
  };
  useEffect(() => {
    loaddata();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
      {/* <ul>
        <li className="active" data-filter="*">
          All
        </li>
        {categories.map((category) => (
          <li key={category.id} data-filter={category.name}>
            {category.name}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default ListCategory;
