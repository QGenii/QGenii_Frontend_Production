// src/pages/CourseCatalog.jsx

import React, { useEffect, useMemo, useState } from "react";
import Image from "/coursecatlogimage.png";
import api from "../../../lib/api";
import { userProfileApi } from "../../../lib/userProfileApi";
import { useNavigate } from "react-router-dom";
import LearnPythonDetailedPage from "./LearnPythonDetailedPage";
import styled from "styled-components";

const coursesData = [
  // Row 1
  {
    title: "Learn Python Programming",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "335.8k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/python.png",
    badgeType: "Beginner",
    path: "LearnPythonProgramming",
  },
  {
    title: "Learn Java",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "295.3k",
    lessons: 31,
    image: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
    badgeType: "Beginner",
    path: "LearnJava",
  },
  {
    title: "Learn C",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "320.1k",
    lessons: 28,
    image: "https://img.icons8.com/color/48/000000/c-programming.png",
    badgeType: "Beginner",
    path: "LearnC",
  },
  {
    title: "Learn C++",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "281.5k",
    lessons: 30,
    image: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    badgeType: "Beginner",
    path: "LearnCPP",
  },

  // Row 2
  {
    title: "Problem Solving in Python",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "295.2k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/python.png",
    badgeType: "Beginner",
    path: "ProblemSolvingInPython",
  },
  {
    title: "Problem Solving in Java",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "235.7k",
    lessons: 30,
    image: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
    badgeType: "Beginner",
    path: "ProblemSolvingInJava",
  },
  {
    title: "Learn SQL",
    level: "Beginner",
    rating: 4.9,
    reviews: 10000,
    learners: "220.7k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/sql.png",
    badgeType: "Beginner",
    path: "LearnSQL",
  },
  {
    title: "Learn HTML/CSS",
    level: "Intermediate",
    rating: 4.9,
    reviews: 10000,
    learners: "220.8k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/html-5.png",
    badgeType: "Intermediate",
    path: "LearnHTMLCSS",
  },

  // Row 3
  {
    title: "Problem Solving in C",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "245.6k",
    lessons: 26,
    image: "https://img.icons8.com/color/48/000000/c-programming.png",
    badgeType: "Beginner",
    path: "ProblemSolvingInC",
  },
  {
    title: "C++ Problem Solving",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "230.5k",
    lessons: 26,
    image: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    badgeType: "Beginner",
    path: "CPPProblemSolving",
  },
  {
    title: "Linked Lists",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "250.6k",
    lessons: 28,
    image: "https://img.icons8.com/ios-filled/50/000000/link.png",
    badgeType: "Beginner",
    path: "LinkedLists",
  },
  {
    title: "Learn JavaScript",
    level: "Beginner",
    rating: 4.9,
    reviews: 10000,
    learners: "225.1k",
    lessons: 26,
    image: "https://img.icons8.com/color/48/000000/javascript--v1.png",
    badgeType: "Beginner",
    path: "LearnJavaScript",
  },

  // Row 4
  {
    title: "Time Complexity",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "215.5k",
    lessons: 20,
    image: "https://img.icons8.com/ios-filled/50/000000/time-complexity.png",
    badgeType: "Beginner",
    path: "TimeComplexity",
  },
  {
    title: "Stacks And Queues",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "210.8k",
    lessons: 18,
    image: "https://img.icons8.com/ios-filled/50/000000/stack.png",
    badgeType: "Beginner",
    path: "StacksAndQueues",
  },
  {
    title: "Learn Advanced SQL",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "235.1k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/sql.png",
    badgeType: "Intermediate",
    path: "LearnAdvancedSQL",
  },
  {
    title: "Beginner DSA in Python",
    level: "Beginner",
    rating: 4.9,
    reviews: 10000,
    learners: "240.5k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/python.png",
    badgeType: "Beginner",
    path: "BeginnerDSAInPython",
  },
];

// Additional course data for the last four rows shown in the image
const additionalCourses = [
  // Row 1
  {
    title: "Learn Advanced Java",
    level: "Intermediate",
    rating: 4.7,
    reviews: 10000,
    learners: "220.1k",
    lessons: 35,
    image: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
    badgeType: "Intermediate",
    path: "LearnAdvancedJava",
  },
  {
    title: "Learn C#",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "230.3k",
    lessons: 30,
    image: "https://img.icons8.com/color/48/000000/c-sharp-logo.png",
    badgeType: "Beginner",
    path: "LearnCSharp",
  },
  {
    title: "Beginner DSA in C++",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "235.1k",
    lessons: 28,
    image: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    badgeType: "Beginner",
    path: "BeginnerDSAInCPP",
  },
  {
    title: "Recursion",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "210.7k",
    lessons: 25,
    image:
      "https://img.icons8.com/ios-filled/50/000000/recurring-appointment.png",
    badgeType: "Beginner",
    path: "Recursion",
  },

  // Row 2
  {
    title: "Web Development Using Java",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "215.6k",
    lessons: 40,
    image: "https://img.icons8.com/color/48/000000/javascript--v1.png",
    badgeType: "Intermediate",
    path: "WebDevelopmentUsingJava",
  },
  {
    title: "Searching & Sorting Algorithms",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "190.3k",
    lessons: 28,
    image: "https://img.icons8.com/ios-filled/50/000000/sort.png",
    badgeType: "Beginner",
    path: "SearchingAndSortingAlgorithms",
  },
  {
    title: "SQL At Work",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "210.4k",
    lessons: 32,
    image: "https://img.icons8.com/color/48/000000/sql.png",
    badgeType: "Intermediate",
    path: "SQLAtWork",
  },
  {
    title: "Trees And Binary Trees",
    level: "Intermediate",
    rating: 4.7,
    reviews: 10000,
    learners: "205.0k",
    lessons: 30,
    image: "https://img.icons8.com/ios-filled/50/000000/tree-structure.png",
    badgeType: "Intermediate",
    path: "TreesAndBinaryTrees",
  },

  // Row 3
  {
    title: "Beginner DSA in C",
    level: "Beginner",
    rating: 4.5,
    reviews: 10000,
    learners: "195.1k",
    lessons: 24,
    image: "https://img.icons8.com/color/48/000000/c-programming.png",
    badgeType: "Beginner",
    path: "BeginnerDSAInC",
  },
  {
    title: "Arrays",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "190.3k",
    lessons: 25,
    image: "https://img.icons8.com/ios-filled/50/000000/array.png",
    badgeType: "Beginner",
    path: "Arrays",
  },
  {
    title: "OOPs Concept in Java",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "210.1k",
    lessons: 28,
    image: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
    badgeType: "Intermediate",
    path: "OOPsConceptInJava",
  },
  {
    title: "Beginner DSA in Python",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "215.5k",
    lessons: 26,
    image: "https://img.icons8.com/color/48/000000/python.png",
    badgeType: "Beginner",
    path: "BeginnerDSAInPython",
  },

  // Row 4
  {
    title: "Hashing",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "180.4k",
    lessons: 20,
    image: "https://img.icons8.com/ios-filled/50/000000/hash.png",
    badgeType: "Beginner",
    path: "Hashing",
  },
  {
    title: "Greedy Algorithms",
    level: "Intermediate",
    rating: 4.7,
    reviews: 10000,
    learners: "230.1k",
    lessons: 28,
    image: "https://img.icons8.com/ios-filled/50/000000/algorithm.png",
    badgeType: "Intermediate",
    path: "GreedyAlgorithms",
  },
  {
    title: "Learn ReactJS For Front-End",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "250.6k",
    lessons: 30,
    image: "https://img.icons8.com/color/48/000000/react-native.png",
    badgeType: "Beginner",
    path: "LearnReactJSForFrontEnd",
  },
  {
    title: "Beginner DSA in Java",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "235.5k",
    lessons: 28,
    image: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
    badgeType: "Beginner",
    path: "BeginnerDSAInJava",
  },
];
// Additional course data for the rows shown in the latest image
const newCoursesData = [
  // Row 1
  {
    title: "Learn Java",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "291.5k",
    lessons: 30,
    image: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
    badgeType: "Beginner",
    path: "LearnJava",
  },
  {
    title: "CSS Intermediate",
    level: "Intermediate",
    rating: 4.6,
    reviews: 10000,
    learners: "215.7k",
    lessons: 26,
    image: "https://img.icons8.com/color/48/000000/css3.png",
    badgeType: "Intermediate",
    path: "CSSIntermediate",
  },
  {
    title: "OOPs Concept In C++",
    level: "Intermediate",
    rating: 4.7,
    reviews: 10000,
    learners: "230.5k",
    lessons: 24,
    image: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    badgeType: "Intermediate",
    path: "OOPsConceptInCPP",
  },
  {
    title: "Binary Search",
    level: "Intermediate",
    rating: 4.7,
    reviews: 10000,
    learners: "235.2k",
    lessons: 25,
    image: "https://img.icons8.com/ios-filled/50/000000/binary-search.png",
    badgeType: "Intermediate",
    path: "BinarySearch",
  },

  // Row 2
  {
    title: "C++ STL: Standard Template Library",
    level: "Beginner",
    rating: 4.9,
    reviews: 10000,
    learners: "228.3k",
    lessons: 26,
    image: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    badgeType: "Beginner",
    path: "CPPSTL",
  },
  {
    title: "Complete C Language Course",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "245.1k",
    lessons: 28,
    image: "https://img.icons8.com/color/48/000000/c-programming.png",
    badgeType: "Beginner",
    path: "CompleteCLanguageCourse",
  },
  {
    title: "Dynamic Programming",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "220.8k",
    lessons: 30,
    image: "https://img.icons8.com/ios-filled/50/000000/flow-chart.png",
    badgeType: "Intermediate",
    path: "DynamicProgramming",
  },
  {
    title: "OOPs Concepts In Python",
    level: "Intermediate",
    rating: 4.9,
    reviews: 10000,
    learners: "264.1k",
    lessons: 28,
    image: "https://img.icons8.com/color/48/000000/python.png",
    badgeType: "Intermediate",
    path: "OOPsConceptsInPython",
  },

  // Row 3
  {
    title: "Heaps",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "210.5k",
    lessons: 26,
    image: "https://img.icons8.com/ios-filled/50/000000/heap.png",
    badgeType: "Beginner",
    path: "Heaps",
  },
  {
    title: "Advanced Python",
    level: "Intermediate",
    rating: 4.9,
    reviews: 10000,
    learners: "235.0k",
    lessons: 28,
    image: "https://img.icons8.com/color/48/000000/python.png",
    badgeType: "Intermediate",
    path: "AdvancedPython",
  },
  {
    title: "Build WI Django: Web Development Framework",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "230.5k",
    lessons: 31,
    image: "https://img.icons8.com/ios-filled/50/000000/django.png",
    badgeType: "Intermediate",
    path: "BuildWithDjango",
  },
  {
    title: "Graphs",
    level: "Intermediate",
    rating: 4.7,
    reviews: 10000,
    learners: "235.6k",
    lessons: 28,
    image: "https://img.icons8.com/ios-filled/50/000000/graph.png",
    badgeType: "Intermediate",
    path: "Graphs",
  },

  // Row 4
  {
    title: "Number Theory",
    level: "Intermediate",
    rating: 4.5,
    reviews: 10000,
    learners: "201.5k",
    lessons: 25,
    image: "https://img.icons8.com/ios-filled/50/000000/math.png",
    badgeType: "Intermediate",
    path: "NumberTheory",
  },
  {
    title: "Learn Pandas+: Practice Problems & Case Studies",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "225.0k",
    lessons: 23,
    image: "https://img.icons8.com/color/48/000000/pandas.png",
    badgeType: "Beginner",
    path: "LearnPandasPlus",
  },
  {
    title: "Learn Kotlin",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "205.6k",
    lessons: 24,
    image: "https://img.icons8.com/color/48/000000/kotlin.png",
    badgeType: "Beginner",
    path: "LearnKotlin",
  },
  {
    title: "Learn Golang",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "218.9k",
    lessons: 23,
    image: "https://img.icons8.com/color/48/000000/golang.png",
    badgeType: "Beginner",
    path: "LearnGolang",
  },
];
// Additional course data for the 5 rows shown in the latest image
const moreCoursesData = [
  // Row 1
  {
    title: "Learn Rust",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "220.1k",
    lessons: 25,
    image:
      "https://img.icons8.com/color/48/000000/rust-programming-language.png",
    badgeType: "Beginner",
    path: "LearnRust",
  },
  {
    title: "Learn NumPy+: Practice Problems & Case Studies",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "230.6k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/numpy.png",
    badgeType: "Beginner",
    path: "LearnNumPyPlus",
  },
  {
    title: "Logic Building in C#",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "230.7k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/c-sharp-logo.png",
    badgeType: "Beginner",
    path: "LogicBuildingInCSharp",
  },
  {
    title: "Build With Flask: Web Development For Python",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "210.7k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/flask.png",
    badgeType: "Intermediate",
    path: "BuildWithFlask",
  },

  // Row 2
  {
    title: "Learn C++ For Project Building",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "225.8k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    badgeType: "Beginner",
    path: "LearnCPPForProjectBuilding",
  },
  {
    title: "DBMS Course",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "233.8k",
    lessons: 30,
    image: "https://img.icons8.com/color/48/000000/database.png",
    badgeType: "Beginner",
    path: "DBMSCourse",
  },
  {
    title: "Tries",
    level: "Advanced",
    rating: 4.6,
    reviews: 10000,
    learners: "195.9k",
    lessons: 26,
    image: "https://img.icons8.com/ios-filled/50/000000/trie.png",
    badgeType: "Advanced",
    path: "Tries",
  },
  {
    title: "Complete C++ Course",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "250.1k",
    lessons: 35,
    image: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    badgeType: "Beginner",
    path: "CompleteCPPCourse",
  },

  // Row 3
  {
    title: "Learn R Programming",
    level: "Beginner",
    rating: 4.5,
    reviews: 10000,
    learners: "205.9k",
    lessons: 25,
    image: "https://img.icons8.com/ios-filled/50/000000/r-project.png",
    badgeType: "Beginner",
    path: "LearnRProgramming",
  },
  {
    title: "Learn PHP",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "220.9k",
    lessons: 26,
    image: "https://img.icons8.com/officel/48/000000/php-logo.png",
    badgeType: "Beginner",
    path: "LearnPHP",
  },
  {
    title: "Combinatorics",
    level: "Intermediate",
    rating: 4.6,
    reviews: 10000,
    learners: "230.5k",
    lessons: 28,
    image: "https://img.icons8.com/ios-filled/50/000000/combinatorics.png",
    badgeType: "Intermediate",
    path: "Combinatorics",
  },
  {
    title: "Beginner DSA in C#",
    level: "Beginner",
    rating: 4.6,
    reviews: 10000,
    learners: "230.6k",
    lessons: 35,
    image: "https://img.icons8.com/color/48/000000/c-sharp-logo.png",
    badgeType: "Beginner",
    path: "BeginnerDSAInCSharp",
  },

  // Row 4
  {
    title: "Learn Procedural SQL",
    level: "Advanced",
    rating: 4.7,
    reviews: 10000,
    learners: "225.0k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/sql.png",
    badgeType: "Advanced",
    path: "LearnProceduralSQL",
  },
  {
    title: "Visualize Data Using Matplotlib",
    level: "Intermediate",
    rating: 4.7,
    reviews: 10000,
    learners: "210.9k",
    lessons: 23,
    image: "https://img.icons8.com/ios-filled/50/000000/matplotlib.png",
    badgeType: "Intermediate",
    path: "VisualizeDataUsingMatplotlib",
  },
  {
    title: "Disjoint Set Union",
    level: "Intermediate",
    rating: 4.8,
    reviews: 10000,
    learners: "205.9k",
    lessons: 25,
    image: "https://img.icons8.com/ios-filled/50/000000/set-operations.png",
    badgeType: "Intermediate",
    path: "DisjointSetUnion",
  },
  {
    title: "Logic Building In Kotlin",
    level: "Beginner",
    rating: 4.8,
    reviews: 10000,
    learners: "220.6k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/kotlin.png",
    badgeType: "Beginner",
    path: "LogicBuildingInKotlin",
  },

  // Row 5 (Partial)
  {
    title: "Beginner Kotlin",
    level: "Beginner",
    rating: 4.7,
    reviews: 10000,
    learners: "220.8k",
    lessons: 25,
    image: "https://img.icons8.com/color/48/000000/kotlin.png",
    badgeType: "Beginner",
    path: "BeginnerKotlin",
  },
];

// You can merge these with your existing coursesData array
// These are now only used as **mock data** for legacy components like CourseDetail.
// The main CourseCatalog UI below loads real courses from the backend API.
const mockCourses = [
  ...coursesData,
  ...additionalCourses,
  ...newCoursesData,
  ...moreCoursesData,
];

// Named export so other components (e.g. CourseDetail) can still lookup mock courses by `path`
export { mockCourses as courses };

// const coursesdata = [
//   {
//     title: 'Learn Python Programming',
//     level: 'Beginner',
//     rating: 4.7,
//     reviews: 5892,
//     learners: '230.5k',
//     lessons: 25,
//     image: 'https://img.icons8.com/color/48/000000/python.png',
//   },
//   {
//     title: 'Learn Java Programming',
//     level: 'Beginner',
//     rating: 4.4,
//     reviews: 5200,
//     learners: '210.8k',
//     lessons: 22,
//     image: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png',
//   },
//   {
//     title: 'Learn C++ Programming',
//     level: 'Beginner',
//     rating: 4.6,
//     reviews: 4800,
//     learners: '198.4k',
//     lessons: 20,
//     image: 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png',
//   },
//   {
//     title: 'Learn C# Programming',
//     level: 'Beginner',
//     rating: 4.3,
//     reviews: 4300,
//     learners: '176.2k',
//     lessons: 18,
//     image: 'https://img.icons8.com/color/48/000000/c-sharp-logo.png',
//   },
//   {
//     title: 'Learn JavaScript',
//     level: 'Beginner',
//     rating: 4.7,
//     reviews: 6100,
//     learners: '250.9k',
//     lessons: 30,
//     image: 'https://img.icons8.com/color/48/000000/javascript--v1.png',
//   },
//   {
//     title: 'Learn SQL for Beginners',
//     level: 'Beginner',
//     rating: 4.5,
//     reviews: 3900,
//     learners: '150.3k',
//     lessons: 16,
//     image: 'https://img.icons8.com/ios-filled/50/4D4D4D/sql.png',
//   },
//   {
//     title: 'Learn HTML & CSS',
//     level: 'Beginner',
//     rating: 4.6,
//     reviews: 5700,
//     learners: '300.1k',
//     lessons: 28,
//     image: 'https://img.icons8.com/color/48/000000/html-5--v1.png',
//   },
//   {
//     title: 'Learn React.js',
//     level: 'Beginner',
//     rating: 4.8,
//     reviews: 6200,
//     learners: '280.6k',
//     lessons: 26,
//     image: 'https://img.icons8.com/officel/40/react.png',
//   },
//   {
//     title: 'Data Structures in C++',
//     level: 'Intermediate',
//     rating: 4.7,
//     reviews: 4900,
//     learners: '190.9k',
//     lessons: 24,
//     image: 'https://img.icons8.com/color/48/000000/data-configuration.png',
//   },
//   {
//     title: 'Web Development',
//     level: 'Beginner',
//     rating: 4.9,
//     reviews: 7100,
//     learners: '325.7k',
//     lessons: 32,
//     image: 'https://img.icons8.com/color/48/000000/web-design.png',
//   },
//   {
//     title: 'Android Development',
//     level: 'Intermediate',
//     rating: 4.5,
//     reviews: 4500,
//     learners: '185.3k',
//     lessons: 28,
//     image: 'https://img.icons8.com/color/48/000000/android-os.png',
//   },
//   {
//     title: 'iOS Development',
//     level: 'Intermediate',
//     rating: 4.6,
//     reviews: 4300,
//     learners: '162.7k',
//     lessons: 26,
//     image: 'https://img.icons8.com/color/48/000000/ios-logo.png',
//   },
//   {
//     title: 'Node.js Basics',
//     level: 'Beginner',
//     rating: 4.5,
//     reviews: 3700,
//     learners: '145.2k',
//     lessons: 20,
//     image: 'https://img.icons8.com/color/48/000000/nodejs.png',
//   },
//   {
//     title: 'Angular Framework',
//     level: 'Intermediate',
//     rating: 4.4,
//     reviews: 3500,
//     learners: '137.6k',
//     lessons: 22,
//     image: 'https://img.icons8.com/color/48/000000/angularjs.png',
//   },
//   {
//     title: 'Vue.js Fundamentals',
//     level: 'Beginner',
//     rating: 4.6,
//     reviews: 3200,
//     learners: '128.9k',
//     lessons: 18,
//     image: 'https://img.icons8.com/color/48/000000/vue-js.png',
//   },
//   {
//     title: 'MongoDB Basics',
//     level: 'Beginner',
//     rating: 4.3,
//     reviews: 2900,
//     learners: '110.5k',
//     lessons: 16,
//     image: 'https://img.icons8.com/color/48/000000/mongodb.png',
//   },
//   {
//     title: 'TypeScript Essentials',
//     level: 'Intermediate',
//     rating: 4.5,
//     reviews: 3100,
//     learners: '125.3k',
//     lessons: 20,
//     image: 'https://img.icons8.com/color/48/000000/typescript.png',
//   },
//   {
//     title: 'Ruby Programming',
//     level: 'Beginner',
//     rating: 4.2,
//     reviews: 2600,
//     learners: '95.8k',
//     lessons: 18,
//     image: 'https://img.icons8.com/color/48/000000/ruby-programming-language.png',
//   },
//   {
//     title: 'PHP for Web',
//     level: 'Beginner',
//     rating: 4.1,
//     reviews: 2800,
//     learners: '102.4k',
//     lessons: 20,
//     image: 'https://img.icons8.com/officel/48/000000/php-logo.png',
//   },
//   {
//     title: 'Go Programming',
//     level: 'Intermediate',
//     rating: 4.7,
//     reviews: 3400,
//     learners: '132.6k',
//     lessons: 22,
//     image: 'https://img.icons8.com/color/48/000000/golang.png',
//   },
//   {
//     title: 'Swift for iOS',
//     level: 'Intermediate',
//     rating: 4.6,
//     reviews: 3300,
//     learners: '129.5k',
//     lessons: 24,
//     image: 'https://img.icons8.com/color/48/000000/swift.png',
//   },
//   {
//     title: 'Kotlin for Android',
//     level: 'Intermediate',
//     rating: 4.5,
//     reviews: 3200,
//     learners: '125.8k',
//     lessons: 22,
//     image: 'https://img.icons8.com/color/48/000000/kotlin.png',
//   },
//   {
//     title: 'React Native',
//     level: 'Intermediate',
//     rating: 4.7,
//     reviews: 3600,
//     learners: '142.3k',
//     lessons: 26,
//     image: 'https://img.icons8.com/color/48/000000/react-native.png',
//   },
//   {
//     title: 'Flutter Development',
//     level: 'Intermediate',
//     rating: 4.8,
//     reviews: 3800,
//     learners: '148.9k',
//     lessons: 28,
//     image: 'https://img.icons8.com/color/48/000000/flutter.png',
//   },
//   {
//     title: 'Django Framework',
//     level: 'Intermediate',
//     rating: 4.5,
//     reviews: 3100,
//     learners: '122.4k',
//     lessons: 22,
//     image: 'https://img.icons8.com/color/48/000000/django.png',
//   },
//   {
//     title: 'Machine Learning Basics',
//     level: 'Advanced',
//     rating: 4.9,
//     reviews: 4200,
//     learners: '165.7k',
//     lessons: 32,
//     image: 'https://img.icons8.com/ios-filled/50/000000/machine-learning.png',
//   },
//   {
//     title: 'Data Science with Python',
//     level: 'Advanced',
//     rating: 4.8,
//     reviews: 4100,
//     learners: '160.2k',
//     lessons: 30,
//     image: 'https://img.icons8.com/ios-filled/50/000000/data-science.png',
//   },
//   {
//     title: 'Blockchain Development',
//     level: 'Advanced',
//     rating: 4.6,
//     reviews: 3500,
//     learners: '138.5k',
//     lessons: 28,
//     image: 'https://img.icons8.com/ios-filled/50/000000/blockchain-technology.png',
//   },
//   {
//     title: 'AWS Cloud Services',
//     level: 'Intermediate',
//     rating: 4.7,
//     reviews: 3900,
//     learners: '152.8k',
//     lessons: 26,
//     image: 'https://img.icons8.com/color/48/000000/amazon-web-services.png',
//   },
//   {
//     title: 'Docker & Kubernetes',
//     level: 'Advanced',
//     rating: 4.7,
//     reviews: 3700,
//     learners: '145.6k',
//     lessons: 24,
//     image: 'https://img.icons8.com/color/48/000000/docker.png',
//   },
//   {
//     title: 'GraphQL API Development',
//     level: 'Intermediate',
//     rating: 4.5,
//     reviews: 2900,
//     learners: '115.3k',
//     lessons: 20,
//     image: 'https://img.icons8.com/color/48/000000/graphql.png',
//   },
//   {
//     title: 'TensorFlow for AI',
//     level: 'Advanced',
//     rating: 4.8,
//     reviews: 3600,
//     learners: '142.9k',
//     lessons: 28,
//     image: 'https://img.icons8.com/color/48/000000/tensorflow.png',
//   },
//   {
//     title: 'Rust Programming',
//     level: 'Advanced',
//     rating: 4.6,
//     reviews: 2800,
//     learners: '112.4k',
//     lessons: 22,
//     image: 'https://img.icons8.com/color/48/000000/rust-programming-language.png',
//   },
//   {
//     title: 'Linux Administration',
//     level: 'Intermediate',
//     rating: 4.4,
//     reviews: 3200,
//     learners: '128.7k',
//     lessons: 24,
//     image: 'https://img.icons8.com/color/48/000000/linux.png',
//   },
//   {
//     title: 'Unity Game Development',
//     level: 'Intermediate',
//     rating: 4.7,
//     reviews: 3700,
//     learners: '148.2k',
//     lessons: 30,
//     image: 'https://img.icons8.com/ios-filled/50/000000/unity.png',
//   },
//   {
//     title: 'Ethical Hacking',
//     level: 'Advanced',
//     rating: 4.9,
//     reviews: 4300,
//     learners: '172.5k',
//     lessons: 34,
//     image: 'https://img.icons8.com/ios-filled/50/000000/security-checked.png',
//   },
//   {
//     title: 'DevOps Fundamentals',
//     level: 'Intermediate',
//     rating: 4.6,
//     reviews: 3400,
//     learners: '135.8k',
//     lessons: 26,
//     image: 'https://img.icons8.com/color/48/000000/devops.png',
//   },
//   {
//     title: 'Power BI for Analytics',
//     level: 'Beginner',
//     rating: 4.4,
//     reviews: 2700,
//     learners: '108.3k',
//     lessons: 18,
//     image: 'https://img.icons8.com/color/48/000000/power-bi.png',
//   },
//   {
//     title: 'UI/UX Design Basics',
//     level: 'Beginner',
//     rating: 4.8,
//     reviews: 3900,
//     learners: '156.2k',
//     lessons: 24,
//     image: 'https://img.icons8.com/color/48/000000/design.png',
//   },
//   {
//     title: 'Git & GitHub',
//     level: 'Beginner',
//     rating: 4.5,
//     reviews: 3100,
//     learners: '124.7k',
//     lessons: 16,
//     image: 'https://img.icons8.com/color/48/000000/git.png',
//   },
// ];

export default function CourseCatalog({ selectedTopic = null }) {
  // Backend-driven catalog state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [wishlistIds, setWishlistIds] = useState(new Set());

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/courses", {
          params: {
            page: 1,
            limit: 100,
            sort: "createdAt:-1",
          },
        });
        let data = response?.data?.data || [];
        
        // Filter to show only published and approved courses (created by admin)
        data = data.filter(course => 
          course.isPublished === true && course.isApproved === true
        );
        
        console.log("All Published & Approved Courses:", data);
        console.log("Courses by Topic:", {
          python: data.filter(c => c.topic === 'python' || c.tags?.some(t => t.toLowerCase().includes('python'))),
          c: data.filter(c => c.topic === 'c' || c.tags?.some(t => t.toLowerCase().includes('c programming'))),
          cpp: data.filter(c => c.topic === 'cpp' || c.tags?.some(t => t.toLowerCase().includes('c++'))),
          'machine-learning': data.filter(c => c.topic === 'machine-learning' || c.tags?.some(t => t.toLowerCase().includes('machine learning'))),
          java: data.filter(c => c.topic === 'java' || c.tags?.some(t => t.toLowerCase().includes('java'))),
          'web-development': data.filter(c => c.topic === 'web-development' || c.tags?.some(t => t.toLowerCase().includes('web development'))),
          'c-sharp': data.filter(c => c.topic === 'c-sharp' || c.tags?.some(t => t.toLowerCase().includes('c#'))),
          kotlin: data.filter(c => c.topic === 'kotlin' || c.tags?.some(t => t.toLowerCase().includes('kotlin'))),
          rust: data.filter(c => c.topic === 'rust' || c.tags?.some(t => t.toLowerCase().includes('rust'))),
          go: data.filter(c => c.topic === 'go' || c.tags?.some(t => t.toLowerCase().includes('go') || t.toLowerCase().includes('golang'))),
          php: data.filter(c => c.topic === 'php' || c.tags?.some(t => t.toLowerCase().includes('php'))),
        });
        if (isMounted) {
          setCourses(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch courses", err);
          const message =
            err?.response?.data?.message || "Failed to load courses";
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    // fetch wishlist if user is logged in (token present)
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await userProfileApi.getWishlist();
        const wishlist = res?.data?.data?.wishlist || { courses: [] };
        const ids = new Set((wishlist.courses || []).map((c) => c._id));
        if (isMounted) setWishlistIds(ids);
      } catch (err) {
        console.debug(
          "Could not load wishlist",
          err?.response?.data || err?.message
        );
      }
    };

    fetchWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Filter by topic if selected - STRICT matching
    if (selectedTopic) {
      filtered = filtered.filter((course) => {
        const courseTopic = course.topic?.toLowerCase();
        
        // STRICT: If course has a topic field, it MUST match exactly
        // This ensures courses only show in their selected topic section
        if (courseTopic) {
          // Only return true if topic matches exactly
          // Example: course with topic='machine-learning' will NOT show when selectedTopic='python'
          return courseTopic === selectedTopic;
        }
        
        // Only if course has NO topic field, then check tags and title as fallback
        const tags = Array.isArray(course.tags)
          ? course.tags.join(" ").toLowerCase()
          : "";
        const title = course.title?.toLowerCase() || "";
        
        // Topic mapping for filtering
        const topicMap = {
          'python': ['python'],
          'c': ['c programming', 'c language'],
          'cpp': ['c++', 'cpp'],
          'machine-learning': ['machine learning', 'machine-learning'],
          'java': ['java'],
          'web-development': ['web development', 'web-development'],
          'c-sharp': ['c#', 'csharp', 'c-sharp'],
          'kotlin': ['kotlin'],
          'rust': ['rust'],
          'go': ['go', 'golang'],
          'php': ['php'],
        };

        const topicKeywords = topicMap[selectedTopic] || [selectedTopic];
        
        // Only match if keyword appears as a whole word/phrase, not as substring
        const matchesTopic = topicKeywords.some(keyword => {
          const keywordLower = keyword.toLowerCase().trim();
          // Check if keyword appears in tags or title
          return (
            tags.includes(keywordLower) || 
            title.includes(keywordLower) ||
            // Also check if it's the main topic in title
            (title.startsWith(keywordLower) || title.includes(` ${keywordLower} `))
          );
        });

        return matchesTopic;
      });
      console.log(`Filtered courses for topic "${selectedTopic}":`, filtered);
    }

    // Filter by search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((course) => {
      const title = course.title?.toLowerCase() || "";
      const description = course.description?.toLowerCase() || "";
      const categoryName = course.category?.name?.toLowerCase() || "";
      const tags = Array.isArray(course.tags)
        ? course.tags.join(" ").toLowerCase()
        : "";
      return (
        title.includes(q) ||
        description.includes(q) ||
        categoryName.includes(q) ||
        tags.includes(q)
      );
    });
    }

    return filtered;
  }, [courses, searchQuery, selectedTopic]);

  const handleNextCourseContent = async (contentId, title, description) => {
    // console.log(description)
    navigate(`/coursecatalog/${contentId}`, {
      state: { title, description },
    });
  };

  const handleCourseWishlist = async (courseId) => {
    // validate ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(String(courseId || ""));
    if (!isObjectId) {
      // likely a mock course without _id
      alert("This course cannot be added to wishlist (no id).");
      return;
    }

    const currentlyWishlisted = wishlistIds.has(courseId);
    // optimistic update
    const next = new Set(wishlistIds);
    if (currentlyWishlisted) next.delete(courseId);
    else next.add(courseId);
    setWishlistIds(next);

    try {
      if (currentlyWishlisted) {
        await userProfileApi.removeCourseFromWishlist(courseId);
      } else {
        await userProfileApi.addCourseToWishlist(courseId);
      }
    } catch (err) {
      // revert on error
      setWishlistIds(wishlistIds);
      console.error(
        "Wishlist toggle failed",
        err?.response?.data || err?.message
      );
      alert(err?.response?.data?.message || "Failed to update wishlist");
    }
  };
  return (
    <div className="w-full px-4 md:px-12 pt-0 pb-4 font-sans  mt-[-50px] ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-0 ">
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">
            All Courses Catalog
          </h1>
          <p className="text-gray-600 text-base leading-snug mb-2">
            Explore our beginner-friendly courses on programming languages, data
            structures and algorithms, SQL, and web development.
          </p>
          <input
            type="text"
            placeholder="Search for courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-3/4 px-4 py-2 rounded-md bg-gray-200 focus:outline-none"
          />
        </div>
        <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-3 md:mt-0">
          <img
            src={Image}
            alt="Catalog Woman"
            className="w-40 md:w-52 lg:w-56 object-contain"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
        {/* Loading state */}
        {loading &&
          !error &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[200px] border border-gray-200 rounded-xl p-4 animate-pulse bg-gray-100"
            >
              <div className="w-full flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded" />
                <div className="w-12 h-4 bg-gray-300 rounded-full" />
              </div>
              <div className="w-3/4 h-4 bg-gray-300 rounded mb-2" />
              <div className="w-1/2 h-3 bg-gray-200 rounded mb-1" />
              <div className="w-full h-3 bg-gray-200 rounded" />
            </div>
          ))}

        {/* Error state */}
        {!loading && error && (
          <div className="col-span-full text-center text-red-600">
            <p className="mb-2">{error}</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setError(null);
                setLoading(true);
                api
                  .get("/courses", {
                    params: { page: 1, limit: 100, sort: "createdAt:-1" },
                  })
                  .then((response) => {
                    setCourses(response?.data?.data || []);
                  })
                  .catch((err) => {
                    console.error("Failed to fetch courses", err);
                    const message =
                      err?.response?.data?.message || "Failed to load courses";
                    setError(message);
                  })
                  .finally(() => setLoading(false));
              }}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredCourses.length === 0 && (
          <div className="col-span-full text-center text-gray-600">
            <p className="mb-1">No courses found.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Courses from backend */}
        {!loading &&
          !error &&
          filteredCourses.length > 0 &&
          filteredCourses.map((course) => {
            const levelRaw = course.level || "beginner";
            const levelLabel =
              typeof levelRaw === "string"
                ? levelRaw.charAt(0).toUpperCase() + levelRaw.slice(1)
                : "Beginner";

            const ratingValue =
              typeof course.rating === "number" && !Number.isNaN(course.rating)
                ? course.rating
                : 0;
            const reviewsValue =
              typeof course.reviewCount === "number"
                ? course.reviewCount
                : typeof course.reviews === "number"
                ? course.reviews
                : 0;
            const learnersValue =
              typeof course.enrollmentCount === "number"
                ? course.enrollmentCount
                : 0;
            const lessonsValue = Array.isArray(course.syllabus)
              ? course.syllabus.length
              : typeof course.lessons === "number"
              ? course.lessons
              : 0;

            return (
              <div
                key={course._id}
                className="w-[200px] h-[200px]  border-[2px] border-[#0C316E] rounded-xl flex flex-col items-start justify-start p-4 bg-white cursor-pointer"
                onClick={() =>
                  handleNextCourseContent(
                    course._id,
                    course.title,
                    course.description
                  )
                }
              >
                {/* Top: Icon + Level badge */}
                <div className="w-full flex justify-between items-start mb-3">
                  <img
                    src={
                      course.thumbnail ||
                      course.image ||
                      "https://img.icons8.com/color/48/000000/graduation-cap.png"
                    }
                    alt={course.title}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="bg-[#5F7FBD] text-white text-xs font-semibold px-2 py-[2px] rounded-full">
                    {levelLabel}
                  </span>
                </div>

                {/* Title */}
                <div className=" w-full  flex justify-between  items-center ">
                  <h2 className="text-[16px] font-bold text-[#1A2F6D] leading-tight ">
                    {course.title}
                  </h2>
                  <div className=" p-1"  onClick={(e) => e.stopPropagation()}>
                    <StyledWrapper>
                      <div
                        className="heart-container"
                        title="Wishlist"
                       
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          id={`wishlist-${course._id}`}
                          checked={wishlistIds.has(course._id)}
                          onChange={() => {
                            handleCourseWishlist(course._id);
                          }}
                        />
                        <div className="svg-container">
                          <svg
                            viewBox="0 0 24 24"
                            className="svg-outline"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            className="svg-filled"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                          </svg>
                          <svg
                            className="svg-celebrate"
                            width={100}
                            height={100}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polygon points="10,10 20,20" />
                            <polygon points="10,50 20,50" />
                            <polygon points="20,80 30,70" />
                            <polygon points="90,10 80,20" />
                            <polygon points="90,50 80,50" />
                            <polygon points="80,80 70,70" />
                          </svg>
                        </div>
                      </div>
                    </StyledWrapper>
                  </div>
                </div>

                {/* Rating Row */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className="text-[#F2B827] text-sm leading-none"
                      >
                        {i < Math.round(ratingValue) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-[14px] font-semibold text-gray-800">
                    {ratingValue.toFixed(1)}
                  </span>
                  <span className="text-[13px] text-gray-600">
                    ({reviewsValue.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center text-[13px] text-gray-800 font-medium mt-auto whitespace-nowrap">
                  <span>
                    {learnersValue > 0
                      ? `${learnersValue.toLocaleString()} Learners`
                      : "New course"}
                  </span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span>
                    {lessonsValue > 0
                      ? `${lessonsValue} Lessons`
                      : "Flexible lessons"}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      {/* ✅ Roadmap Highlights Section (Bottom 3 Cards) */}
      {/* ✅ Roadmap Highlights Section (Bottom 3 Cards) */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-center text-[#1A2F6D] mb-6">
          Not Sure Where to Start? Try These Roadmaps
        </h2>

        <div className="flex justify-center gap-6">
          {[
            {
              title: "Python with Beginner DSA",
              courses: 8,
              learners: "471.0k",
              description:
                "Learn the basics of Python and data structures. Use practical modules to boost your coding and logic.",
              color: "from-yellow-200 via-orange-300 to-pink-300",
              icon: "https://img.icons8.com/color/48/000000/python.png",
            },
            {
              title: "C++ with Beginner DSA",
              courses: 6,
              learners: "422.4k",
              description:
                "Learn core C++ programming concepts with a focus on problem-solving and data structure practice.",
              color: "from-blue-100 via-blue-300 to-blue-500",
              icon: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
            },
            {
              title: "Java with Beginner DSA",
              courses: 6,
              learners: "359.4k",
              description:
                "Master core Java programming focused on data structures and algorithms. Sharpen your skills with challenges.",
              color: "from-orange-200 via-orange-300 to-orange-400",
              icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-[5px] border border-[#9B51E0] shadow-md hover:shadow-lg transition transform scale-75"
              style={{ width: "450px", height: "250px" }}
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${item.color} h-[60px]`}></div>

              {/* Floating Icon */}
              <div className="absolute top-[45px] left-4">
                <div className="bg-white p-2 rounded-xl shadow-md w-[48px] h-[48px] flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="pt-10 px-4 text-left">
                <h3 className="font-semibold text-base text-gray-900 mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center text-[13px] text-gray-500 font-medium mb-2">
                  <span>{item.courses} Courses</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{item.learners} learners</span>
                </div>
                <p className="text-[13px] text-gray-600 leading-snug">
                  {item.description.length > 100
                    ? item.description.slice(0, 90) + "..."
                    : item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const StyledWrapper = styled.div`
  .heart-container {
    --heart-color: rgb(255, 91, 137);
    position: relative;
    width: 30px;
    height: 30px;
    transition: 0.3s;
  }

  .heart-container .checkbox {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
  }

  .heart-container .svg-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heart-container .svg-outline,
  .heart-container .svg-filled {
    fill: var(--heart-color);
    position: absolute;
  }

  .heart-container .svg-filled {
    animation: keyframes-svg-filled 1s;
    display: none;
  }

  .heart-container .svg-celebrate {
    position: absolute;
    animation: keyframes-svg-celebrate 0.5s;
    animation-fill-mode: forwards;
    display: none;
    stroke: var(--heart-color);
    fill: var(--heart-color);
    stroke-width: 2px;
  }

  .heart-container .checkbox:checked ~ .svg-container .svg-filled {
    display: block;
  }

  .heart-container .checkbox:checked ~ .svg-container .svg-celebrate {
    display: block;
  }

  @keyframes keyframes-svg-filled {
    0% {
      transform: scale(0);
    }

    25% {
      transform: scale(1.2);
    }

    50% {
      transform: scale(1);
      filter: brightness(1.5);
    }
  }

  @keyframes keyframes-svg-celebrate {
    0% {
      transform: scale(0);
    }

    50% {
      opacity: 1;
      filter: brightness(1.5);
    }

    100% {
      transform: scale(1.4);
      opacity: 0;
      display: none;
    }
  }
`;
