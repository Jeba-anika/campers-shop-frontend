const CSButton = ({ children, styles }) => {
  return (
    <button
      className={`border  border-highlight  text-highlight hover:border-highlight hover:bg-tertiary hover:text-highlight rounded-lg ${styles}`}
    >
      {children}
    </button>
  );
};

export default CSButton;
