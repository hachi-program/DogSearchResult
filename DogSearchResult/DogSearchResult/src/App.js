import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import Question from './Question.js';
import Result from './Result.js';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedMapping, setBreedMapping] = useState({});
// firebaseからデータを取得する
  useEffect(() => {
    const fetchBreeds = async () => {
      const querySnapshot = await getDocs(collection(db, "breeds"));
      const breedsData = {};
      querySnapshot.forEach(doc => {
        breedsData[doc.id] = doc.data();
      });
      setBreedMapping(breedsData);
    };

    fetchBreeds();
  }, []);

  const questions = [
    { question: "耳は立っていますか？", options: ["はい", "いいえ"] },
    { question: "胴は長いですか？", options: ["はい", "いいえ"] },
    { question: "足は長いですか？", options: ["はい", "いいえ"] }
  ];

  const determineBreed = (answers) => {
    const conditions = {
      "はい-はい-はい": "germanshepherd",
      "はい-はい-いいえ": "corgi",
      "はい-いいえ-はい": "doberman",
      "いいえ-はい-はい": "dachshund",
      "いいえ-いいえ-はい": "labrador",
      "いいえ-いいえ-いいえ": "pug"
    };

    const key = answers.join("-");
    const breedKey = conditions[key] || "pug";
    return { en: breedKey, ...breedMapping[breedKey] };
  };
// 回答内容を配列に格納する
  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const breed = determineBreed(updatedAnswers);
      setSelectedBreed(breed);
    }
  };

    // もう一度診断をする（状態をリセット）
    const retryDiagnosis = () => {
      setCurrentQuestion(0);
      setAnswers([]);
      setSelectedBreed(null);
    };

  return (
    <div className="container">
      <h1 className="mt-4 text-primary">あの犬の種類は？🐕</h1>
      {selectedBreed ? (
        <div>
        <Result breed={selectedBreed} />
        <button className="btn btn-danger mt-3" onClick={retryDiagnosis}>
          もう一度診断する
        </button>
      </div>
      ) : (
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;
