import React from "react";
import 'antd/dist/antd.css';
import { Card, Row, Col } from 'antd';
import MathJax from 'react-mathjax2'
const SolutionView = () => (
    <div style={{
        width: "100%"
    }}>
        <button style={{
            border: "none",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px"
        }}
            onClick={() => {
                console.log("hihi");
            }}>
            <Card
            >


                <h6>Đa thức bậc 2</h6>
                <MathJax.Context input='tex'

                    options={{

                        matchFontHeight: true,
                        displayAlign: 'left',
                        mathmlSpacing: false,
                        displayIndent: '0',
                        paddingLeft: true,
                        skipHtmlTags: [
                            '+'
                        ],
                        inlineMath: [['$', '$'], ['\\(', '\\)']],
                        processEscapes: true,
                        tex: {
                            packages: { '[+]': ['color'] },
                        }
                    }}
                >
                    <div>
                        <MathJax.Node>x^2-2x=10</MathJax.Node>
                    </div>
                </MathJax.Context>
            </Card>
        </button>

        <button style={{
            border: "none",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px"
        }}
            onClick={() => {
                console.log("hihi");
            }}>
            <Card
            >
                <h6>Đa thức trùng phương</h6>
                <MathJax.Context input='tex'

                    options={{

                        matchFontHeight: true,
                        displayAlign: 'left',
                        mathmlSpacing: false,
                        displayIndent: '0',
                        paddingLeft: true,
                        skipHtmlTags: [
                            '+'
                        ],
                        inlineMath: [['$', '$'], ['\\(', '\\)']],
                        processEscapes: true,
                        tex: {
                            packages: { '[+]': ['color'] },
                        }
                    }}
                >
                    <div>
                        <MathJax.Node>x^4-2x^2=10</MathJax.Node>
                    </div>
                </MathJax.Context>
            </Card>
        </button>
        <button style={{
            border: "none",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px"
        }}
            onClick={() => {
                console.log("hihi");
            }}>
            <Card
            >


                <h6>Bất đẳng thức bậc 2</h6>
                <MathJax.Context input='tex'

                    options={{

                        matchFontHeight: true,
                        displayAlign: 'left',
                        mathmlSpacing: false,
                        displayIndent: '0',
                        paddingLeft: true,
                        skipHtmlTags: [
                            '+'
                        ],
                        inlineMath: [['$', '$'], ['\\(', '\\)']],
                        processEscapes: true,
                        tex: {
                            packages: { '[+]': ['color'] },
                        }
                    }}
                >
                    <div>
                        <MathJax.Node>x^2-2x>10</MathJax.Node>
                    </div>
                </MathJax.Context>
            </Card>
        </button>
    </div>

);

export default SolutionView;
