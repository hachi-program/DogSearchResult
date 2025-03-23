import { db } from "./firebase.js"; // `.js` を明示
import { collection, setDoc, doc } from "firebase/firestore";

const breedData = {
  germanshepherd: {
    jp: "ジャーマン・シェパード・ドッグ",
    desc: "警察犬としても活躍する知的で勇敢な犬種です。"
  },
  corgi: {
    jp: "ウェルシュ・コーギー・ペンブローク",
    desc: "短い足と長い胴が特徴で、とても活発な犬種です。"
  },
  doberman: {
    jp: "ドーベルマン",
    desc: "俊敏で警戒心が強く、優れた番犬や警察犬になります。"
  },
  labrador: {
    jp: "ラブラドール・レトリバー",
    desc: "非常に賢く、家庭犬や盲導犬としても人気があります。"
  },
  dachshund: {
    jp: "ダックスフンド",
    desc: "胴が長く短足で、猟犬としても活躍する犬種です。"
  },
  pug: {
    jp: "パグ",
    desc: "小さく愛らしい見た目で、ユーモラスな性格の犬種です。"
  }
};

// Firestore にデータを一括追加
const addBreedsToFirestore = async () => {
  try {
    for (const [key, value] of Object.entries(breedData)) {
      await setDoc(doc(collection(db, "breeds"), key), value);
      console.log(`追加成功: ${key}`);
    }
    console.log("全ての犬種データを追加しました！");
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
};

addBreedsToFirestore();
