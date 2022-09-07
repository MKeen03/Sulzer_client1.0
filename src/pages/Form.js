import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./form.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "../components/Modal";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const Form = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [stars, setStars] = useState("");
  const [projectName, setProjectName] = useState("");
  const [typeOfBid, setTypeOfBid] = useState("");
  const [quotationSelection, setQuotationSelection] = useState("");
  const [messages, setMessages] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  let info = localStorage.getItem("info");
  info = JSON.parse(info);

  const handleSubmit = async () => {
    if (
      stars === "" ||
      projectName === "" ||
      typeOfBid === "" ||
      quotationSelection === ""
    ) {
      setMessages([...messages, { msg: "Form cannot be blank." }]);
      setOpenModal(false);
      setTimeout(() => {
        setMessages([]);
      }, 1500);
    } else {
      let formData = new FormData();
      formData.append("stars", stars);
      formData.append("projectName", projectName);
      formData.append("typeOfBid", typeOfBid);
      formData.append("quotationSelection", quotationSelection);
      formData.append("id", user.user.id);
      formData.append("email", user.user.email);
      formData.append("firstName", user.user.firstName);
      formData.append("company", user.user.company);
      if (files.length > 0) {
        for (const file of files) {
          formData.append(`pdfs`, file, file.name);
        }
      }
      console.log();
      await axios
        .post("https://www.jpdistributions.link:5000/api/user/upload", formData)
        .then((response) => {
          setMessages([...messages, response.data.msg]);
          console.log(response);
          setTimeout(() => {
            setMessages([]);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setMessages([...messages, error.response.data]);
          setTimeout(() => {
            setMessages([]);
          }, 2000);
        });
    }
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (!info) {
      navigate("/");
    } else {
      setUser(info);
    }
  }, []); // eslint-disable-line

  const handleChange = (event) => {
    setTypeOfBid(event.target.value);
  };

  const handleChanges = (event) => {
    setQuotationSelection(event.target.value);
  };
  return (
    <Box
      className="formbg"
      style={{
        backgroundColor: "#a5a5a5",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Header user={user} />

      <div>
        <div className="formSectionOne">
          <Stack spacing={3}>
            <div className="stars">
              <TextField
                style={{
                  minWidth: "425px",
                }}
                onChange={(e) => {
                  setStars(e.target.value);
                }}
                type="text"
                id="stars"
                name="stars"
                placeholder="Stars #"
                htmlFor="starsNumber"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                style={{
                  minWidth: "425px",
                }}
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                type="text"
                id="projectName"
                name="projectName"
                placeholder="Project Name"
                htmlFor="projectName"
                variant="standard"
              />
            </div>
          </Stack>
          <br></br>
          <br></br>

          {/* here is where to start the dropdown divs for two columns CREATE NEW DIV HERE */}
          <div className="row">
            <div className="column">
              <div className="selections">
                <FormControl
                  style={{
                    minWidth: "425px",
                  }}
                  variant="filled"
                  sx={{ m: 1, minWidth: 200 }}
                >
                  <InputLabel id="typeOfBid">Type</InputLabel>
                  <Select
                    labelId="typeOfBid"
                    id="typeOfBid"
                    onChange={handleChange}
                    label="Bid"
                    value={typeOfBid}
                  >
                    <MenuItem value={"Budget"}>Budget</MenuItem>
                    <MenuItem value={"Firm Bid"}>Firm Bid</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="selections">
                <FormControl
                  style={{
                    minWidth: "425px",
                  }}
                  variant="filled"
                  sx={{ m: 1, minWidth: 200 }}
                >
                  <InputLabel id="quotationSelection">
                    Quote Selection
                  </InputLabel>
                  <Select
                    id="quotationSelection"
                    onChange={handleChanges}
                    label="quotationSelection"
                    value={quotationSelection}
                  >
                    <MenuItem value={"Pump Selections Only"}>
                      Pump Selections Only
                    </MenuItem>
                    <MenuItem value={"Pump Quotation"}>Pump Quotation</MenuItem>
                    <MenuItem value={"Pump Quotation Including Motors"}>
                      {" "}
                      Pump Quotation Including Motors
                    </MenuItem>
                    <MenuItem value={"Motor Quotation Only"}>
                      Motor Quotation Only
                    </MenuItem>
                    <MenuItem
                      value={"Review STARS file and advise price on RFQ's"}
                    >
                      Review STARS file and advise price on RFQ's
                    </MenuItem>
                    <MenuItem
                      value={"Other(Be descriptive in the comments below)"}
                    >
                      Other(Be descriptive in the comments below)
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="textbox">
                <TextField
                  style={{ marginTop: 20, width: 600 }}
                  id="standard-multiline-static"
                  label="Other Comments"
                  multiline
                  rows={8}
                  variant="standard"
                />
              </div>
              <div>
                <Stack spacing={3}>
                  <div className="buttoncolumn">
                    <input
                      type="file"
                      onChange={(e) => {
                        setFiles(e.target.files);
                      }}
                      id="upload"
                      name="file"
                      accept="application/pdf"
                      multiple
                    />
                  </div>

                  <div className="ctrl">
                    {" "}
                    <NewReleasesIcon />
                    Hold CTRL to select multiple files
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className="openModalBtn"
                      onClick={() => {
                        if (
                          stars === "" ||
                          projectName === "" ||
                          typeOfBid === "" ||
                          quotationSelection === ""
                        ) {
                          setMessages([
                            ...messages,
                            {
                              msg: "Required Fields are Stars #, Project Name, Type of Bid, and Quotation Selection.",
                            },
                          ]);
                          setOpenModal(false);
                          setTimeout(() => {
                            setMessages([]);
                          }, 2500);
                        } else {
                          setOpenModal(true);
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div>
        {messages?.map((message) => {
          return (
            <p className="errorDiv" key={message.msg}>
              {message.msg}
            </p>
          );
        })}
      </div>
      {
        <div className="modalDisplay">
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              handleSubmit={handleSubmit}
              stars={stars}
              projectName={projectName}
              typeOfBid={typeOfBid}
              quotationSelection={quotationSelection}
              files={files}
              modalState={openModal}
            />
          )}
        </div>
      }
    </Box>
  );
};

export default Form;
