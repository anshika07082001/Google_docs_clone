import React from "react";

export type objState = {
  loader: boolean;
  msg: string;
  modal: boolean;
};

export type textObj = {
  btnText: string;
  modalHeading: string;
};

export type modalprops = {
  stateObj: objState;
  setstateObj: React.Dispatch<React.SetStateAction<objState>>;
  openModal: () => void;
  dataArr: dataObj[];
  setdataArr: React.Dispatch<React.SetStateAction<dataObj[] | []>>;
  ind: any;
  text: textObj;
  saveData: (e:React.FormEvent<HTMLFormElement>) => void;
  inpRefs:React.MutableRefObject<any>
};

export type dataObj = {
  title: string;
  content: string;
};
