import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  
import JobTable from "../JobTable";
import Pagination from "../Source/pagination";
import api from "../../api";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 5;

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true); 


  const fetchJobs = async (pageNumber = 1) => {
    setLoading(true); 
    try {
      const res = await api.get("/applications", {
        params: {
          pageNumber,
          pageSize: ITEMS_PER_PAGE,
        },
      });

      setJobs(res.data.data);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch job applications:", error);
      toast.error("Failed to load Job application data.");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handleStatusChange = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  const handlePageChange = (newPage) => {
  setPage(newPage);
};


  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <h3 className="text-center mb-4">Welcome to Job Tracker</h3>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="bg-white p-3 p-md-4 shadow rounded">
             <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                <h3 className="mb-2 mb-md-0">Job Applications</h3>
                <Link to="/add" className="btn btn-custom ">
                  Add New Job
                </Link>
              </div>
             {loading ? (
                <div className="text-center my-5">
                  <Spinner animation="border" role="status" variant="primary" />
                </div>
              ) : (
                <>
                  <JobTable jobs={jobs} onStatusChange={handleStatusChange} />
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Applications;
