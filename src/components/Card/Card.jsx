import { useNavigate } from "react-router-dom";
import x from "../../assets/icons/functIcons/x-button.png";
import "./card.css";

export function Card({
  id,
  title,
  blerb,
  png,
  isClass = false,
  pointer = false,
  isEdit = false,
  isStyle = false,
  onDelete,
  onNav, // fade-out handler
  selectedId, // currently selected card ID from parent
  setSelectedId, // setter function from parent
}) {
  const navigate = useNavigate();
  const isSelected = selectedId === id; // determine if this card is selected

  const handleNavigate = () => {
    // Set this card as selected
    setSelectedId(id);

    if (onNav) {
      onNav(() => {
        navigate(
          isEdit
            ? `/editClass/${id}`
            : isStyle
            ? `/singleStyle/${id}`
            : `/singleClass/${id}`
        );
      });
    } else {
      navigate(
        isEdit
          ? `/editClass/${id}`
          : isStyle
          ? `/singleStyle/${id}`
          : `/singleClass/${id}`
      );
    }
  };

  return (
    <section
      id={id}
      className={`card-main ${pointer ? "pointer" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={handleNavigate}
    >
      {isEdit && (
        <img
          src={x}
          className="card-x-button"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
        />
      )}

      <div className="card-top">
        {png && <img className="card-img" src={png} />}
        <h1 className="anton-thin-font blue-text letter-space">{title}</h1>
      </div>

      <div className="card-mid">
        <p className="urban-thin-font">{blerb}</p>
      </div>

      <div className="card-bottom">
        {isClass ? (
          <p className="urban-thin-font blue-text">More Info {`>`}</p>
        ) : (
          <p className="urban-thin-font blue-text">Watch Video {`>`}</p>
        )}
      </div>
    </section>
  );
}
