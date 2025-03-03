import { Menu, MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import useThemeStore from "../store/themeStore";

const Navbar = () => {
  const { setTheme, theme } = useThemeStore();
  const [savedTheme, setSavedTheme] = useState<string>("");
  const [animationClass, setAnimationClass] = useState("");
  const [scrollWidth, setScrollWidth] = useState(100);
  const [viewMenu, setViewMenu] = useState<boolean>(false);

  console.log(theme);

  // Set theme based on localStorage or system preference on initial load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      document.body.classList.add(storedTheme);
      setSavedTheme(storedTheme);
    } else {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.body.classList.add(systemPreference);
      localStorage.setItem("theme", systemPreference);
      setTheme(systemPreference);
      setSavedTheme(systemPreference);
    }

    // Listen for scroll events to adjust the navbar width
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxWidth = 100;
      const minWidth = 50;

      // Calculate the width based on scroll position
      let newWidth =
        maxWidth - (scrollPosition / windowHeight) * (maxWidth - minWidth);
      newWidth = Math.max(minWidth, newWidth); // Prevent width from going below minWidth
      setScrollWidth(newWidth);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setTheme]);

  // Toggle between light and dark themes
  // const toggleTheme = () => {
  //   const currentTheme = localStorage.getItem("theme");
  //   const newTheme = currentTheme === "dark" ? "light" : "dark";

  //   // Remove old theme and add new theme
  //   document.body.classList.remove("dark", "light");
  //   document.body.classList.add(newTheme);

  //   // Update localStorage and state
  //   localStorage.setItem("theme", newTheme);
  //   setSavedTheme(newTheme);
  //   setTheme(newTheme);

  //   // Trigger theme transition animation
  //   setAnimationClass("grow");

  //   // Reset animation after 700ms
  //   setTimeout(() => setAnimationClass(""), 700);
  // };

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Remove old theme and add new theme
    document.body.classList.remove("dark", "light");
    document.body.classList.add(newTheme);

    // Update localStorage and state
    localStorage.setItem("theme", newTheme);
    setSavedTheme(newTheme);
    setTheme(newTheme);

    // Trigger theme transition animation
    setAnimationClass("grow");

    // Reset animation after 700ms
    setTimeout(() => setAnimationClass(""), 700);
  };

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "darkCircle" : "lightCircle"
        } ${animationClass}`}
        // style={{ zIndex: -2 }}
      />

      <div className="fixed w-full">
        <header className="container mx-auto lg:mt-5 mt-4">
          <div className="flex justify-center">
            {/* Large Device Nav */}
            <nav
              className={`${scrollWidth < 100 ? "nav-bg" : "bg-background"}
              lg:flex hidden justify-between px-5 py-[7px] items-center rounded-full w-full overflow-hidden`}
              style={{ width: `${scrollWidth}%` }}
            >
              <a href="#" className="logo-font text-center text-2xl uppercase">
                Kidus
              </a>

              <div className="flex gap-x-8 text-sm">
                <p>Home</p>
                <p>About</p>
                <p>Project</p>
                <p>Contact</p>
              </div>

              {/* Theme */}
              <div>
                {savedTheme === "light" ? (
                  <button onClick={toggleTheme}>
                    <MoonStar size={20} />
                  </button>
                ) : (
                  <button onClick={toggleTheme}>
                    <Sun size={20} />
                  </button>
                )}
              </div>
            </nav>

            {/* Small Device Nav */}
            <nav
              className={`lg:hidden flex justify-between px-5 items-center rounded-full w-full overflow-hidden`}
            >
              <a href="#" className="logo-font text-center text-3xl uppercase">
                Kidus
              </a>

              {/* Theme */}
              <div className="flex gap-x-5 nav-bg border border-zinc-400 rounded-full py-[9px] px-5">
                {savedTheme === "light" ? (
                  <button onClick={toggleTheme}>
                    <MoonStar size={20} />
                  </button>
                ) : (
                  <button onClick={toggleTheme}>
                    <Sun size={20} />
                  </button>
                )}
                <button onClick={() => setViewMenu(!viewMenu)}>
                  <Menu size={20} />
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;

//   const [animationClass, setAnimationClass] = useState<string>(
//     "animate__fadeInLeft"
//   );

//   const handleCloseMenu = () => {
//     setAnimationClass("animate__fadeOutLeft");
//     setTimeout(() => {
//       setViewMenu(false);
//       setAnimationClass("animate__fadeInLeft");
//     }, 500);
//   };
