import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourseCategories } from "@/features/courses/services/courseDetailsAPI";

const CourseCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchCourseCategories();
      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <h2 className="text-3xl font-semibold text-slate-900">
          Explore Categories
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}
              className="rounded-lg border border-slate-200 bg-white p-5 hover:border-blue-600">
              <h3 className="font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;
