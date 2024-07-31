const CSButton = ({ children, styles, type = "" }) => {
  return (
    <button
      className={`border  border-highlight  text-highlight hover:border-highlight hover:bg-tertiary hover:text-highlight  ${styles}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default CSButton;
