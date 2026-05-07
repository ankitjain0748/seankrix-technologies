

import React from 'react';

export default function FeatureItem({ icon, title, description }) {
  return (
   
   <div className="relative pl-12 group">
    
      <div 
        className="absolute left-[13px] top-0 bottom-[-6rem] w-px bg-gray-700/50 group-last:hidden"
      ></div>
      
    
      <div className="absolute left-0 top-1 w-7 h-7 rounded-full border-2 border-[#00BFFF] bg-black flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#00BFFF]"></div>
      </div>
      
  
       <span className="text-5xl font-bold text-[#00BFFF] mb-2"  data-aos="fade-up" data-aos-anchor-placement="center-bottom">{icon}</span>
      <h3 className="text-xl font-bold text-white mb-2 font"  data-aos="fade-up" data-aos-anchor-placement="center-bottom" >{title}</h3>
      <p className="text-gray-400 leading-relaxed max-w-md font"  data-aos="fade-up" data-aos-anchor-placement="center-bottom">{description}</p>
      
    </div>
  );
}