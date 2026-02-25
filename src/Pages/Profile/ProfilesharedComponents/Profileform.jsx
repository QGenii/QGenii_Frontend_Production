import { useState, useRef } from "react";

import { Input } from "../../../Components/ui/Input";
import { useAuth } from "../../../hooks/useAuth";

// ProfileForm.jsx
// React component styled with Tailwind CSS v3
// Single-file component: copy into your project and render <ProfileForm />

export default function ProfileForm({
  editingDisabled,
  setEditingDisabled,
  form,
  setForm,
  handleChangeInEditProfile,
  avatarPreview,
  setAvatarPreview,
}) {
  const [resumeName, setResumeName] = useState("");
  const { user } = useAuth();
  const avatarInputRef = useRef(null);

  //    getting user
  //   useEffect(() => {
  //     api
  //       .get("/auth/me")
  //       .then((res) => {
  //         const response = res.data;
  //         if (response.data) {
  //             console.log(response.data)
  //           setForm({
  //             firstName : response.data.user.name,
  //             email : response.data.user.email
  //           })
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  //   function handleChange(e) {}

  function handleAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        // setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleResume(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeName(file.name);
  }

  return (
    <div className="max-w-7xl mx-auto py-[1.56rem] px-[1.75rem] max-h-[48.6875rem] overflow-y-scroll hide-scrollbar">
      <form className="space-y-10">
        {/* Basic Information */}
        <div className="flex px-[1.75rem] py-[1.5625rem] gap-[0.8125rem]">
          <div className="flex flex-col gap-6  items-center ">
            {/* left: Image */}
            <div className=" flex flex-col items-center  gap-6">
              <div className="relative">
                <div className="w-[9.37rem] h-[9.375rem] rounded-full border-2 border-[#2800AE] overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={avatarPreview ? avatarPreview : user?.profileImage}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="inline-block">
                <input
                  ref={avatarInputRef}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  disabled={editingDisabled}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (editingDisabled) return;
                    avatarInputRef.current?.click();
                  }}
                  className={`bg-[#2800ae] text-[0.875rem] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#0277cc] transition ${
                    editingDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  Change Image
                </button>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ">
            {/* right side: Form fields */}
            <div className=" flex flex-col gap-[0.62rem] ">
              {/* Basic Information */}
              <div className="flex flex-col  w-[47.5rem]">
                <div className="flex items-center gap-3 mb-6">
                  <HeadingIcon />
                  <h2 className="text-2xl font-semibold">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[9.38rem] gap-y-[1.25rem]">
                  <Input
                    className="w-[17.18rem] outline-none"
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                  />
                  <Input
                    className="w-[17.18rem]"
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                  />

                  <Input
                    className="w-[17.18rem]"
                    label="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                    icon={<MailIcon />}
                  />
                  <Input
                    className="w-[17.18rem]"
                    label="Mobile Number"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                    icon={<PhoneIcon />}
                  />

                  <Input
                    className="w-[17.18rem]"
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                    icon={<PinIcon />}
                  />
                  <Input
                    className="w-[17.18rem]"
                    label="Date of Birth"
                    name="dob"
                    value={form.dob}
                    onChange={handleChangeInEditProfile}
                    icon={<CalendarIcon />}
                    disabled={editingDisabled}
                    type="date"
                  />

                  <Input
                    className="w-[17.18rem]"
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-[1rem] font-medium text-black mb-2">
                    Bio/About me
                  </label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                    rows={5}
                    className="w-[45.05rem] bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 resize-none placeholder-gray-400"
                    placeholder="Tell something about yourself..."
                  />
                </div>
              </div>
              {/* Academic Details */}
              <section className="w-[47.5rem]">
                <div className="flex flex-col  w-[47.5rem]">
                  <div className="flex items-center gap-3 mb-6">
                    <AcademicIcon />
                    <h4 className="text-[1rem] font-semibold">
                      Academic Details
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-[9.38rem] gap-y-[1.25rem]">
                    <Input
                      className="w-[17.18rem]"
                      label="Highest Qualification"
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChangeInEditProfile}
                      disabled={editingDisabled}
                    />
                    <Input
                      className="w-[17.18rem]"
                      label="College/ University Name"
                      name="college"
                      value={form.college}
                      onChange={handleChangeInEditProfile}
                      disabled={editingDisabled}
                    />

                    <Input
                      className="w-[17.18rem]"
                      label="Course/ Branch"
                      name="course"
                      value={form.course}
                      onChange={handleChangeInEditProfile}
                      disabled={editingDisabled}
                    />
                    <Input
                      className="w-[17.18rem]"
                      label="Year of Passing"
                      name="year"
                      value={form.year}
                      onChange={handleChangeInEditProfile}
                      disabled={editingDisabled}
                    />

                    <Input
                      className="w-[17.18rem]"
                      label="Academic Achievements (optional)"
                      name="achievements"
                      value={form.achievements}
                      onChange={handleChangeInEditProfile}
                      disabled={editingDisabled}
                    />
                  </div>
                </div>
              </section>

              {/* Professional Details */}
              <section className="w-[47.5rem]">
                <div className="flex items-center gap-3 mb-6">
                  <ProfessionalIcon />
                  <h4 className="text-[1rem] font-semibold">
                    Professional Details
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-[9.38rem] gap-y-[1.25rem] ">
                  <Input
                    className="w-[17.18rem]"
                    label="Current Role"
                    name="role"
                    value={form.role}
                    disabled={editingDisabled}
                    onChange={handleChangeInEditProfile}
                  />
                  <Input
                    className="w-[17.18rem]"
                    label="Company/Organisation Name"
                    name="company"
                    value={form.company}
                    disabled={editingDisabled}
                    onChange={handleChangeInEditProfile}
                  />

                  <Input
                    className="w-[17.18rem]"
                    label="Years of Experience"
                    name="experience"
                    value={form.experience}
                    disabled={editingDisabled}
                    onChange={handleChangeInEditProfile}
                  />
                  <Input
                    className="w-[17.18rem]"
                    label="Skills"
                    name="skills"
                    value={form.skills}
                    disabled={editingDisabled}
                    onChange={handleChangeInEditProfile}
                  />

                  <Input
                    className="w-[17.18rem]"
                    label="LinkedIn / GitHub / Portfolio links"
                    name="links"
                    value={form.links}
                    onChange={handleChangeInEditProfile}
                    disabled={editingDisabled}
                  />
                </div>
              </section>

              {/* Other Details */}
              <section className="w-[47.5rem]">
                <div className="flex items-center gap-3 mb-6">
                  <OtherIcon />
                  <h4 className="text-[1rem] font-medium">Other Details</h4>
                </div>

                <div className="space-y-6 w-full">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interests
                    </label>
                    <textarea
                      name="interests"
                      value={form.interests}
                      disabled={editingDisabled}
                      onChange={handleChangeInEditProfile}
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 resize-none placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume/ CV
                    </label>

                    <label className="block">
                      <input
                        className="w-[17.18rem]"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResume}
                        disabled={editingDisabled}
                      />
                      <div className="w-1/2 md:w-1/3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 px-4 py-6 flex items-center justify-center">
                        {resumeName ? (
                          <span className="text-sm text-gray-700">
                            {resumeName}
                          </span>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Click to upload resume (PDF, DOC)
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        {/* Action buttons */}
        {/* <div className="flex gap-3">
          <button type="submit" className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-sm hover:bg-purple-800">Save Changes</button>
          <button type="button" className="border border-gray-200 px-6 py-2 rounded-md">Cancel</button>
        </div> */}
      </form>
    </div>
  );
}

/* -------------------- Small icon components -------------------- */
function HeadingIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-purple-600"
    >
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8z"
        stroke="#5F00FF"
        strokeWidth="1.5"
      />
      <path d="M4 20a8 8 0 0116 0" stroke="#5F00FF" strokeWidth="1.5" />
    </svg>
  );
}

function AcademicIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l7 4-7 4-7-4 7-4z" stroke="#5F00FF" strokeWidth="1.5" />
      <path d="M5 10v6a7 7 0 0014 0v-6" stroke="#5F00FF" strokeWidth="1.5" />
    </svg>
  );
}

function ProfessionalIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="12"
        rx="2"
        stroke="#5F00FF"
        strokeWidth="1.5"
      />
      <path d="M7 11h10" stroke="#5F00FF" strokeWidth="1.5" />
    </svg>
  );
}

function OtherIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke="#5F00FF"
        strokeWidth="1.5"
      />
      <path d="M7 12h10M7 7h10" stroke="#5F00FF" strokeWidth="1.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke="#111827"
        strokeWidth="1.2"
      />
      <path d="M3 7l9 6 9-6" stroke="#111827" strokeWidth="1.2" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.08 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.83.36 1.64.71 2.4a2 2 0 01-.45 2.11L9.91 9.91a16 16 0 006 6l1.68-1.68a2 2 0 012.11-.45c.76.35 1.57.59 2.4.71A2 2 0 0122 16.92z"
        stroke="#111827"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21s-6.5-4.79-8-7.5A7 7 0 1119 13.5C17.5 16.21 12 21 12 21z"
        stroke="#111827"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="10" r="2" stroke="#111827" strokeWidth="1.2" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="#111827"
        strokeWidth="1.2"
      />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="#111827" strokeWidth="1.2" />
    </svg>
  );
}
