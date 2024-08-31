import React from "react";

const ProfileAvatar = ({ firstName }: { firstName: string }) => {
  return (
    <div className="flex gap-2 place-items-center">
      <div className="flex border-2 border-slate-600 bg-slate-50 sm:h-8 h-7 w-7 sm:w-8 rounded-full place-items-center justify-center text-cyan-500 font-bold sm:text-lg text-sm group-hover:scale-110 transform all duration-300 ease delay-200">
        {firstName.slice(0, 1)}
      </div>
      <p className="sm:text-xl text-base">{firstName}</p>
    </div>
  );
};

export default ProfileAvatar;
