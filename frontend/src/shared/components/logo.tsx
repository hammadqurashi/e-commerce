import { Link } from "react-router-dom";
import React from "react";

const Logo = ({
  width = 150,
  height = 30,
  isDark = false,
  className = "",
  href = "/",
}) => {
  if (!!href) {
    <Link to={href} className={className}>
      <img
        src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
        width={width}
        height={height}
        alt="logo"
      />
    </Link>;
  }

  return (
    <div className={className}>
      <img
        src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
        width={width}
        height={height}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
