import { Button, Modal } from "@mui/material";
import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

type modalprops = {
  open: boolean;
  openModal: () => void;
};

const ModalComp = (props: modalprops) => {
  var inpRefs = useRef<any>({ docId: "", title: "", content: "" });
  const idHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    
    if(e.currentTarget.value.match(/^[0-9]/)){
      inpRefs.current.docId.value=e.currentTarget.value
    }
    else{

    }
  };

  const saveData = () => {
    console.log(inpRefs.current.docId.value);
  };
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <div className="close__icon" onClick={props.openModal}>
            <CloseIcon />
          </div>
          <span className="form__heading">Create New File</span>
          <div className="form">
            <label>Enter Doc Id:</label>
            <input
              placeholder="Enter any Doc Id Here..."
              type="text"
              onChange={(e)=>idHandler(e)}
              ref={(ref) => (inpRefs.current.docId = ref)}
            />
            <label>Enter title</label>
            <input
              placeholder="Enter Title Here..."
              type="text"
              ref={(ref) => (inpRefs.current.title = ref)}
            />
            <label>Enter Content Here:</label>
            <textarea
              rows={5}
              ref={(ref) => (inpRefs.current.content = ref)}
            ></textarea>
            <Button
              variant="contained"
              className="save__btn"
              onClick={saveData}
            >
              Save Data
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComp;
