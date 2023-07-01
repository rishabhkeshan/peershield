import React from "react";

function BottomNavbar({ cardData }) {
  return (
    <div className="navbar_bottomsection">
      {cardData.map((card, index) => (
        <div className="navbar_bottomsection_card" key={index}>
          <div className="navbar_bottomsection_card_info">
            <div className="navbar_bottomsection_card_info_text">
              {card.text}
            </div>
            <div className="navbar_bottomsection_card_info_subtext">
              {card.subtext}
            </div>
          </div>
          <div className="navbar_bottomsection_card_icon">
            <img src={card.icon} alt="Card Icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomNavbar;
