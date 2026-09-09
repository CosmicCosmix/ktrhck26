import "./Main.css";

const cards = [
  {
    id: 1,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
  {
    id: 2,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
  {
    id: 3,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
  {
    id: 4,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
  {
    id: 5,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
  {
    id: 6,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
  {
    id: 7,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
  {
    id: 8,
    text: "Some quick example text to build on the card content and make up the bulk of its content.",
  },
];

function Main() {
  return (
    <main className="main-page">
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-image">
              <span>Image</span>
            </div>

            <div className="card-body">
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
