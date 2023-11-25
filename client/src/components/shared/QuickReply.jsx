const QuickReply = ({ replyText, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(replyText)}
      className="border-2 border-gray-300 text-gray-900 hover:bg-gray-400 hover:text-white font-light py-2 px-4 rounded-lg transition duration-200 ease-in-out"
    >
      {replyText}
    </button>
  );
};

export const QuickReplies = ({ replies, onReplySelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 absolute bottom-0 w-[96.5%]">
      {replies.map((reply, index) => (
        <QuickReply key={index} replyText={reply} onSelect={onReplySelect} />
      ))}
    </div>
  );
};
