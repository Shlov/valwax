import styles from './Container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>{children}</div>
  );
};

Container.displayName = 'Container';

export default Container;
