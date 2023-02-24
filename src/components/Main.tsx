import { Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FormModal from "./FormModal";
import { dataObj } from "./type/Type";

var arrIndex: number;

const Main = () => {
  // state for messages,modal and loader
  const [stateObj, setstateObj] = useState({
    modal: false,
    loader: false,
    msg: "",
  });
  var [dataArr, setdataArr] = useState<dataObj[]>([]);
  var [ind, setInd] = useState<any>(-1);
  var [text, settext] = useState({
    btnText: "Save",
    modalHeading: "Create New File",
  });
  var inpRefs = useRef<{
    title: null | HTMLInputElement;
    content: null | HTMLInputElement;
  }>({ title: null, content: null });

  // function gets data from localstorage and the sets the state
  useEffect(() => {
    var data = localStorage.getItem("dataArr");
    if (data !== null) {
      dataArr = JSON.parse(data);
      setdataArr(dataArr);
      localStorage.setItem("dataArr", JSON.stringify(dataArr));
    }
  }, []);

  // function saves and updates the docs
  const saveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // condition runs if btn text is save
    if (text.btnText == "Save") {
      if (
        inpRefs.current.title!.value !== "" &&
        inpRefs.current.content!.value !== ""
      ) {
        var obj: any = {
          title: inpRefs.current.title!.value,
          content: inpRefs.current.content!.value,
        };
        dataArr.push(obj);
        setdataArr(dataArr);
        localStorage.setItem("dataArr", JSON.stringify(dataArr));
        stateObj.loader = true;
        stateObj.msg = "successfully saved data!!";
        e.currentTarget.reset();
        setTimeout(() => {
          openModal();
        }, 1000);
      } else {
        stateObj.msg = "All Fields must be filled!!";
      }
    }
    // condition run if btn text is update
    else {
      dataArr[arrIndex].title = inpRefs.current.title!.value;
      dataArr[arrIndex].content = inpRefs.current.content!.value;
      setdataArr([...dataArr]);
      localStorage.setItem("dataArr", JSON.stringify(dataArr));
      stateObj.loader = true;
      stateObj.msg = "successfully Updated data!!";
      e.currentTarget.reset();
      setTimeout(() => {
        openModal();
      }, 1000);
      text.btnText = "Save";
      text.modalHeading = "Create New File";
      settext({ ...text });
    }
    setstateObj({ ...stateObj });
  };
  // function opens modal on button click of create new file
  const openModal = () => {
    setInd(-1);
    stateObj.loader = false;
    stateObj.msg = "";
    if (stateObj.modal) {
      stateObj.modal = false;
    } else {
      stateObj.modal = true;
    }
    setstateObj({ ...stateObj });
  };
  // function opens modal on click of view doc
  const openDoc = (index: number) => {
    if (stateObj.modal) {
      stateObj.modal = false;
    } else {
      stateObj.modal = true;
      setInd(index);
    }
    setstateObj({ ...stateObj });
  };
  // function edits doc
  const editDoc = (index: number) => {
    arrIndex = index;
    setTimeout(() => {
      inpRefs.current.title!.value = dataArr[index].title;
      inpRefs.current.content!.value = dataArr[index].content;
    }, 500);
    settext({ btnText: "Update", modalHeading: "Update Document" });
    openModal();
    setInd(-1);
  };
  // function delete doc
  const deleteDoc = (index: number) => {
    dataArr.splice(index, 1);
    setdataArr([...dataArr]);
    localStorage.setItem("dataArr", JSON.stringify(dataArr));
  };

  return (
    <div className="container">
      <Typography variant="h3">Google Docs Clone</Typography>
      <Button variant="contained" onClick={openModal}>
        Create New File
      </Button>
      {/* rendering of docs */}
      {dataArr.length > 0 ? (
        <div className="grid">
          {dataArr.map((item, index) => {
            return (
              <div className="grid__item" key={item.title}>
                <button
                  className="delete__btn"
                  onClick={() => deleteDoc(index)}
                >
                  X
                </button>
                <h3>{item.title}</h3>
                <p className="grid__btn" onClick={() => openDoc(index)}>
                  View...
                </p>
                <button className="edit__btn" onClick={() => editDoc(index)}>
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {/* rendering of modal */}
      <FormModal
        stateObj={stateObj}
        setstateObj={setstateObj}
        openModal={openModal}
        dataArr={dataArr}
        setdataArr={setdataArr}
        ind={ind}
        text={text}
        saveData={saveData}
        inpRefs={inpRefs}
      />
    </div>
  );
};

export default Main;
