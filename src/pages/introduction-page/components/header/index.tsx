import { HeaderProps } from ".";

export const Header = (props: HeaderProps) => {
  const { title, navItems, className } = props;

  return (
    <header
      className={`bg-blue-600 dark:bg-[#121212] text-white p-10 flex items-center justify-between shadow-lg  w-full ${className}`}
    >
      <h1 className="text-2xl font-bold">{title}</h1>

      <nav>
        <ul className="flex text-sm font-medium gap-6 items-center">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="hover:underline cursor-pointer"
              onClick={item.onClick}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
