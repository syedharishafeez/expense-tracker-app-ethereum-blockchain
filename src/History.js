import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import ContextValue from "./contextValues";

function History() {
  let callContext = useContext(ContextValue);

  return (
    <div>
      <div>History</div>
      <hr />
      {callContext[0]
        ? callContext[0].amountArray.map((item, index) => {
            if (item > 0) {
              return (
                <Card
                  style={{
                    borderRight: "5px solid green",
                    marginBottom: "10px",
                  }}
                >
                  <Card.Body
                    style={{
                      background: "white",
                      padding: "5px 5px 5px 5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div> {callContext[0].textArray[index]}</div>
                    <div> +{item} </div>
                  </Card.Body>
                </Card>
              );
            } else {
              return (
                <Card
                  style={{
                    borderRight: "5px solid red",
                    marginBottom: "10px",
                  }}
                >
                  <Card.Body
                    style={{
                      background: "white",
                      padding: "5px 5px 5px 5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div> {callContext[0].textArray[index]}</div>
                    <div> {item} </div>
                  </Card.Body>
                </Card>
              );
            }
          })
        : null}

      <br />
    </div>
  );
}

export default History;
