import React from 'react';
import { Link } from 'react-router-dom';

const CodeOfConductPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Card with Shadow */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Qgenii Code Of Conduct Test</h1>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm border border-gray-100">
            <p className="text-gray-700 leading-relaxed">
              Qgenii Is A Playground For Computer Programmers. And Just Like Any Other Sport, We Too Have Some Basic Expectations From Our Users. Nothing Stringent To Worry About. These Are Just Simple And Small Practices That All Of You Have Been Following. Or If Not, Should Be Following From Now On. :)
            </p>
          </div>

          <p className="font-semibold mb-4 text-gray-800">So, Let's Get Started:</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm border border-gray-100">
            <ol className="list-decimal pl-6 space-y-4 text-gray-700">
              <li className="pb-3 border-b border-gray-200">
                You Should Not Have Multiple Accounts On Qgenii. If You Have, Then You Should <Link to="#" className="text-blue-600 hover:underline font-medium">Delete</Link> All Except One.
              </li>
              <li className="pb-3 border-b border-gray-200">
                If You Encounter Any Issue During An Ongoing Contest, Post It As A Comment On The Respective Problem Page. The Problem Setter Will Help You Get Over It.
              </li>
              <li className="pb-3 border-b border-gray-200">
                After The Contest, All Queries Related To Any Specific Problem Should Be Posted On The Editorial Page Of The Problem On The <Link to="#" className="text-blue-600 hover:underline font-medium">Discuss</Link> Forum.
              </li>
              <li className="pb-3 border-b border-gray-200">
                You Should Avoid Sharing Formulae, Logic, Or Any Other Significant Aspect Of Your Code During A Contest. If Our Plagiarism Algorithm Finds Striking Similarities Between Your Code And Someone Else's, Your Account May Stand The Risk Of Being Suspended.
              </li>
              <li className="pb-3 border-b border-gray-200">
                If You Are Taking Part In Qgenii Contests, You Must Take Good Care Of Your Code. Protect It From Getting Leaked, Getting Shared, And Getting Copied By Your Foes, Friends, Or Just A Random Peer. It Is Your Responsibility To Provide It The Safety It Deserves.
              </li>
              <li className="pb-3 border-b border-gray-200">
                Avoid Using Any Online IDE's Or Code Sharing Sites Like Pastebin To Share Your Code. In Case You Must, The Responsibility Of Protecting Your Code Lies Solely With You. If You're Using Ideone, You Can Read About Protecting Your Code On There. Or You Can Use Our <Link to="#" className="text-blue-600 hover:underline font-medium">IDE</Link>.
              </li>
              <li className="pb-3 border-b border-gray-200">
                <p className="mb-3">Taking Help Or Using Third Party Code Is Not Bad. Passing It Off As Your Own Is. If You Are Taking Your Code From Some Other Source, It Is Expected That You Give The Due Attribution To The Source In Your Code. It Is Mandatory. The Third Party Code Should Have Been Available Publicly Before The Relevant Contest Began, And Not Created During The Contest. And If Questioned, The Proof Of Burden Rests On You To Prove This Beyond A Doubt.</p>
                <p className="text-gray-600 italic">But In Case You Have Missed Giving Attribution To A Third Party Code, And You Get Caught In Our Plagiarism Check, Then You Have The Option Of Proving To Us That This Was Indeed A Publicly Available Code.</p>
              </li>
              <li className="pb-3 border-b border-gray-200">
                Do Not Ask Or Discuss Any Aspect Of Any Qgenii Problem During An Ongoing Contest On Any Other Platform, Online Or Offline. Discussion Of Strategy Should Be Avoided During The Contest And Postponed Till The End.
              </li>
              <li className="pb-3 border-b border-gray-200">
                Unless Specified Otherwise, You Are Expected To Solve And Code The Problems Yourself And Not Discuss With Others.
              </li>
              <li className="pb-3 border-b border-gray-200">
                Stay Honest To The Community. If You Come Across Any Wrongdoing, Which Hampers The Decorum Of The Community On Or Off It, Do Report That To Us. We Will Investigate The Issue And Take Appropriate Action To Stop It.
              </li>
              <li className="pb-3 border-b border-gray-200">
                You Write Beautiful Codes. Why Ruin It By Obfuscating It? Keep The Real Beauty Of The Code Intact. Do Not Obfuscate It.
              </li>
              <li className="pb-3 border-b border-gray-200">
                Do Not Try Any Dishonest Means To Move Up The Rank Tables.
              </li>
              <li>
                Do Not Use Code Generated By Any AI Tools, Such As ChatGPT / Claude Etc To Solve The Problem.
              </li>
            </ol>
          </div>

          {/* AI Rules Section */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 shadow-sm border border-blue-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Rule On Generative AI Use During Contests:</h2>

            <ol className="list-decimal pl-6 space-y-4 text-gray-700">
              <li className="pb-3 border-b border-blue-200">
                <strong className="text-red-600">Prohibited Usage:</strong> Do Not Use Any Form Of Generative AI To Derive The Logic Or Solution For Any Problem In The Contest. Writing A Suboptimal Code And Then Improving It Using AI Is Also Prohibited.
              </li>
              <li className="pb-3 border-b border-blue-200">
                <strong className="text-green-600">Permitted Usage:</strong> You May Use Generative AI To Derive Standard Functions, Such As Sorting Algorithms Or Mathematical Computations, That Do Not Directly Solve The Problem.
              </li>
              <li>
                <strong className="text-orange-600">Plagiarism Checkers</strong> Will Treat Similar Submissions As Copied / Plagiarised Even If They Have Been Derived From Generative AI.
              </li>
            </ol>
          </div>

          {/* Warning Section */}
          <div className="bg-red-50 rounded-lg p-6 mb-6 shadow-sm border border-red-200">
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-2xl">⚠️</span>
              <div>
                <p className="text-gray-800 font-medium mb-2">
                  If You Are Caught Cheating In At Least 3 Contests, Then Your Account Will Be Permanently Banned From Qgenii.
                </p>
                <p className="text-gray-700">
                  Not Adhering To The Above Set Of Guidelines May Lead To Suspension, Permanent Ban Of Your Account, And/Or Reduction In Your Rating Points. You May Also Lose All Claims On Prizes Or Past Rewards Of Any Kind.
                </p>
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="bg-yellow-50 rounded-lg p-6 mb-6 shadow-sm border border-yellow-200">
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong className="text-gray-700">Note:</strong> Residents Of The Following Countries And Territories Are Not Eligible To Win Prizes/Laddus/Goodies, Or Earn Any Compensation Due To Legal Restrictions: Albania, Bahamas, Barbados, Botswana, Burma, Cambodia, Crimea Region Of Russia, Cuba, Ghana, Iceland, Iran, Jamaica, Mauritius, Mongolia, Myanmar, Nicaragua, North Korea, Pakistan, Panama, Sudan, Syria, Uganda, Yemen, Zimbabwe.
            </p>
          </div>

          {/* Terms Section */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-700">
              By Agreeing To Our Code Of Conduct, You Also Agree To Adhere To Our <Link to="/terms" className="text-blue-600 hover:underline font-medium">Terms Of Service</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConductPage;
