import React from "react";

const InviteFriend = () => {
  const shareText = encodeURIComponent(
    "Join me on QGenii! Get smarter with awesome study tools and resources."
  );
  const shareUrl = encodeURIComponent(window.location.origin);

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Join%20me%20on%20QGenii!&body=${shareText}%20${shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <h2 className="text-2xl font-bold mb-4">Invite a Friend</h2>
      <p className="mb-6 text-center max-w-md">
        Share QGenii with your friends! Invite them via Gmail or WhatsApp and help them boost their learning journey.
      </p>
      <div className="flex gap-6">
        <a
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          Invite via Gmail
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          Invite via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default InviteFriend;
//           onChange={(e) => setEmail(e.target.value)}
        
//           className="w-full px-4 py-3 rounded-md border border-gray-200 mb-4 focus:outline-none"
//         />

//         <button type="submit" className="w-48 mx-auto block px-6 py-3 rounded-md bg-[#2D00F7] text-white font-medium shadow-md">Send</button>
//       </form>

//       {status && <div className="mt-4 text-sm text-gray-700">{status}</div>}
//     </div>
//   );
// }
