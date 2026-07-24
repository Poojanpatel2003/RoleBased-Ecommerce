require("dotenv").config();

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const upload = async () => {
  try {

    const form = new FormData();

    form.append(
      "file",
      fs.createReadStream("./uploads/test.png")
    );

    form.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET
    );


    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );


    console.log("SUCCESS");
    console.log(response.data.secure_url);


  } catch(error) {

    console.log("ERROR");

    if(error.response){
      console.log(error.response.data);
    }else{
      console.log(error.message);
    }

  }
};


upload();