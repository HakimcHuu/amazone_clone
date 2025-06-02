import React from "react";
import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: "300px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <FadeLoader color="#00e5ff" height={10} width={3} margin={2} />
        <p
          style={{
            marginTop: "20px",
            fontSize: "1rem",
            color: "#e0f7fa",
            opacity: 0.9,
          }}
        >
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export default Loader;

// import React from "react";
// // Importing the FadeLoader from react-spinners for loading animation
// import { FadeLoader } from "react-spinners";

// function Loader() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "50 vh",
//       }}
//     >
//       <FadeLoader />
//     </div>
//   );
// }

// export default Loader;
