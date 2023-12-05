import "../App.css";
const Cell = (props: any) => {
  return (
    <div
      className="Cell"
      onClick={() => props.onClick(props.position, props.value)}
    >
      {props.value}
    </div>
  );
};

export default Cell;
