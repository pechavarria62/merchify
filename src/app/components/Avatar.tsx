import React from "react";
import Image from "next/image";


const Avatar: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src="/img/avatar.jpg"
        alt="User Avatar"
        width={25}
        height={25}
        className="rounded-full border border-gray-300"
      />
      <span className="hidden md:inline text-gray-800 font-small">Username</span>
    </div>
  );
}   
export default Avatar;