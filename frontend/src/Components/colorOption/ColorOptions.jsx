import React from "react";
import "./coloroption.css";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { SiLinkedin, SiMessenger } from "react-icons/si";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";

function ColorOptions({ hall }) {
  console.log(hall)
  return (
    <div className="coloroption"> 
      <div className="boxxxx">
        <ul style={{ display: "flex" }}>
          <li
            title="FaceBook"
            style={{
              cursor: "pointer",
              marginRight: "2px",
              width: "30px",
              height: "30px",
              color: "#4267B2",
            }}
            onClick={() => window.open(hall.facebook)}
          >
            <FaFacebook size="30px"  />
          </li>
          <li
            title="Messanger"
            style={{
              cursor: "pointer",
              marginRight: "2px",
              width: "30px",
              height: "30px",
              color: "#00B2FF",
            }}
            onClick={() => window.open(hall.messanger)}
          >
            <SiMessenger size="30px" />
          </li>
          <li
            title="What's Up"
            style={{
              cursor: "pointer",
              marginRight: "2px",
              width: "30px",
              height: "30px",
              color: "#25D366",
            }}
            onClick={() => window.open(hall.whatsup)}
          >
            <AiOutlineWhatsApp size="30px" />
          </li>
          <li
            title="Instagrame"
            style={{
              cursor: "pointer",
              marginRight: "2px",
              width: "30px",
              height: "30px",
              color: "#E1306C",
            }}
            onClick={() => window.open(hall.instagram)}
          >
            <AiOutlineInstagram size="30px" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ColorOptions;
