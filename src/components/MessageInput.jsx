export default function MessageInput() {
    return (
      <div className="flex items-center bg-gray-800 p-2 rounded-lg mt-2">
        <input
          type="text"
          placeholder="How can I help you?"
          className="flex-grow bg-transparent text-white px-2 py-1 outline-none"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send message</button>
      </div>
    );
  }
  