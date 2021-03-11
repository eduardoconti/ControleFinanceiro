import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

export default function Menu(obj) {
  if (!obj.lenght === 0) {
    return obj.map((obj, i) => {
      return (
        <MenuItem key={i} value={obj.id}>
          {" "}
          {obj.descricao}
        </MenuItem>
      );
    });
  }
}
