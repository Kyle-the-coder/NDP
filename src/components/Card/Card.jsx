import { useNavigate } from "react-router-dom";
import x from "../../assets/icons/functIcons/x-button.png";
import "./card.css";

export function Card({
  title,
  blerb,
  png,
  link,
  isClass = false,
  pointer = false,
  isEdit = false,
  onDelete,
  id,
}) {
  const navigate = useNavigate();
  return (
    <section
      className={`card-main ${pointer && "pointer"}`}
      onClick={() =>
        isEdit ? navigate(`/editClass/${id}`) : navigate(`/singleclass/${id}`)
      }
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
        <a href={link}>
          {isClass ? (
            <>
              <p className="urban-thin-font blue-text">More Info {`>`}</p>
            </>
          ) : (
            <>
              <p className="urban-thin-font blue-text">Watch Video {`>`}</p>
            </>
          )}
        </a>
      </div>
    </section>
  );
}
