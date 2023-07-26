import React from 'react'

export default function ClaimsNavbar({ cardData }) {
  return (
    <div className="navbar_bottomsection">
      {cardData.map((card, index) => (
        <div className="navbar_bottomsection_claimcard" key={index}>
          <div className="navbar_bottomsection_claimcard_info">
            <div className="navbar_bottomsection_claimcard_info_text">
              {card.subtext}
            </div>
            <div className="navbar_bottomsection_claimcard_info_subtext">
              {card.text}
            </div>
          </div>
          <div className="navbar_bottomsection_claimcard_icon">
            <img src={card.icon} alt="Card Icon" />
          </div>
        </div>
      ))}
    </div>
  );
}
