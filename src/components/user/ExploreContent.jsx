import React, { useState } from "react";
import Signinlayout from "../signin/Signinlayout";
import Userlayout from './Userlayout';

const articles = [
  {
    id: 2,
    title: "Crop Rotation",
    description: "Learn how crop rotation can improve soil health and yield.",
    image: "https://i.pinimg.com/474x/5e/7c/07/5e7c07a78fb76a9066bbfa410458b849.jpg",
    fullArticle:
      "Crop rotation is the practice of growing different crops in the same field in successive seasons. It improves soil health and prevents pest build-up by interrupting pest life cycles. It also helps in balancing nutrient depletion and replenishment in the soil. By rotating crops with different nutrient needs and growth patterns, farmers can maximize the soil's capacity and productivity.",
    additionalInfo:
      "For example, rotating nitrogen-fixing crops like legumes with cereals can reduce the need for chemical fertilizers and improve crop yields over time. Crop rotation can also reduce the risk of soil erosion by maintaining soil structure and encouraging deeper root growth in different plants. It is a sustainable practice that promotes ecological balance.",
    author: "Jane Smith",
    publishedDate: "November 10, 2024",
  },
  {
    id: 3,
    title: "Precision Agriculture",
    description: "Discover the advancements in precision agriculture and its impact on efficiency and yield.",
    image: "https://i.pinimg.com/474x/0e/dc/33/0edc33dd60a19937eb3ee09dd68945d7.jpg",
    fullArticle:
      "Precision agriculture utilizes modern technology to collect and analyze data to optimize farming practices. It includes the use of GPS mapping, drones, satellite imagery, and soil sensors to monitor crop health and soil conditions. By analyzing this data, farmers can apply fertilizers, pesticides, and water only when and where they are needed, reducing waste and improving yields. This approach also helps in making data-driven decisions for crop management and forecasting.",
    additionalInfo:
      "Benefits of precision agriculture include increased crop yields, reduced labor and input costs, better resource management, and a reduction in the environmental impact. Additionally, farmers can track crop performance in real-time, enabling them to make adjustments quickly. The integration of artificial intelligence (AI) and machine learning is further enhancing the capabilities of precision agriculture.",
    author: "Alex Johnson",
    publishedDate: "November 12, 2024",
  },
  {
    id: 4,
    title: "Agroforestry Techniques",
    description: "Understand the role of agroforestry in sustainable land management.",
    image: "https://i.pinimg.com/474x/86/db/17/86db179ecee612c086e1a90ad082c910.jpg",
    fullArticle:
      "Agroforestry is the practice of integrating trees with crops and/or livestock on the same land. This approach promotes biodiversity, improves water and soil quality, and increases carbon sequestration. It also offers an opportunity for diversifying farm income by growing timber, fruit, or medicinal plants alongside crops. Agroforestry is an effective way to mitigate climate change while improving the resilience of farming systems.",
    additionalInfo:
      "In agroforestry systems, trees can act as windbreaks, protect crops from erosion, and improve water retention in the soil. These benefits lead to increased biodiversity and healthier ecosystems. Agroforestry is gaining popularity worldwide as a method to reduce the environmental impact of monoculture farming while supporting the economic well-being of farmers.",
    author: "Emily Davis",
    publishedDate: "November 13, 2024",
  },
  {
    id: 5,
    title: "Soil Conservation Practices",
    description: "Learn about soil conservation techniques that preserve the land for future generations.",
    image: "https://i.pinimg.com/474x/63/47/6b/63476bd31d320b4bfa6af87764988c9d.jpg",
    fullArticle:
      "Soil conservation involves various methods designed to protect the soil from erosion, degradation, and nutrient loss. These methods include contour farming, which follows the natural contours of the land, and strip cropping, where alternating strips of grass and crops reduce water runoff. Agroforestry and no-till farming practices also play a significant role in soil conservation by preserving soil structure and minimizing disturbance.",
    additionalInfo:
      "Proper soil conservation practices help in preventing desertification, reducing water runoff, and increasing the land's ability to retain moisture. These methods are essential for sustainable agriculture, ensuring that the land can continue to support crop production for generations to come. Additionally, healthy soil contributes to better crop yields and biodiversity.",
    author: "Michael Brown",
    publishedDate: "November 14, 2024",
  }
];

const ExploreContent = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleImageClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <Userlayout>
      <header className="user-header">
      <div className="user-overlay">
      <div className="content-section" style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        {selectedArticle ? (
          <div
            className="article-page"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "#fff",
              height: "80vh",
              overflowY: "auto",
            }}
          >
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h1 style={{ marginTop: "20px", fontSize: "2.5em", color: "black" }}>
              {selectedArticle.title}
            </h1>
            <p style={{ color: "black", fontSize: "1.2em" }}>
              By {selectedArticle.author} | {selectedArticle.publishedDate}
            </p>
            <hr />
            <p style={{ lineHeight: "1.6", marginTop: "20px", fontSize: "1.2em", color: "black" }}>
              {selectedArticle.fullArticle}
            </p>
            <p style={{ marginTop: "20px", fontStyle: "italic", color: "black", fontSize: "1.2em" }}>
              {selectedArticle.additionalInfo}
            </p>
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1.2em",
              }}
              onClick={() => setSelectedArticle(null)}
            >
              Back to Articles
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: "2.5em" }}>Explore Content</h2>
            <p style={{ fontSize: "1.5em" }}>
              Find various articles and resources related to farming practices.
            </p>
            <div
              className="content-list"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                maxHeight: "600px",
                overflowY: "auto",
              }}
            >
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="content-item"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "350px",
                    textAlign: "center",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={article.image || "https://via.placeholder.com/150"}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(article)}
                  />
                  <h3 style={{ margin: "15px 0", fontSize: "1.5em" }}>{article.title}</h3>
                  <p style={{ color: "black", fontSize: "1.1em" }}>{article.description}</p>
                  <button
                    style={{
                      marginTop: "15px",
                      padding: "12px 18px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1.2em",
                    }}
                    onClick={() => handleImageClick(article)}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
        </header>
    </Userlayout>
  );
};

export default ExploreContent;
