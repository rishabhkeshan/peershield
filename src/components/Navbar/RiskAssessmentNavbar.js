import React from 'react'

export default function RiskAssessmentNavbar() {
  return (
    <div className="navbar_bottomsection">
      <div className="navbar_bottomsection_notecontainer">
        <div className="navbar_bottomsection_notecontainer_title">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.00137 17.5036H17.0614C18.6014 17.5036 19.5614 15.8336 18.7914 14.5036L11.2614 1.49359C10.4914 0.163594 8.57137 0.163594 7.80137 1.49359L0.271371 14.5036C-0.498629 15.8336 0.461371 17.5036 2.00137 17.5036ZM9.53137 10.5036C8.98137 10.5036 8.53137 10.0536 8.53137 9.50359V7.50359C8.53137 6.95359 8.98137 6.50359 9.53137 6.50359C10.0814 6.50359 10.5314 6.95359 10.5314 7.50359V9.50359C10.5314 10.0536 10.0814 10.5036 9.53137 10.5036ZM10.5314 14.5036H8.53137V12.5036H10.5314V14.5036Z"
              fill="#F1C554"
            />
          </svg>
          <span>NOTE</span>
        </div>
        <div className="navbar_bottomsection_notecontainer_subtitle">
          Please be very careful before voting for a specific pool to be
          activated. We hope you understand what you are doing...
        </div>
      </div>
    </div>
  );
}
