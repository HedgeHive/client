export default function Message({ sender, text }) {
    const isUser = sender === "user";
  
    return (
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4`}>
        <div className={`px-4 py-2 rounded-lg max-w-[80%] ${isUser ? "bg-gray-700" : "bg-gray-800"}`}>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    );
  }
  