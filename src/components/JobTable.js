import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import api from "../api";

const JobTable = ({ jobs, onStatusChange }) => {
  const navigate = useNavigate();
  const handleStatusUpdate = async (job, newStatus) => {
    const updated = { ...job, status: newStatus };
    await api.put(`/applications/${job.id}`, updated);
    onStatusChange(job.id, newStatus);
  };
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // navigate to edit page with job id
  };

  return (
    <div className="table-responsive pb-5">
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Position</th>
          <th>Status</th>
          <th>Date Applied</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.company}</td>
            <td>{job.position}</td>
            <td className="status-cell">
              <select
                className="form-select status-dropdown"
                value={job.status}
                onChange={(e) => handleStatusUpdate(job, e.target.value)}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </td>
             <td>{new Date(job.dateApplied).toLocaleDateString()}</td>
            <td>
              <Link to={`/edit/${job.id}`} state={{ job }} className="btn btn-sm btn-custom">
                <i className="bi bi-pencil-square" style={{ cursor: "pointer" }}></i>
              </Link>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default JobTable;
