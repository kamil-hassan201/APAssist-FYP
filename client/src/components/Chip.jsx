const Chip = ({ text, onClick }) => {
  return (
    <span
      onClick={() => onClick(text)}
      className="cursor-pointer hover:bg-indigo-200 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 m-1"
    >
      {text}
    </span>
  );
};

export default Chip;
