import React from "react";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} py-1 px-1 md:py-4 md:px-6`}>
      <div
        className={`relative max-w-full  sm:max-w-xl md:max-w-2xl w-fit min-w-[40px] px-4 py-3 md:px-6 md:py-4 rounded-[1.25rem] border text-base font-normal leading-relaxed break-words
          ${isUser
            ? "bg-white text-black border-[#ececf1] rounded-br-3xl rounded-tl-3xl rounded-tr-3xl rounded-bl-md"
            : "bg-white dark:bg-[#000] text-black  dark:text-white border-[#ececf1] dark:border-[#232329] rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl rounded-br-md"}
        `}
        style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
      >
        <div className="whitespace-pre-wrap break-words pb-1">
          {message.content}
        </div>
        <div className="absolute bottom-2  right-4 text-xs text-gray-400 select-none pointer-events-none">
          {(() => {
            const date = new Date(message.createdAt);
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${hours}:${minutes} ${ampm}`;
          })()}
        </div>
      </div>
    </div>
  );
}
