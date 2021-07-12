import Highlight from "react-highlight";
import Ansi from "ansi-to-react";

var AU = require("ansi_up");
var ansi_up = new AU.default();
  

export default function Output(props) {
  return props.code.map((val, key) => (
    <div key={key} dangerouslySetInnerHTML={{__html: ansi_up.ansi_to_html(props.code[key])}}></div>
  ));
}

// <Highlight className="bash" innerHTML key={key}>
// </Highlight>
