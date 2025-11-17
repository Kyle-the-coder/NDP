// Card.jsx
import { useNavigate } from "react-router-dom";
import x from "../../assets/icons/functIcons/x-button.png";
import "./card.css";

export function Card({
  title,
  blerb,
  png,
  isClass = false,
  pointer = false,
  isEdit = false,
  onDelete,
  id,
  onNav, // 👈 added
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onNav) {
      onNav(() => {
        navigate(isEdit ? `/editClass/${id}` : `/singleClass/${id}`);
      });
    } else {
      navigate(isEdit ? `/editClass/${id}` : `/singleClass/${id}`);
    }
  };

  return (
    <section
      className={`card-main ${pointer && "pointer"}`}
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
