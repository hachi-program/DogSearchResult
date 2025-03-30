import React, { useState } from 'react';

function Result({ breed }) {
  const [isVisible, setIsVisible] = useState(false);

  // 説明文をトグルする関数
  const toggleDescription = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textDecoration: "underline" }}>▼判定結果</h3>
      <h2>{breed.jp}</h2>
      <div className="d-flex" style={{ minHeight: "50px" }}>
        <button className="btn d-block h-25 btn-secondary" onClick={toggleDescription}>
          {isVisible ? "詳細を隠す" : "詳細を見る"}
        </button>
        {isVisible && <p className="mt-2">{breed.desc}</p>}
      </div>
      {breed.imageUrl ? (
        <img 
          src={process.env.PUBLIC_URL + breed.imageUrl} 
          alt={breed.jp} 
          style={{ width: "200px", height: "200px", objectFit: "cover" }} 
        />
      ) : (
        <p>画像が見つかりません</p>
      )}
    </div>
  );
}

export default Result;
