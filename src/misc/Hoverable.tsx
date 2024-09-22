import { ReactNode, useState } from "react";


export default function Hoverable(ps: {
  children: ReactNode | ReactNode[],
  popup: () => ReactNode,
}) {
  const [popup, setPopup] = useState(null as ReactNode | null);

  const handleMouseEnter = () => {
    console.log("Enter");
    setPopup(ps.popup());
  };

  const handleMouseLeave = () => {
    setPopup(null);
  };

  return (
    <div className="relative"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}>
      {ps.children}

      {popup && (
        <div style={{
               borderRadius: 8,
               position: 'absolute',
               top: '0',
               left: '110%',
               backgroundColor: '#fff',
               border: '1px solid #ccc',
               padding: '10px',
               boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
               zIndex: 1,
             }}>
          {popup}
        </div>
      )}
    </div>
  );
}
