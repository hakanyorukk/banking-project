import React from "react";

const ProfileAvatar = ({ firstName }: { firstName: string }) => {
  return (
    <div className="flex gap-2">
      <div className="flex border-2 border-slate-600 bg-slate-50 h-8 w-8  rounded-full place-items-center justify-center text-cyan-500 font-bold text-lg group-hover:scale-110 transform all duration-300 ease delay-200">
        {firstName.slice(0, 1)}
      </div>
      <p className="sm:text-xl text-lg">{firstName}</p>
    </div>
  );
};

export default ProfileAvatar;
