import React, { useState, useEffect } from "react";
import categoryService, { ICategory } from "../services/categoryService";

const ListCategory: React.FC<{
  onSelectCategory: (category: number | null) => void;
  ShowAll: () => void;
  selectedCategory: number | null;
}> = ({ onSelectCategory, ShowAll, selectedCategory }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryService.list();
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-filters">
      <a
        href="/"
        className={`boxed-btn ${selectedCategory === null ? "selected" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          ShowAll();
        }}
      >
        ALL
      </a>
      {categories.map((category) => (
        <a
          key={category.id}
          href="/"
          className={`boxed-btn ${
            selectedCategory === category.id ? "selected" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory(category.id);
          }}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};

export default ListCategory;
