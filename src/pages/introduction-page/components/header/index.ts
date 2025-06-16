export type HeaderProps = {
  title: string;
  navItems: {
    label: string | JSX.Element;
    onClick?: () => void;
  }[];
  className?: string;
};
