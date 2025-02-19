import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiServices";
import SearchQuery from "./SearchQuery";
import category from "../assets/data/Category";
const Cards = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [activePage, setActivePage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ApiService.get();
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }
    fetchData();
  }, []);

  const handleData = (data) => {
    setFilter((prev) =>
      JSON.stringify(prev) !== JSON.stringify(data) ? data : prev
    );
  };

  const totalPages = Math.ceil(filter.length / jobsPerPage);

  const currentRecords = filter.slice(
    (activePage - 1) * jobsPerPage,
    activePage * jobsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  return (
    <>
      <SearchQuery handleData={handleData} jobs={jobs} />

      <div className="p-4 sm:p-6 md:p-8 lg:p-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentRecords.length > 0 ? (
            currentRecords.map((job) => (
              <div
                key={job.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                    {job.title}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {job.company_name}
                  </p>
                  <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {job.category} | {job.candidate_required_location}
                  </p>
                  <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                    {job.description.replace(/<[^>]+>/g, "").slice(0, 150)}...
                  </p>
                </div>
                <p className="mb-3 font-semibold text-gray-700 dark:text-gray-300">
                  {job.job_type} - {job.salary}
                </p>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-auto"
                >
                  View Job
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No jobs available.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-5">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing {activePage + 1} to {Math.min(activePage, jobs.length)} of{" "}
              {jobs.length} entries
            </span>
            <div className="inline-flex mt-2">
              <button
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 disabled:bg-gray-500"
              >
                Prev
              </button>
              <span className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white">
                {activePage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(activePage + 1)}
                disabled={activePage === totalPages}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-r hover:bg-gray-900 disabled:bg-gray-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cards;
