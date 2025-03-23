import React, { useEffect, useState } from 'react';

function Result({ breed }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);

    // 説明文をトグルする関数
    const toggleDescription = () => {
      setIsVisible(!isVisible);
    };

  useEffect(() => {
    if (!breed) return;
    // DOG APIから画像をランダムに取得する。
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed.en}/images/random`);
        const data = await response.json();
        setImageUrl(data.message);
      } catch (error) {
        console.error("画像取得に失敗しました", error);
      }
    };

    fetchImage();
  }, [breed]);

  return (
    <div className="container mt-4">
      <h3 style={{ textDecoration: "underline" }}>▼判定結果</h3>
      <h2>{breed.jp}</h2>
       {/* breed.desc を表示/非表示 */}
       <div className="d-flex" style={{ minHeight: "50px" }}>
        <button className="btn d-block h-25 btn-secondary" onClick={toggleDescription}>
          {isVisible ? '詳細を隠す' : '詳細を見る'}
        </button> 
        {isVisible && <p className="mt-2">{breed.desc}</p>} {/* isVisible が true の場合にのみ表示 */}
      </div>
      {imageUrl ? <img src={imageUrl} alt={breed.jp} className="img-fluid mt-2" /> : <p>画像を取得中...</p>}
    </div>
  );
}

export default Result;
