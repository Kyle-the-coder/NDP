import { useNavigate } from "react-router-dom";
import x from "../../assets/icons/functIcons/x-button.png";
import "./card.css";
import { useEffect } from "react";

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
  editor,
  editLink,
}) {
  const navigate = useNavigate();
  const isSelected = selectedId === id; // determine if this card is selected
  const shortBlerb =
    blerb && blerb.length > 90 ? blerb.substring(0, 90) + "..." : blerb;

  useEffect(() => {
    editor && editor.setIsEdit(editLink);
  }, []);

  const handleNavigate = () => {
    // Set this card as selected
    setSelectedId(id);

    if (onNav) {
      onNav(() => {
        navigate(
          isEdit
            ? isStyle
              ? `/editStyle/${id}`
              : `/editClass/${id}`
            : isStyle
            ? `/singleStyle/${id}`
            : `/singleClass/${id}`
        );
      });
    } else {
      onNav(() => {
        navigate(
          isEdit
            ? `/editClass/${id}`
            : isStyle
            ? `/singleStyle/${id}`
            : `/singleClass/${id}`
        );
      });
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
        {png && (
          <img className={`card-img ${isSelected && "selected"}`} src={png} />
        )}
        <h1
          className={`anton-thin-font ${
            isSelected ? "yellow-text" : " blue-text"
          } letter-space`}
        >
          {title}
        </h1>
      </div>

      <div className="card-mid">
        <p className="urban-thin-font">{shortBlerb}</p>
      </div>

      <div className="card-bottom">
        {isClass ? (
          <p
            className={`urban-thin-font ${
              isSelected ? "yellow-text" : "blue-text"
            } `}
          >
            More Info {`>`}
          </p>
        ) : (
          <p
            className={`urban-thin-font ${
              isSelected ? "yellow-text" : "blue-text"
            } `}
          >
            Watch Video {`>`}
          </p>
        )}
      </div>
    </section>
  );
}
