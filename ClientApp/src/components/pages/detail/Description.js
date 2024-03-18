import "./Description.css";

const Description = ({ item }) => {
  return (
    <div className="detail-description">
      <label>DESCRIPTION</label>
      <h5>PRODUCT DESCRIPTION</h5>
      <div className={"text--gray"}>{item.long_desc}</div>
    </div>
  );
};

export default Description;
