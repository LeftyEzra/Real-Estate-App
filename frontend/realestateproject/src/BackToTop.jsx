import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 700);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`to-top ${show ? "show" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
    >
      <svg className="ic" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6 15l6-6 6 6" />
      </svg>
    </button>
  );
}