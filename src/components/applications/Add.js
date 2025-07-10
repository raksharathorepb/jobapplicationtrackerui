
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const AddJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState({
    company: "",
    position: "",
    status: "Applied",
    dateApplied: new Date().toISOString().split("T")[0],
  });

  //fetch function
  const fetchJobApplication = async (jobId) => {
    try {
      const res = await api.get(`/applications/${jobId}`);
      const data = res.data;

      setInitialValues({
        company: data.company || "",
        position: data.position || "",
        status: data.status || "Applied",
        dateApplied: data.dateApplied?.split("T")[0] || new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      toast.error("Failed to load application data.");
    }
  };

  //call fetch function
  useEffect(() => {
    if (isEditMode) {
      fetchJobApplication(id);
    }
  }, [id, isEditMode]);



  const validationSchema = Yup.object({
    company: Yup.string().required("Company name is required"),
    position: Yup.string().required("Position is required"),
    status: Yup.string().oneOf(["Applied", "Interview", "Offer", "Rejected"]),
    dateApplied: Yup.date()
      .required("Date applied is required")
      .max(new Date(), "Date cannot be in the future"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditMode) {
        await api.put(`/applications/${id}`, { ...values, id: parseInt(id) });
        toast.success("Job application updated!");
      } else {
        await api.post("/applications", values);
        toast.success("Job application submitted!");
      }
      navigate("/applications");
    } catch (error) {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="bg-white p-4 shadow rounded">
            <h3 className="mb-4 ">{isEditMode ? "Update Job Application" : "Add New Job Application"}</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">Company</label>
                    <Field
                      name="company"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="company"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Position</label>
                    <Field
                      name="position"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="position"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dateApplied" className="form-label">Date Applied</label>
                    <Field
                      name="dateApplied"
                      type="date"
                      className="form-control"
                      max={new Date().toISOString().split("T")[0]} //it restrict future dates
                    />
                    <ErrorMessage
                      name="dateApplied"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <Field name="status" as="select" className="form-select">
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-custom me-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                 
                    <button
                      type="button"
                      className="btn btn-custom"
                      onClick={() => navigate("/applications")}
                    >
                      {isEditMode ? "Cancel" : "Back"}
                    </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
