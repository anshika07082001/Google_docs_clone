import { Button, Modal } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { modalprops } from "./type/Type";

const FormModal = (props: modalprops) => {
  return (
    <Modal
      open={props.stateObj.modal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal">
        <div className="close__icon" onClick={props.openModal}>
          <CloseIcon />
        </div>
        {props.ind !== -1 ? (
          <div className="modal__data modal--data">
            <img
              className="modal__img"
              src="https://www.wikihow.com/images/thumb/1/18/Take-Better-Notes-Step-1-Version-2.jpg/v4-460px-Take-Better-Notes-Step-1-Version-2.jpg.webp"
              alt=""
            />
            <h3>{props.dataArr[props.ind].title}</h3>
            <p>{props.dataArr[props.ind].content}</p>
          </div>
        ) : (
          <>
            <span className="form__heading">{props.text.modalHeading}</span>
            <p
              className={
                props.stateObj.msg === "successfully saved data!!" ||
                "successfully Updated data!!"
                  ? "success msg__text"
                  : "error msg__text"
              }
            >
              {props.stateObj.msg}
            </p>
            <form className="form" onSubmit={(e) => props.saveData(e)}>
              <label>Enter title</label>
              <input
                placeholder="Enter Title Here..."
                type="text"
                ref={(ref) => (props.inpRefs.current.title = ref)}
              />
              <label>Enter Content Here:</label>
              <textarea
                rows={5}
                ref={(ref) => (props.inpRefs.current.content = ref)}
              ></textarea>
              <Button variant="contained" className="save__btn" type="submit">
                {props.text.btnText}
              </Button>
              {props.stateObj.loader ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                  alt=""
                  className="loader__gif"
                />
              ) : (
                <></>
              )}
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default FormModal;
