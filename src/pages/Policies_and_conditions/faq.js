import React from "react";
import { Helmet } from "react-helmet";
import { Collapse } from "antd";

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

const head = () => {
  return (
    <Helmet bodyAttributes={{ class: "faqPage" }}>
      <title>FAQ - Level Up Space</title>
    </Helmet>
  );
};

const FAQ = () => (
  <section className="container mt-5 pl-5 pr-5">
    {head()}
    <Collapse defaultActiveKey={["1"]} onChange={callback}>
      <Panel header="This is panel header 1" key="1">
        <p>R1</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>R2</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>R3</p>
      </Panel>
    </Collapse>
    ,
  </section>
);

export default FAQ;
