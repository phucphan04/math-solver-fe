import React, { Component, useState, useEffect } from "react";
import Result from "../api/Result";
import MathJax from "react-mathjax2";

import { Row, Col } from "antd";
import { Layout } from "antd";
import { Divider } from "antd";

import { Modal, Button } from "antd";
import { List, Card } from "antd";
import { Typography } from 'antd';
import PropTypes from 'prop-types';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { parse } = require("equation-parser");

const style = { paddingTop: "8px", paddingBottom: "8px" };

var emails = [];

function SimpleDialog(props) {

  const { onClose, selectedValue, open, onOpen, value } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  const handleListItemClick = (value, type) => {
    console.log(value)
    console.log(type)
    if (type == "check") {
      onClose(null);
      onOpen(value);
    } else {
      onClose(value);
    }

  };
  var [testMathjax, setMathJax] = useState("x");

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" style={{
      padding: "0px 20px 0px 20px"
    }} open={open}>
      <DialogTitle id="simple-dialog-title"><div style={{
        color: "#147f8f"
      }}> Chúng tôi có thể giúp gì cho bạn ?</div>
      </DialogTitle>
      <List style={{
        padding: "0px 15px 15px 15px"
      }}>
        {value.map((email) => (

          <List.Item button onClick={() => {
            handleListItemClick(email.variable, email.type);
          }
          } key={email.variable}>
            <MathJax.Context>
              <MathJax.Node>{"\\text{" + email.detail + "}" + email.variable}</MathJax.Node>
            </MathJax.Context>
          </List.Item>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function duyetObject(obj) {


  if (obj.a == undefined || obj.b == undefined) {

    if (obj.type == "variable") {
      if (obj.name.length == 1) {
        return obj.name;
      }
      else return ""
    }
    else if (obj.type == "negative") {
      return duyetObject(obj.value);
    }
    else if (obj.type == "block") {
      return duyetObject(obj.child);
    }
    else if (obj.type == "function") {
      return duyetObject(obj.args[0]);
    }
    else if (obj.type == "parser-error") {
      var tex = obj.equation.slice(0, obj.start + 1) + obj.equation.slice(obj.end + 1, obj.equation.length);
      return duyetObject(parse(tex));
    }
    else return "";
  }
  else {
    return duyetObject(obj.a) + duyetObject(obj.b);
  }




}
const Error = Object.freeze({
  NotEqual: "notequal",
  Notvariable: "notvariable",
  MulEqual: "mulequal",

});

function parseErrorHandle(obj) {
  console.log(obj)
}


function checkSyntax(obj) {
  if (obj.type == "parser-error") {
    parseErrorHandle(obj);
    return false
  }
  else if (obj.type == "equals" ||
    obj.type == "less-than" ||
    obj.type == "greater-than" ||
    obj.type == "less-than-equals" ||
    obj.type == "greater-than-equals") {
    if (obj.a.type == "equals" ||
      obj.a.type == "less-than" ||
      obj.a.type == "greater-than" ||
      obj.a.type == "less-than-equals" ||
      obj.a.type == "greater-than-equals" ||
      obj.b.type == "equals" ||
      obj.b.type == "less-than" ||
      obj.b.type == "greater-than" ||
      obj.b.type == "less-than-equals" ||
      obj.b.type == "greater-than-equals"
    ) {
      return Error.MulEqual;
    }
    else {
      return duyetObject(obj);
    }

  }
  else {
    if (duyetObject(obj) == "") {
      return Error.Notvariable;
    } else {
      return Error.NotEqual;
    }

  }
}



function Dathuc() {
  var emails = []
  var [input_latex, setInputLatex] = useState(0);
  var [valueDialog, setvalueDialog] = useState(emails)
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [openResult, setOpenResult] = React.useState(false);
  const virtualKeyboard = {
    customVirtualKeyboardLayers: {
      number: {
        styles: "",
        rows: [
          [
            {
              class: "keycap", latex: ">"
            },
            { class: "keycap", latex: "x" },
            { class: "separator w5" },
            { class: "keycap", label: "7", key: "7" },
            { class: "keycap", label: "8", key: "8" },
            { class: "keycap", label: "9", key: "9" },
            { class: "keycap", latex: "\\div" },
            { class: "separator w5" },
            {
              class: "keycap tex small",
              label: "<span><i>x</i>&thinsp;²</span>",
              insert: "$$#@^{2}$$"
            },
            {
              class: "keycap tex small",
              latex: "{#0}^{#0}",
              insert: "$${#0}^{#0}$$"
            },

            // <li class="keycap tex" data-alt-keys="sqrt" data-insert="$$\sqrt{#0}$$" data-latex="\sqrt{#0}" data-command="[&quot;insert&quot;,&quot;$$\\sqrt{#0}$$&quot;,{&quot;focus&quot;:true,&quot;feedback&quot;:true,&quot;mode&quot;:&quot;math&quot;,&quot;format&quot;:&quot;latex&quot;,&quot;resetStyle&quot;:true}]"><span class="ML__mathlive" style="margin-left:0.06em;"><span class="ML__strut" style="height:1.05em;"></span><span class="ML__strut--bottom" style="height:1.21em;vertical-align:-0.15em;"></span><span class="ML__base"><span class="sqrt"><span class="sqrt-sign" style="top:-0.19em;"><span class="style-wrap"><span class="delimsizing size1">√</span></span></span><span class="vlist"><span><span><span><span class="ML__cmr">⬚
            // <li class="small" data-insert="$$\sqrt{#0}$$" data-latex="\sqrt{#0}"></li>
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            }
          ],
          [
            { class: "keycap tex", latex: "<" },
            { class: "keycap tex", latex: "y" },
            { class: "separator w5" },
            { class: "keycap tex", label: "4", latex: "4" },
            { class: "keycap tex", label: "5", key: "5" },
            { class: "keycap tex", label: "6", key: "6" },
            {
              class: "keycap", latex: "\\times"
            },
            { class: "keycap tex", class: "separator w5" },
            { class: "keycap small", latex: "\\begin{cases}#0 \\\\ #0\\end{cases}" },
            { class: "keycap tex small", latex: "\\frac{#0}{#0}", insert: "$$\\frac{#0}{#0}$$" },
            { class: "keycap tex small", label: "{" },
          ],
          [
            { class: "keycap tex", latex: "\\ge" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "separator w5" },
            { class: "keycap tex", label: "1", key: "1" },
            { class: "keycap tex", label: "2", key: "2" },
            { class: "keycap tex", label: "3", key: "3" },
            { class: "keycap", latex: "-" },
            { class: "separator w5" },
            { class: "keycap tex small", label: "[" },
            { class: "keycap tex small", label: "]" },
            { class: "keycap tex small", label: "}" },
          ],
          [
            { class: "keycap tex", latex: "\\le" },
            { class: "keycap tex", latex: "t" },

            { class: "separator w5" },
            { class: "keycap tex", label: "0", key: "0" },
            { class: "keycap tex", latex: "." },
            { class: "keycap tex", latex: "\\pi" },
            { class: "keycap tex", latex: "+" },
            { class: "separator w5" },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
              command: ["performWithFeedback", "moveToPreviousChar"]
            },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
              command: ["performWithFeedback", "moveToNextChar"]
            },
            {
              class: "action font-glyph bottom right",
              label: "&#x232b;",
              command: ["performWithFeedback", "deleteBackward"]
            }
          ]
        ]
      },
      function1: {
        styles: "",
        rows: [
          [

            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sin{#0}",
              insert: "$$\\sin{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sin^{#0}{#0}",
              insert: "$$\\sin^{#0}{#0}$$"
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\log{#0}",
              insert: "$$\\log{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            }
          ],
          [
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\cos{#0}",
              insert: "$$\\cos{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\cos^{#0}{#0}",
              insert: "$$\\cos^{#0}{#0}$$"
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\ln{#0}",
              insert: "$$\\ln{#0}$$"
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\mathrm{e}^{#0}",
              insert: "$$\\mathrm{e}^{#0}$$"
            },

            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt[#0]{#0}",
              insert: "$$\\sqrt[#0]{#0}$$"
            },
            { class: "keycap tex", latex: "b" },
            { class: "keycap tex", latex: "b" },
            { class: "keycap tex", latex: "b" },
          ],
          [
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\tan{#0}",
              insert: "$$\\tan{#0}$$"
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\tan^{#0}{#0}",
              insert: "$$\\tan^{#0}{#0}$$"
            },

            {
              class: "keycap tex small",
              latex: "\\log_{#0}(#0)",
              insert: "$$\\log_{ cơ số }(biểu thức)$$"
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt[#0]{#0}",
              insert: "$$\\sqrt[#0]{#0}$$"
            },
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" }
          ],
          [
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "keycap tex", label: "<i>c</i>" },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
              command: ["performWithFeedback", "moveToPreviousChar"]
            },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
              command: ["performWithFeedback", "moveToNextChar"]
            },
            {
              class: "action font-glyph bottom right",
              label: "&#x232b;",
              command: ["performWithFeedback", "deleteBackward"]
            }
          ]
        ]
      }
    },
    customVirtualKeyboards: {
      number: {
        label: "123",
        tooltip: "number keyboard",
        layer: "number"
      },
      function1: {
        label: "f()",
        tooltip: "function keyboard",
        layer: "function1"
      }
    },
    virtualKeyboards: "number function1 functions"

  };

  useEffect(() => {
    const mf = document.getElementById("formula");
    mf.setOptions({
      ...virtualKeyboard
    });
  });


  // const [loading, setLoading] = React.useState(false);

  const listExample = ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"];
  const listPlot = ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"];
  const listdathuc = [
    {
      name: "Phương trình bậc 1",
      list: ["x=3=1", "2x+7=0"],
    },
    {
      name: "Phương trình bậc 2",
      list: ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"],
    },
    {
      name: "Phương trình bậc 4 trùng phương",
      list: ["x^4-2x^2+1=0", "3x^4-5x^2-1=0"],
    },
  ];

  const handleClickOpen = (test) => {
    emails = [];


    //NOTE
    if (test != "" && parse(test).type == "parser-error") {


      var objError = parse(test);

      if (objError.equation.indexOf("begin") != -1) {
        console.log(objError.equation);
        objError.equation = objError.equation.replace(/begin/g, "")
        objError.equation = objError.equation.replace(/{cases}/g, "")
        objError.equation = objError.equation.replace(/end/g, "")

        console.log(objError.equation);
        console.log(objError.equation.indexOf("\\\\"))

        var sub1 = objError.equation.substr(0, objError.equation.indexOf("\\\\"));
        var sub2 = objError.equation.substr(objError.equation.indexOf("\\\\") + 1, objError.equation.length);
        sub1 = sub1.replace(/\\/g, "");
        sub2 = sub2.replace(/\\/g, "")
        if (checkSyntax(parse(sub1)) == checkSyntax(parse(sub2)) &&
          checkSyntax(parse(sub1)) != "notequal" &&
          checkSyntax(parse(sub1)) != "mulequal" &&
          checkSyntax(parse(sub1)) != "notvariable"
        ) {
          emails.push({ variable: "", detail: "Giải hệ phương trình" });
        }
        else {
          emails.push({ variable: "", detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn" });
        }
      }
      else if (objError.equation.indexOf("sin") != -1) {
        console.log(objError.equation)
        objError.equation = objError.equation.replace(/\\mleft/g, "")
        objError.equation = objError.equation.replace(/\\mright/g, "")
        var hihi = objError.equation;
        objError.equation = objError.equation.replace(/\\sin/g, "")
        objError.equation = objError.equation.replace(/\\cos/g, "")
        objError.equation = objError.equation.replace(/\^/g, "")
        if (checkSyntax(parse(objError.equation)).length != 1 &&
          checkSyntax(parse(objError.equation)) != "notequal" &&
          checkSyntax(parse(objError.equation)) != "mulequal" &&
          checkSyntax(parse(objError.equation)) != "notvariable"
        ) {
          emails.push({ variable: hihi, detail: "Giải phương trình lượng giác" });
        } else {
          emails.push({ variable: "", detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn" });
        }
      }

    }

    else if (test != "" && checkSyntax(parse(test)) != false) {

      var test1 = checkSyntax(parse(test));

      if (test1 == "notequal") {
        var test3 = duyetObject(parse(test)).split("");
        const uniqueSet1 = new Set(test3);
        const backToArray1 = [...uniqueSet1];
        console.log(backToArray1)
        if (backToArray1.length == 1) {
          emails.push({ variable: test, detail: "Khảo sát và vẽ đồ thị hàm số " });
          emails.push({ variable: test + "=0", detail: "Giải phương trình ", type: "check" })
          emails.push({ variable: test + ">0", detail: "Giải bất phương trình " })
          emails.push({ variable: test + "<0", detail: "Giải bất phương trình " })
        } else {
          emails.push({ variable: test, detail: "Khảo sát và vẽ đồ thị hàm số " });
          emails.push({ variable: test + "=0", detail: "Giải phương trình ", type: "check" })
        }

      }
      else if (test1 == "mulequal") {
        emails.push({ variable: "", detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn" });
      }
      else if (test1 == "notvariable") {
        emails.push({ variable: test, detail: "Tính kết quả phép tính" });
      }
      else {
        var test2 = test1.split("");
        const uniqueSet = new Set(test2);
        const backToArray = [...uniqueSet];
        console.log(backToArray)
        backToArray.forEach(function (item, index, array) {

          emails.push({ variable: item, detail: "Giải phương trình theo biến " });

        });
        console.log(emails)
      }
    }
    else {
      emails.push({ variable: "", detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn" });
    }
    setvalueDialog(emails)
    setOpen(true);
  };

  const handleClose = (value) => {
    if (value == null) {
      console.log("test");
      setOpen(false);

    }
    else {
      setOpen(false);
      setSelectedValue(value);
      setInputLatex(document.getElementById('formula').getValue("latex"));
      setOpenResult(true);
    }
  };
  return (
    <>
      <Row style={{ paddingTop: "16px", paddingBottom: "16px" }}>
        <Col span={21}>
          <math-field
            virtual-keyboard-mode="onfocus"
            smart-mode={true}
            smart-fence={true}
            virtual-keyboard-theme="apple"
            smart-superscript={true}
            use-shared-virtual-keyboard={true}

            id="formula"
            style={{
              width: "100%",
              backgroundColor: "#c0cacc",
              height: "80px",
              borderRadius: "10px",
              color: "#000000",
              fontSize: "20px",
            }}
          ></math-field>
        </Col>
        <Col span={3}>
          <Col span={22} offset={1}>
            <Button
              type="primary"
              block
              style={{ height: "40px" }}
              onClick={() => {

                var testASC = document.getElementById('formula').getValue("ASCIIMath")
                var inputLatex = document.getElementById('formula').getValue("latex")

                if (inputLatex != "") {
                  console.log(inputLatex)
                  handleClickOpen(inputLatex);

                } else if (testASC != "") {
                  console.log(testASC)
                  handleClickOpen(testASC);
                }

              }}
            >
              Submit
            </Button>
            <SimpleDialog
              value={valueDialog}
              selectedValue={selectedValue}
              open={open}
              onOpen={handleClickOpen}
              onClose={handleClose}
            />
          </Col>
        </Col>
      </Row>
      <Row gutter={16}>
        {!openResult && (
          <>
            <Card style={{ minWidth: "100%" }}>
              <Col span={24}>
                {/* <Card style={{border: "2px solid #000000"}}
                title="Một số bài toán giải đa thức cơ bản"
                // bodyStyle={{backgroundColor: '#ececec' }}
                style={{ minHeight: "100%"}}
              > */}
                <Divider orientation="left" plain>
                  <Title level={3}>Một số bài toán giải đa thức cơ bản</Title>
                </Divider>
                <Row gutter={16}>
                  {listdathuc.map((item) => {
                    return (
                      <Col span={12} style={style}>
                        <Card
                          bordered
                          title={item.name}
                          style={{
                            minHeight: "100%",
                            border: "2px solid #ececec",
                          }}
                        >
                          <List>
                            {item.list.map((dathuc) => {
                              return (
                                <List.Item>
                                  <MathJax.Context>
                                    <MathJax.Node>{dathuc}</MathJax.Node>
                                  </MathJax.Context>
                                </List.Item>
                              );
                            })}
                          </List>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
                {/* </Card> */}
              </Col>
              <Col span={24}>
                {/* <Card title="Đồ thị"> */}
                <Divider orientation="left" plain>
                  <Title level={3}>Vẽ đồ thị</Title>
                </Divider>
                <Row gutter={8}>
                  {/* <List style={{paddingLeft:"16px"}}> */}
                  {listPlot.map((item) => {
                    return (
                      // <List.Item style={{minWidth:"100%"}}>
                      <Col span={8}>
                        <Card style={{ border: "2px solid #ececec" }}>
                          <MathJax.Context>
                            <MathJax.Node>{item}</MathJax.Node>
                          </MathJax.Context>
                        </Card>
                      </Col>
                      // {/* </List.Item> */}
                    );
                  })}
                </Row>
                {/* </List> */}
              </Col>
            </Card>
          </>
        )}
        {openResult && (
          <>
            <Col span={18}>
              <Result tex={input_latex} var={selectedValue}></Result>
            </Col>
            <Col span={6}>
              <Row style={{ minHeight: "100%" }}>
                <Col span={24}>
                  <Card title="Vẽ đồ thị">
                    <MathJax.Context>
                      <MathJax.Node>{input_latex}</MathJax.Node>
                    </MathJax.Context>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="Bài tập tương tự">
                    <List>
                      {listExample.map((item) => {
                        return (
                          <List.Item>
                            <MathJax.Context>
                              <MathJax.Node>{item}</MathJax.Node>
                            </MathJax.Context>
                          </List.Item>
                        );
                      })}
                    </List>
                  </Card>
                </Col>
              </Row>
            </Col>
          </>
        )}
        <Col span={8}>{/* <ExampleView></ExampleView> */}</Col>
      </Row>
    </>
  );
}

export default class BoardUser extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Layout>
        <Content>
          <Dathuc></Dathuc>
        </Content>
      </Layout>
    );
  }
}