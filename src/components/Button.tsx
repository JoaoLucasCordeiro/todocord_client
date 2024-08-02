import { ReactNode } from 'react';

const Button = ({
  children,
  styles,
  onClick,
}: {
  children: ReactNode;
  styles: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

export default Button;