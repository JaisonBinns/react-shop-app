import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    //saves image to backend
    Axios.post("/api/product/uploadImage", formData, config).then(
      (response) => {
        if (response.data.success) {
          setImages([...Images, response.data.image]); //adds image(s)
          props.refreshFunction([...Images, response.data.image]); //updates to product page
        } else {
          alert("Failed Image Save");
        }
      }
    );
  };

  //gets targeted image uploaded
  const onDelete = (image) => {
    const currentindex = Images.indexOf(image); //gets the index of image from the state

    let newImages = [...Images]; //changing newImages instead of state
    newImages.splice(currentindex, 1);

    setImages(newImages); //update state w/ the newImages
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
