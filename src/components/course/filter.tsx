import React from 'react';
import './style.css'
const Filter = () => {
  return (
    <div className='w-full flex justify-end py-5'>
        <div className="project-right-menu">
            <ul className="flex items-center">
                <li className="relative pr-[50px] border-l border-white/10 group">
                    <a href="#" className='block text-white/70 hover:text-white py-[18px] px-7' id='dropdown-toggle'>
                        All Type
                    </a>
                    <ul className="absolute left-0 top-full opacity-0 invisible scale-y-0 origin-top transition-all duration-300 z-30 w-full group-hover:opacity-100 group-hover:visible group-hover:scale-y-100">
                        <li className="block bg-[#222231] border-b border-white/10 last:border-b-0">
                            <a href="#" className="block text-white/70 hover:text-white py-[18px] px-7">All Access</a>
                        </li>
                        <li className="block bg-[#222231] border-b border-white/10 last:border-b-0">
                            <a href="#" className="block text-white/70 hover:text-white py-[18px] px-7">Beginner</a>
                        </li>
                        <li className="block bg-[#222231] border-b border-white/10 last:border-b-0">
                            <a href="#" className="block text-white/70 hover:text-white py-[18px] px-7">Intermediate</a>
                        </li>
                        <li className="block bg-[#222231] border-b border-white/10 last:border-b-0">
                            <a href="#" className="block text-white/70 hover:text-white py-[18px] px-7">Advanced</a>
                        </li>
                    </ul>
                </li>
                <li className="relative pr-[50px] border-l border-white/10 group">
                    <a href="#" className='block text-white/70 hover:text-white py-[18px] px-7' id='dropdown-toggle'>
                        All Ways
                    </a>
                    <ul className="absolute left-0 top-full opacity-0 invisible scale-y-0 origin-top transition-all duration-300 z-30 w-full group-hover:opacity-100 group-hover:visible group-hover:scale-y-100">
                        <li className="block bg-[#222231] border-b border-white/10 last:border-b-0">
                            <a href="#" className="block text-white/70 hover:text-white py-[18px] px-7">Purchased</a>
                        </li>
                        <li className="block bg-[#222231] border-b border-white/10 last:border-b-0">
                            <a href="#" className="block text-white/70 hover:text-white py-[18px] px-7">Not purchased</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default Filter;