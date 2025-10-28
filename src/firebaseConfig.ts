// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// 1. getFirestore 임포트 추가
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwvQRAQZItqCJjKd8gHqRoxS12H7Es6mo",
  authDomain: "bridge-students-b2743.firebaseapp.com",
  projectId: "bridge-students-b2743",
  storageBucket: "bridge-students-b2743.firebasestorage.app",
  messagingSenderId: "922986276167",
  appId: "1:922986276167:web:4267d2e6466c4adafcd862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Firestore 인스턴스를 생성하고 db라는 이름으로 내보내기
export const db = getFirestore(app);
