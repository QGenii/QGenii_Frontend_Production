export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>;
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return <div className={`p-6 border-t border-gray-200 ${className}`}>{children}</div>;
};
