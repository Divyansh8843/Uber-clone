import React from "react";
const PaymentPanel = ({ setPaymentPanelOpen }) => {
  return (
    <div className="">
      <div className="flex flex-col p-2 items-center">
        <svg
          className="w-20 h-20 mb-2 text-green-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="currentColor"
            strokeWidth="4"
            fill="#d1fae5"
          />
          <path
            d="M16 24l6 6 10-12"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <h3 className="text-xl mt-2 text-gray-900 font-semibold text-center">
          Payment Done
        </h3>
        <p className="text-base font-medium text-center my-2 text-gray-600">
          Thankyou for Completing your secure online Payment
        </p>
        <p className="text-base my-2">Have a greate day!</p>
        <button
          onClick={() => setPaymentPanelOpen(false)}
          className="w-full p-2 mt-5 bg-green-500 rounded-lg text-lg"
        >
          Ok
        </button>
      </div>
    </div>
  );
};
export default PaymentPanel;
<style>
  {`
        @keyframes bounce-in {
            0% { transform: scale(0.7); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            80% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
        .animate-bounce-in {
            animation: bounce-in 0.6s cubic-bezier(.68,-0.55,.27,1.55);
        }
    `}
</style>;
