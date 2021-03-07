import React from "react";
import Radio from "@material-ui/core/Radio";

export default function RadioButtons({ setStateGrafico, cor }) {
  const [selectedValue, setSelectedValue] = React.useState("1");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setStateGrafico(event.target.value);
  };

  return (
    <div>
      <Radio
        checked={selectedValue === "1"}
        onChange={handleChange}
        value="1"
        name="radio_1"
        inputProps={{ "aria-label": "1" }}
        style={{ color: cor }}
        size="small"
      />
      <Radio
        checked={selectedValue === "2"}
        onChange={handleChange}
        value="2"
        name="radio_2"
        inputProps={{ "aria-label": "2" }}
        style={{ color: cor }}
        size="small"
      />
    </div>
  );
}
