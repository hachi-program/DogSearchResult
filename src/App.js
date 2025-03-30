import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import Question from './Question.js';
import Result from './Result.js';

function App() {
  const [answers, setAnswers] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedMapping, setBreedMapping] = useState({});

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

  const questions = {
    question: "立ち耳ですか？",
    options: {
      "はい": {
        question: "胴長短足ですか？",
        options: {
          "はい": { breed: "corgy" },
          "いいえ": {
            question: "大型犬ですか？",
            options: {
              "はい": {
                question: "日本犬っぽいですか？",
                options: {
                  "はい": { breed: "akita" },
                  "いいえ": { breed: "Shepherd" }
                }
              },
              "いいえ": {
                question: "毛は短いですか？",
                options: {
                  "はい": {
                    question: "小型犬ですか？",
                    options: {
                      "はい": { breed: "frenchB" },
                      "いいえ": { breed: "shiba" }
                    }
                  },
                  "いいえ": {
                    question: "耳が大きいですか？",
                    options: {
                      "はい": { breed: "papiyon" },
                      "いいえ": { breed: "Yterrier" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "いいえ": {
        question: "胴長短足ですか？",
        options: {
          "はい": { breed: "fund" },
          "いいえ": {
            question: "毛並みはカールしていますか？",
            options: {
              "はい": {
                question: "小型犬ですか？",
                options: {
                  "はい": { breed: "poodle" },
                  "いいえ": { breed: "stapu" }
                }
              },
              "いいえ": {
                question: "毛が短いですか？",
                options: {
                  "はい": {
                    question: "しっぽはカールしていますか？",
                    options: {
                      "はい": { breed: "pag" },
                      "いいえ": { breed: "burdog" }
                    }
                  },
                  "いいえ": {
                    question: "毛の色は白いですか？",
                    options: {
                      "はい": { breed: "marcheese" },
                      "いいえ": {
                        question: "眉毛やひげは長いですか？",
                        options: {
                          "はい": { breed: "shuna" },
                          "いいえ": {
                            question: "大型犬ですか？",
                            options: {
                              "はい": { breed: "GoldR" },
                              "いいえ": { breed: "Szoo" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const getCurrentQuestion = (questions, answers) => {
    let node = questions;
    for (const answer of answers) {
      if (node.options && node.options[answer]) {
        node = node.options[answer];
      } else {
        return null;
      }
    }
    return node;
  };

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    
    const currentNode = getCurrentQuestion(questions, updatedAnswers);
    if (currentNode && currentNode.breed) {
      setSelectedBreed({ en: currentNode.breed, ...breedMapping[currentNode.breed] });
    }
  };

  const retryDiagnosis = () => {
    setAnswers([]);
    setSelectedBreed(null);
  };

  const currentNode = getCurrentQuestion(questions, answers);

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
        currentNode && currentNode.question ? (
          <Question
            question={currentNode.question}
            options={Object.keys(currentNode.options)}
            onAnswer={handleAnswer}
          />
        ) : (
          <p>診断エラー</p>
        )
      )}
    </div>
  );
}

export default App;
