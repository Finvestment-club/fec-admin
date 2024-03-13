
import axios from "axios";
import { useContext, useState } from "react";
import createToast from "../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Auth/Register.css";
const Application = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      coverLetter: "",
      resume: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      coverLetter: Yup.string().required("Required"),
      resume: Yup.mixed().required("Resume is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("coverLetter", values.coverLetter);
      formData.append("resume", values.resume);
      formData.append("jobId", id);

      try {
        const { data } = await axios.post(
          "https://job-back-0zbl.onrender.com/api/v1/application/post",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        formik.resetForm();
        createToast(data.message, "success");
        navigateTo("/job/getall");
      } catch (error) {
        createToast(error, "error");
      }
    },
  });

  if (!isAuthorized || (user && user.role === "employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
          <input
            type="email"
            placeholder="Your Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <input
            type="number"
            placeholder="Your Phone Number"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error">{formik.errors.phone}</div>
          ) : null}
          <input
            type="text"
            placeholder="Your Address"
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}
          <textarea
            placeholder="CoverLetter..."
            {...formik.getFieldProps("coverLetter")}
          />
          {formik.touched.coverLetter && formik.errors.coverLetter ? (
            <div className="error">{formik.errors.coverLetter}</div>
          ) : null}
          <div>
            <label
              style={{
                textAlign: "start",
                display: "block",
                fontSize: "20px",
              }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(event) => {
                formik.setFieldValue("resume", event.currentTarget.files[0]);
              }}
              style={{ width: "100%" }}
            />
          </div>
          {formik.touched.resume && formik.errors.resume ? (
            <div className="error">{formik.errors.resume}</div>
          ) : null}
          <button type="submit">Send Article</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
