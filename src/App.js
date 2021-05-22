import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import General1 from "./components/general-1.component"
import General2 from "./components/general-2.component";
import General3 from "./components/general-3.component";
import MathSolver from "./components/breadcrumb.component";
import { withRouter } from "react-router";

import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';

import { HomeOutlined, FunctionOutlined, EditOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Content, Sider, Header, Footer } = Layout;
const { SubMenu } = Menu;

const keyMap = {
  "/login": "login",
  "/": "home",
  "/profile": "profile",
  "/polynomial": "polynomial",
  "/graph": "graph",
  "/problem": "problem",
  "/define": "define",
  "/monitor": "monitor"
}
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      collapsed: false,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      current: undefined,

    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.role.includes("moderator") || user.role.includes("admin"),
        showAdminBoard: user.role.includes("admin"),
      });
    }
  }

  logOut() {
    AuthService.logout().then(this.setState({ current: "home" }));
  }



  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, current } = this.state;
    const { pathname } = this.props.location;
    return (

      <Layout className="layout">
        <Menu onClick={this.handleClick} selectedKeys={keyMap[pathname]} mode="horizontal" style={{ padding: "0 150px" }}>
          <Menu.Item key="home">
            <Link to={"/"}>
              MathSolver
            </Link>
          </Menu.Item>
          {/* <Menu.Item>
              <Link to={"/solve"}>
                Giải cơ bản
              </Link>
            </Menu.Item> */}
          <SubMenu key="solve" title="Giải cơ bản">
            <Menu.Item key="polynomial">
              <Link to={"/polynomial"}>
                Đa thức
              </Link>
            </Menu.Item>
            <Menu.Item key="graph">
              <Link to={"/graph"}>
                Đồ thị
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="problem">
            <Link to={"/problem"}>
              Giải tổng hợp
            </Link>
          </Menu.Item>
          {showModeratorBoard && (
            <Menu.Item key="define">
              <Link to={"/define"}>
                Định nghĩa bài toán
              </Link>
            </Menu.Item>
          )}
          {showAdminBoard && (
            <Menu.Item key="monitor">
              <Link to={"/monitor"}>
                Quản lý
              </Link>
            </Menu.Item>
          )}
          {currentUser ? (
            <Menu.Item style={{ float: 'right' }}>
              <a href="/" onClick={this.logOut}></a>
              Đăng xuất
            </Menu.Item>
          ) : (
            <Menu.Item key="login" style={{ float: 'right' }}>
              <Link to={"/login"}>
                Đăng nhập
              </Link>
            </Menu.Item>
          )}
          {currentUser && (
            <Menu.Item key="profile" style={{ float: 'right' }}>
              <Link to={"/profile"}>
                {currentUser.email}
              </Link>

            </Menu.Item>
          )}
        </Menu>

        <Layout style={{ padding: "0 150px" }}>
          <MathSolver style={{ margin: "16px" }}></MathSolver>
          {pathname == "/login" ?
            <Row style={{}}>
              <Col span={8}></Col>
              <Col span={8}>
                <Switch>
                  <Route exact path="/login" component={Login} />
                </Switch>
              </Col>
              <Col span={8}></Col>

            </Row>
            :
            <Content style={{ background: "#fff", padding: "16px" }}>
              <Switch>
                <Route exact path={"/"} component={Home} />
                {/* <Route exact path="/login" component={Login} /> */}
                <Route exact path="/profile" component={Profile} />
                {/* <Route path="/solve" component={General1} /> */}
                <Route path="/solve" component={BoardUser} />
                <Route path="/polynomial" component={BoardUser} />
                {/* <Route path="/polynomial" component={General1} /> */}
                {/* <Route path="/polynomial" component={General2}/> */}
                <Route path="/solve/graph" component={General2} />
                <Route path="/problem" component={General3} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
                {/* <Route path="*" component={Home} /> */}
              </Switch>
            </Content>
          }

        </Layout>
        <Footer style={{ textAlign: 'center' }}>Math</Footer>
      </Layout>
    );
  }
}

export default withRouter(App);
