const FormButton = ({ children, className }) => {
  return (
    <button
      className={`bg-primary text-background rounded-md text-xl font-bold py-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default FormButton;
