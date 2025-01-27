'use client';
import { useTheme } from 'next-themes';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  console.log('theme selector', theme);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('theme change');
    setTheme(event.target.value);
  };

  return (
    <select
      onChange={handleThemeChange}
      value={theme}
      className="mb-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
    >
      {['light', 'blue', 'dark'].map((theme) => (
        <option value={theme} key={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}
