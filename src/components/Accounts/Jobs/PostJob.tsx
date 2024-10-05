import React, { useState } from "react";

import Button from "../../Buttons/Button";
import Notification from "../../Notification/Notification";

import Button2 from "../../Buttons/Button2";

interface propsType {
  formCancelHandler: () => void;
  formData?: {
    mode?: string;
    data?: any;
  };
}

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const PostJob = (props: propsType) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

  const [locationValue, setLocationValue] = useState(
    props.formData!.mode ? props.formData?.data[0].location : ""
  );
  const [positionValue, setPositionValue] = useState(
    props.formData!.mode ? props.formData?.data[0].position : ""
  );
  const [applyValue, setApplyValue] = useState(
    props.formData!.mode ? props.formData?.data[0].apply : ""
  );

  // const signInFormLink = () => {
  //     props.signInFormActive()
  // }

  const jobFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setBtnDisable(true);

    const formData = new FormData(event.target as HTMLFormElement);

    const newFormData = {
      position: formData.get("position"),
      location: formData.get("location"),
      contract: formData.get("contract"),
      apply: formData.get("apply"),
      description: formData.get("description"),
      requirements: {
        content: formData.get("requirementsContent"),
        items: [...formData.getAll("requirementItems")],
      },
      role: {
        content: formData.get("roleContent"),
        items: [...formData.getAll("roleItems")],
      },
    };

    newFormData.role.items = newFormData.role.items.filter((item) => {
      if (!(item as string).trim().length) {
        return false;
      }
      return true;
    });
    newFormData.requirements.items = newFormData.role.items.filter((item) => {
      if (!(item as string).trim().length) {
        return false;
      }
      return true;
    });

    const token = localStorage.getItem("token");

    try {
      if (props.formData!.mode) {
        const response = await fetch(
          `${API_BASE_URL}/api/jobs/${props.formData!.data[0].id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(newFormData),
          }
        );
        if (response.ok) {
          setNotification("Success! 🚀 Job was updated.");

          setTimeout(() => {
            setNotification("");
            props.formCancelHandler();
          }, 2000);

          setLoading(false);
          return;
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/api/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(newFormData),
        });
        if (response.ok) {
          setNotification("Success! 🚀 Job was posted.");

          setTimeout(() => {
            setNotification("");
            props.formCancelHandler();
          }, 2000);

          setLoading(false);
        }
        return;
      }
      throw new Error("");
    } catch (error) {
      setNotification("Something went wrong.");

      setTimeout(() => {
        setNotification("");
      }, 3000);

      setLoading(false);
    }
  };


  return (
    <form
      action=""
      onSubmit={jobFormHandler}
      className="edit--job-form"
      method="post"
    >
      {notification.length ? <Notification text={notification} /> : ""}
      <h2>New Job</h2>
      <div className="edit--job-content">
        <div className="edit--job-left">
          <label htmlFor="position">
            <span>Position*</span>
            <input
              type="text"
              name="position"
              onChange={(event) => {
                setPositionValue(event.target.value);
              }}
              value={positionValue}
              placeholder="Job title"
              id="position"
              required
            />
          </label>
          <label htmlFor="location">
            <span>Location*</span>
            <input
              type="text"
              name="location"
              onChange={(event) => {
                setLocationValue(event.target.value);
              }}
              value={locationValue}
              placeholder="Kigali, Nairobi"
              id="location"
              required
            />
          </label>
          <label htmlFor="contract">
            <span>Contract*</span>
            <select name="contract" id="">
              <option>Full time</option>
              <option>Part time</option>
            </select>
          </label>
          <label htmlFor="apply">
            <span>Apply Link*</span>
            <input
              type="text"
              name="apply"
              onChange={(event) => {
                setApplyValue(event.target.value);
              }}
              value={applyValue}
              placeholder="www.example.com/apply"
              id="apply"
              required
            />
          </label>
          <label htmlFor="description">
            <span>Description:</span>
            <textarea id="description" name="description" required>
              {props.formData!.mode ? props.formData?.data[0].description : ""}
            </textarea>
          </label>
          <label htmlFor="requirementsContent">
            <span>Requirements Content:</span>
            <textarea
              id="requirementsContent"
              name="requirementsContent"
              required
            >
              {props.formData!.mode
                ? props.formData?.data[0].requirements.content
                : ""}
            </textarea>
            <br />
          </label>
          <label htmlFor="roleContent">
            <span>Role Content:</span>
            <textarea id="roleContent" name="roleContent" required>
              {props.formData!.mode ? props.formData?.data[0].role.content : ""}
            </textarea>
          </label>
        </div>
        <div className="edit--job-right">
          <label htmlFor="requirementsItems">
            <span>Requirements Items:</span>
            <div className="requirement-items">
              <span>Item 1:</span>
              <textarea id="requirementItems" name="requirementItems" required>
                {props.formData!.mode
                  ? props.formData?.data[0].requirements.items[0]
                  : ""}
              </textarea>
              <span>Item 2:</span>
              <textarea id="requirementItems" name="requirementItems" required>
                {props.formData!.mode &&
                props.formData?.data[0].requirements.items[1]
                  ? props.formData?.data[0].requirements.items[1]
                  : ""}
              </textarea>
              <span>Item 4:</span>
              <textarea id="requirementItems" name="requirementItems" required>
                {props.formData!.mode &&
                props.formData?.data[0].requirements.items[2]
                  ? props.formData?.data[0].requirements.items[2]
                  : ""}
              </textarea>
              <span>Item 5:</span>
              <textarea id="requirementItems" name="requirementItems" required>
                {props.formData!.mode &&
                props.formData?.data[0].requirements.items[3]
                  ? props.formData?.data[0].requirements.items[3]
                  : ""}
              </textarea>
            </div>
          </label>

          <label htmlFor="roleItems">
            <span>Role Items:</span>
            <div className="role-items">
              <span>Item 1:</span>
              <textarea id="roleItems" name="roleItems" required>
                {props.formData!.mode
                  ? props.formData?.data[0].role.items[0]
                  : ""}
              </textarea>
              <span>Item 2:</span>
              <textarea id="roleItems" name="roleItems">
                {props.formData!.mode &&
                props.formData?.data[0].requirements.items[1]
                  ? props.formData?.data[0].role.items[1]
                  : ""}
              </textarea>
              <span>Item 3:</span>
              <textarea id="roleItems" name="roleItems">
                {props.formData!.mode &&
                props.formData?.data[0].requirements.items[2]
                  ? props.formData?.data[0].role.items[2]
                  : ""}
              </textarea>
              <span>Item 4:</span>
              <textarea id="roleItems" name="roleItems">
                {props.formData!.mode &&
                props.formData?.data[0].requirements.items[3]
                  ? props.formData?.data[0].role.items[3]
                  : ""}
              </textarea>
            </div>
          </label>
        </div>
      </div>
      <div className="edit--job-btn">
        <Button
          className=""
          text={props.formData!.mode ? "Update Job" : "Post Job"}
          loading={loading}
          disabled={btnDisable}
        />
        <div onClick={props.formCancelHandler}>
          <Button2 className="" text="Cancel" />
        </div>
      </div>
    </form>
  );
};
export default PostJob;
