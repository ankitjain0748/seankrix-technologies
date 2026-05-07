
import React from 'react';
import clsx from 'clsx';


export default function Glow({ position = 'right', size = 600, customStyles = {} }) {
  
  const halfSizeNegative = `-${size / 2}px`;


  const defaultPositionStyles = {
    right: { top: '0', transform: 'translateY(-25%)', right: halfSizeNegative },
    left: { top: '50%', transform: 'translateY(-50%)', left: halfSizeNegative },
  };


  const finalStyles = {
    width: `${size}px`, 
    height: `${size}px`, 
    ...defaultPositionStyles[position],
    ...customStyles,
  };

  return (
    <div
      className={clsx('absolute z-0 pointer-events-none')}
      // ✅ स्टेप 3: यहाँ finalStyles का इस्तेमाल करें
      style={finalStyles}
    >
      <div
        className="w-full h-full rounded-full 
                   border-[60px] border-[#00BFFF]
                   opacity-30 filter blur-3xl"
      ></div>
    </div>
  );
}