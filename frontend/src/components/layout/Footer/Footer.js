import React from "react";
import playStore from "../../../images/Playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>ShopStudio</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights {year} &copy; Yash Raj Gupta</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/im_yashrg/">Instagram</a>
        <a href="https://www.youtube.com/c/KNOWLEDGEPATHKP">Youtube</a>
        <a href="https://www.linkedin.com/in/yash-raj-gupta-9040281bb">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
