import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Images } from '../../Themes';
import Header from '../../Components/Header';

export default function WaitingRoom() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="container-Rectangle">
          <div className="right-container-person">
            <img src={Images.man} alt="spark" />
          </div>
          <div className="right-container-inner">
            <img src={Images.half} alt="spark" />
          </div>
          <div className="right-container-outer">
            <img src={Images.full} alt="spark" />
          </div>
          <div className="txt">Hi</div>
          <div className="txt2">
            You have an upcoming class at <b>4:00 PM IST</b>
          </div>
          <div className="txt3">
            Class Details:<br></br> Teacher : Rachita Rath<br></br> Course :
            Public Speaking
          </div>
          <div className="txt4">
            Be prepared for the class by <br></br>practicing and uploading your
            <br></br> home assignment
          </div>
          <button className="btn">
            <div className="text">Let's go</div>
          </button>
        </div>
      </div>
    </div>
  );
}
