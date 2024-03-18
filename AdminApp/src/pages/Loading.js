import "./Loading.css";

const Loading = () => {
  // Render component
  return (
    <div className="loading">
      <div className="spinner-border" role="status"></div>;
      <div className="loading-backdrop"></div>
    </div>
  );
};

export default Loading;
