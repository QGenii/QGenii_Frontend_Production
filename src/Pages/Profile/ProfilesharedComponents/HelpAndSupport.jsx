import React from "react";

const HelpAndSupport = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
      <p className="mb-6 text-center max-w-md text-lg">
        This page is coming soon!<br />
        For urgent support, please contact us at <a href="mailto:support@qgenii.com" className="text-blue-600 underline">support@qgenii.com</a>.
      </p>
      <span className="text-5xl">🚧</span>
    </div>
  );
};

export default HelpAndSupport;
//             disabled={status === "sending"}
//             className="w-48 text-center px-6 py-3 rounded-md bg-[#2D00F7] text-white font-medium shadow-[0_8px_18px_rgba(45,0,247,0.18)] disabled:opacity-60"
//           >
//             {status === "sending" ? "Sending..." : "Send"}
//           </button>
//         </div>

//         {message && (
//           <div
//             className={`text-center text-sm ${
//               status === "error" ? "text-red-600" : "text-green-700"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }
