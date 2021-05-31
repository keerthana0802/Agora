import './styles.css';
import React from 'react';
import CountDownTimer from './CountDownTimer';
import { Images } from '../../Themes';
import Header from '../../Components/Header';

export default function WaitingRoom() {
  const hoursMinSecs = { hours: 0, minutes: 10, seconds: 0 };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="rectangle">
        <div>
          <div className="h1"> HI</div>
          <div className="h2">Class is about to start....</div>
        </div>
        <div className="box">
          <div className="container-text2">STARTS IN</div>

          <div class="line1"></div>
          <div class="line2"></div>
          <div>
            <div className="container-text3">HOUR</div>
          </div>
          <div>
            <div className="container-text4">MINS</div>
          </div>
          <div>
            <div className="container-text5">SECS</div>
          </div>
          <div>
            <CountDownTimer hoursMinSecs={hoursMinSecs} />
          </div>
        </div>
        <div className="container-text">
          <div>
            Class Details:<br></br>
            Teacher : Rachita Rath<br></br>
            Course : Public Speaking
          </div>
          <br></br>
        </div>
        <div className="waiting">
          <img src={Images.waiting} alt="img" />
          <img className="ell" src={Images.full} alt="spark" />
          <a href="/" className="support">
            {' '}
            SUPPORT
          </a>
          <a href="/" className="login">
            {' '}
            LOGIN
          </a>
        </div>
      </div>
    </div>
  );
}
