import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Module</span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-6">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-1/4 bg-indigo-600 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>Next Module</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Sub Nav */}
        <div className="bg-sky-50 border-t">
          <div className="max-w-6xl mx-auto px-4 py-2 flex gap-6 text-sm">
            <span className="font-semibold text-gray-800 border-b-2 border-indigo-600 pb-1">
              Statement
            </span>
            <span className="text-gray-500">AI Help</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="flex justify-end mb-6">
            <button className="flex items-center gap-2 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm hover:bg-indigo-50">
              <Volume2 className="w-4 h-4" />
              Listen
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-6">Welcome!!!</h1>

          <div className="text-left text-gray-700 space-y-3 mb-10">
            <p>Welcome to the course on learning Python!</p>
            <p className="font-medium">What will you learn here?</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                All the basic concepts of Python programming language like –
                Variables, Strings, Conditions, Lists, Loops, Functions etc.
              </li>
              <li>
                By the end of this course, you will be able to write code in
                Python to solve logical real world problems.
              </li>
            </ul>
          </div>

          <p className="font-semibold mb-2">Let the fun begin!</p>
          <p className="text-gray-600 mb-6">
            Click on Next to Start Your Assessment
          </p>

          <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg font-medium">
            Next
          </button>

          <div className="mt-10 text-sm text-gray-600">
            If you already know the basic syntax of Python you will find our{" "}
            <span className="text-indigo-600 underline cursor-pointer">
              Logic building in Python course
            </span>{" "}
            more appropriate to your level.
          </div>
        </div>

        {/* Common Doubts */}
        <div className="max-w-5xl mx-auto px-4 pb-16">
          <div className="border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-500">⚠️</span>
              <h3 className="font-semibold">Common Doubts:</h3>
            </div>

            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <button
                  key={i}
                  className="px-5 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100"
                >
                  How long would this take?
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
