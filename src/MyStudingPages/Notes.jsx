import React, { useState } from "react";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Open note editor
  const handleAddNote = () => {
    setIsEditing(true);
    setNewNote("");
    setEditIndex(null);
  };

  // Save or Update note
  const handleSaveNote = () => {
    if (newNote.trim() === "") return;

    if (editIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex].text = newNote;
      setNotes(updatedNotes);
    } else {
      // Add new note
      setNotes([
        ...notes,
        { text: newNote, timestamp: new Date().toLocaleTimeString() },
      ]);
    }

    setIsEditing(false);
    setNewNote("");
    setEditIndex(null);
  };

  // Edit note
  const handleEditNote = (index) => {
    setIsEditing(true);
    setNewNote(notes[index].text);
    setEditIndex(index);
  };

  // Delete note
  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center gap-7 bg-amber-800">
      <div className=" flex flex-col   items-center space-y-6">
        {/* Input + Button */}
        {!isEditing && (
          <div className="flex flex-col gap-[2.0625rem] bg-amber-300 w-[36.625rem] items-center justify-center">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Create note 0:15"
                className="border rounded-lg px-3 py-2 w-[28.78125rem] "
                disabled
              />
              <svg
                onClick={handleAddNote}
                className="w-[1.333rem] h-[1.33225rem] shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M24.0429 4.8498C22.8479 3.6543 21.1599 3.4668 19.1679 3.4668H10.3084C8.33994 3.4668 6.65244 3.6543 5.45694 4.8493C4.26144 6.0443 4.08594 7.7203 4.08594 9.6778V18.5368C4.08594 20.5408 4.26194 22.2048 5.45694 23.4003C6.65194 24.5958 8.33994 24.7828 10.3439 24.7828H19.1679C21.1599 24.7828 22.8479 24.5953 24.0429 23.4003C25.2379 22.2053 25.4139 20.5408 25.4139 18.5368V9.7128C25.4139 7.7088 25.2384 6.0333 24.0429 4.8498ZM14.7499 20.9973C14.5046 20.9969 14.2693 20.8993 14.0958 20.7258C13.9222 20.5523 13.8245 20.3172 13.8239 20.0718V15.0448H8.80894C8.29294 15.0448 7.88294 14.6228 7.88294 14.1308C7.88294 13.6388 8.29294 13.1933 8.80844 13.1933H13.8239V8.1773C13.8239 7.6503 14.2339 7.2398 14.7499 7.2398C15.2774 7.2398 15.6759 7.6498 15.6759 8.1773V13.1933H20.7029C21.2189 13.1933 21.6289 13.6383 21.6289 14.1308C21.6289 14.6228 21.2189 15.0448 20.7029 15.0448H15.6759V20.0723C15.6767 20.1941 15.6532 20.3148 15.6069 20.4274C15.5606 20.5401 15.4925 20.6424 15.4063 20.7285C15.3202 20.8146 15.2178 20.8828 15.1051 20.929C14.9925 20.9752 14.8717 20.9981 14.7499 20.9973Z"
                  fill="#1E1E1E"
                />
              </svg>
            </div>
            <h4>Click + to write new note</h4>
          </div>
        )}

        {/* Note Editor */}
        {/* {isEditing && (
        <div className="bg-emerald-400 border rounded-lg p-4 w-[32rem]">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note..."
            maxLength={1000}
            className="w-full h-32 border rounded-lg p-2 resize-none"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleSaveNote}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {editIndex !== null ? "Update Note" : "Save Note"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            
          </div>

        </div>
      )} */}

        {isEditing && (
            <div className="flex flex-col gap-[0.31rem]">
      {/* Timestamp */}
      <div className="flex justify-center">
        <span className="px-3 py-1 bg-gray-200 text-sm rounded-md mb-2">
          Time stamp
        </span>
      </div>

      <div className="rounded-[0.46875rem] border-[0.375px] border-[#0C316E] bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex w-[32rem] h-[6.875rem] flex-col items-start gap-[0.46875rem]">
        {/* Textarea with toolbar */}
        <div>
          <div className="flex items-center border-b pb-1 text-gray-600 w-[32rem] p-2">
            <div className="flex px-[0.3125rem] gap-[0.9375rem] items-center justify-center">
              <span className="font-bold">B</span>
              <span className="italic">I</span>
              <span className="list-disc">•</span>
              <span className="font-mono">{`</>`}</span>
            </div>

            <span className="ml-auto text-xs text-gray-400">Max 1000</span>
          </div>

          <textarea
            value={newNote}
             onChange={(e) => setNewNote(e.target.value)}
            maxLength={1000}
            placeholder="Write your note..."
            className="w-full h-32 focus:ring-0 resize-none p-2 border-none outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handleSaveNote}
          className="px-6 py-2 bg-blue-900 text-white rounded-md"
        >
          {editIndex !== null ? "Update Note" : "Save Note"}
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 border border-gray-400 rounded-md"
        >
          Cancel
        </button>
      </div>

     

    </div>
        )}
        {/* Saved Notes */}
        <div className="w-full max-w-md space-y-3">
          {notes.map((note, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg bg-gray-100 flex justify-between items-start"
            >
              <div>
                <span className="text-xs text-gray-500">{note.timestamp}</span>
                <p>{note.text}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditNote(index)}
                  className="text-blue-600 hover:underline"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteNote(index)}
                  className="text-red-600 hover:underline"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-col gap-3 bg-amber-300 justify-center items-center">
        
        <div className="flex  justify-center  border-[#0C316E] bg-[#0C316E]  w-[7.1875rem]   px-[0.9125rem] py-[0.625rem] items-center rounded-[0.3125rem] border">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_3616_12984)">
    <path d="M18.3649 10.283C18.4109 10.3163 18.4549 10.3513 18.4969 10.388C18.4989 10.344 18.4999 10.2997 18.4999 10.255V5.75C18.4999 5.15326 18.2629 4.58097 17.8409 4.15901C17.4189 3.73705 16.8466 3.5 16.2499 3.5H12.7499V2.75L12.7439 2.649C12.7195 2.46909 12.6306 2.30416 12.4938 2.18482C12.3569 2.06547 12.1815 1.9998 11.9999 2L11.8979 2.007C11.7184 2.03165 11.5538 2.12048 11.4347 2.25707C11.3155 2.39366 11.2499 2.56876 11.2499 2.75L11.2489 3.5H7.74891C7.15234 3.50027 6.5803 3.73744 6.15856 4.15936C5.73682 4.58129 5.49991 5.15344 5.49991 5.75V10.255C5.49991 10.8517 5.73696 11.424 6.15892 11.846C6.58087 12.2679 7.15317 12.505 7.74991 12.505H15.5339L15.5539 12.452L15.5619 12.426L16.0119 11.042L16.0169 11.03C16.0963 10.8048 16.2269 10.6011 16.3983 10.4348C16.5697 10.2686 16.7774 10.1444 17.005 10.072C17.2325 9.99965 17.4738 9.98102 17.7097 10.0176C17.9457 10.0542 18.17 10.1451 18.3649 10.283ZM9.74991 6.5C9.91697 6.49527 10.0833 6.5241 10.239 6.58476C10.3947 6.64543 10.5367 6.73671 10.6566 6.85321C10.7764 6.9697 10.8716 7.10904 10.9367 7.26299C11.0017 7.41694 11.0353 7.58237 11.0353 7.7495C11.0353 7.91663 11.0017 8.08206 10.9367 8.23601C10.8716 8.38996 10.7764 8.5293 10.6566 8.6458C10.5367 8.76229 10.3947 8.85357 10.239 8.91424C10.0833 8.97491 9.91697 9.00373 9.74991 8.999C9.42464 8.9898 9.11578 8.85412 8.88896 8.6208C8.66215 8.38747 8.53526 8.0749 8.53526 7.7495C8.53526 7.4241 8.66215 7.11153 8.88896 6.87821C9.11578 6.64488 9.42464 6.5092 9.74991 6.5ZM14.2419 6.5C14.409 6.49527 14.5753 6.5241 14.731 6.58476C14.8867 6.64543 15.0287 6.73671 15.1486 6.85321C15.2684 6.9697 15.3636 7.10904 15.4287 7.26299C15.4937 7.41694 15.5273 7.58237 15.5273 7.7495C15.5273 7.91663 15.4937 8.08206 15.4287 8.23601C15.3636 8.38996 15.2684 8.5293 15.1486 8.6458C15.0287 8.76229 14.8867 8.85357 14.731 8.91424C14.5753 8.97491 14.409 9.00373 14.2419 8.999C13.9166 8.9898 13.6078 8.85412 13.381 8.6208C13.1541 8.38747 13.0273 8.0749 13.0273 7.7495C13.0273 7.4241 13.1541 7.11153 13.381 6.87821C13.6078 6.64488 13.9166 6.5092 14.2419 6.5ZM13.0419 14.037L13.1549 14H6.25391C5.65717 14 5.08487 14.2371 4.66292 14.659C4.24096 15.081 4.00391 15.6533 4.00391 16.25V17.157C4.00381 17.6971 4.12036 18.2308 4.34559 18.7216C4.57083 19.2125 4.89942 19.6489 5.30891 20.001C6.87191 21.344 9.11091 22.001 11.9999 22.001C14.0759 22.001 15.8169 21.662 17.2129 20.973C16.9475 20.9222 16.7001 20.8029 16.495 20.627C16.2899 20.451 16.1344 20.2246 16.0439 19.97L16.0399 19.958L15.5899 18.573C15.4998 18.3018 15.3478 18.0543 15.1459 17.852L14.7869 17.59L14.4279 17.407L13.0429 16.957L13.0309 16.952C12.7305 16.845 12.4705 16.6477 12.2866 16.3871C12.1028 16.1265 12.0041 15.8154 12.0041 15.4965C12.0041 15.1776 12.1028 14.8665 12.2866 14.6059C12.4705 14.3453 12.7305 14.148 13.0309 14.041L13.0419 14.037ZM15.8539 17.146C16.167 17.4581 16.4017 17.8398 16.5389 18.26L16.9869 19.637C17.0241 19.7435 17.0936 19.8358 17.1856 19.901C17.2776 19.9663 17.3876 20.0014 17.5004 20.0014C17.6132 20.0014 17.7232 19.9663 17.8152 19.901C17.9072 19.8358 17.9767 19.7435 18.0139 19.637L18.4609 18.26C18.5998 17.8412 18.8348 17.4607 19.147 17.1488C19.4592 16.837 19.8399 16.6025 20.2589 16.464L21.6369 16.016C21.7423 15.9779 21.8333 15.9082 21.8976 15.8165C21.962 15.7248 21.9965 15.6155 21.9965 15.5035C21.9965 15.3915 21.962 15.2822 21.8976 15.1905C21.8333 15.0988 21.7423 15.0291 21.6369 14.991L21.6099 14.984L20.2319 14.536C19.8133 14.3968 19.4329 14.1621 19.1208 13.8503C18.8087 13.5386 18.5735 13.1584 18.4339 12.74L17.9859 11.363C17.9485 11.2569 17.879 11.165 17.7871 11.0999C17.6952 11.0349 17.5855 11 17.4729 11C17.3604 11 17.2506 11.0349 17.1587 11.0999C17.0668 11.165 16.9974 11.2569 16.9599 11.363L16.5119 12.74L16.4999 12.774C16.3598 13.182 16.1286 13.5527 15.8238 13.858C15.519 14.1633 15.1487 14.3952 14.7409 14.536L13.3639 14.984C13.2586 15.0221 13.1675 15.0918 13.1032 15.1835C13.0388 15.2752 13.0043 15.3845 13.0043 15.4965C13.0043 15.6085 13.0388 15.7178 13.1032 15.8095C13.1675 15.9012 13.2586 15.9709 13.3639 16.009L14.7409 16.457C15.1609 16.597 15.5419 16.833 15.8539 17.146ZM23.0179 20.965L23.7829 21.213L23.7989 21.217C23.858 21.2377 23.9091 21.2763 23.9454 21.3273C23.9816 21.3784 24.001 21.4394 24.001 21.502C24.001 21.5646 23.9816 21.6256 23.9454 21.6767C23.9091 21.7277 23.858 21.7663 23.7989 21.787L23.0329 22.035C22.8003 22.1126 22.5889 22.2432 22.4155 22.4166C22.2421 22.59 22.1115 22.8014 22.0339 23.034L21.7859 23.798C21.7652 23.8571 21.7267 23.9082 21.6756 23.9445C21.6245 23.9807 21.5635 24.0001 21.5009 24.0001C21.4383 24.0001 21.3773 23.9807 21.3262 23.9445C21.2752 23.9082 21.2366 23.8571 21.2159 23.798L20.9659 23.034C20.8888 22.8009 20.7585 22.589 20.5853 22.4151C20.412 22.2412 20.2007 22.11 19.9679 22.032L19.2019 21.783C19.1428 21.7623 19.0917 21.7237 19.0555 21.6727C19.0192 21.6216 18.9998 21.5606 18.9998 21.498C18.9998 21.4354 19.0192 21.3744 19.0555 21.3233C19.0917 21.2723 19.1428 21.2337 19.2019 21.213L19.9679 20.965C20.1975 20.8854 20.4056 20.754 20.5761 20.5809C20.7465 20.4078 20.8748 20.1977 20.9509 19.967L21.1999 19.202C21.2206 19.1429 21.2592 19.0918 21.3102 19.0555C21.3613 19.0193 21.4223 18.9999 21.4849 18.9999C21.5475 18.9999 21.6085 19.0193 21.6596 19.0555C21.7107 19.0918 21.7492 19.1429 21.7699 19.202L22.0189 19.966C22.0965 20.1986 22.2271 20.41 22.4005 20.5834C22.5739 20.7568 22.7853 20.8874 23.0179 20.965Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_3616_12984">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
                    </svg>
                    </span>
                    <input
                      type="button"
                      value="AI Answer"
                      className=" text-white "
                      
                    />
                  </div>

        {/* Dropdowns */}
        <select className="border rounded-md px-4 py-2 bg-[#D4EBFB] text-gray-700 shadow  text-[0.75rem] font-normal">
          <option className="text-[0.75rem] font-normal">All Lectures</option>
          <option className="text-[0.75rem] font-normal">Lecture 1</option>
          <option className="text-[0.75rem] font-normal">Lecture 2</option>
        </select>

        <select className="border rounded-md px-4 py-2 bg-[#D4EBFB] text-gray-700 shadow text-[0.75rem] font-normal">
          <option className="text-[0.75rem] font-normal">Sort By Most Recent</option>
          <option className="text-[0.75rem] font-normal">Sort By Oldest</option>
        </select>
      </div>
    </div>
  );
}
