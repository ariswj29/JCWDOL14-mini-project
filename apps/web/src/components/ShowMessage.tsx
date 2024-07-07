'use client';
import { props } from 'cypress/types/bluebird';
import { useState } from 'react';

export const ShowMessage = (props: any) => {
  const [showMessage, setShowMessage] = useState(props.show);

  return (
    showMessage && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg z-10">
          <h3 className="text-xl font-bold">{props.name}</h3>
          <p className="my-2">{props.desc}</p>
          <button
            className="px-2 border border-secondary py-2 rounded-md"
            onClick={() => setShowMessage(false)}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};
