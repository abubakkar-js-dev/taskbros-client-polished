import PropTypes from "prop-types";
import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const Loading = ({className=""}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <div className={`flex justify-center items-center min-h-[calc(100vh-4rem)] ${className} ${theme==='dark'&&'bg-gray-900'}`}>
      <div className="w-10 h-10">
        <div className="grid grid-cols-2 justify-center items-center gap-2 rounded-full">
          <span className="h-5 w-5 rounded-tl-full bg-primary animate-[ping_1.4s_linear_infinite]"></span>{" "}
          <span className="h-5 w-5 rounded-tr-full bg-primary animate-[ping_1.8s_linear_infinite]"></span>
          <span className="h-5 w-5 rounded-bl-full bg-primary animate-[ping_2.2s_linear_infinite]"></span>
          <span className="h-5 w-5 rounded-br-full bg-primary animate-[ping_2.6s_linear_infinite]"></span>
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
}

export default Loading;
