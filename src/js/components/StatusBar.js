import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

class StatusBar extends Component {
  constructor() {
    super();
    this.state = {
      hovered: null,
      pressed: null
    };
  }

  componentDidCatch(error, info) {
    console.error(error);
    console.warn(info);
  }

  onHover(id) {
    this.setState({hovered: id});
  }

  onPress(tab) {
    switch (tab) {
      case 1:
        this.setState({ pressed: tab });
        this.props.actions.goToStep(0);
        break;
      case 2:
        this.setState({ pressed: tab });
        this.props.actions.goToStep(1);
        break;
      case 3:
        this.setState({ pressed: tab });
        this.props.actions.goToStep(2);
        break;
      case 4:
        this.setState({ pressed: tab });
        this.props.actions.goToStep(3);
        break;
      default:
        this.setState({ pressed: 0 });
        this.onHover(0);
        break;
    }
  }

  render() {
    const styles = {
      container: {
        backgroundColor: 'var(--background-color-dark)',
        overflow: 'hidden',
        width: '100%',
        height: '30px'
      },
      inner: {
        overflow: 'hidden',
        height: '100%'
      },
      home: {
        width: 'auto',
        float: 'left',
        color: 'var(--reverse-color)',
        paddingLeft: 30,
        paddingRight: 30,
        minWidth: '200px',
        border: 0,
        outline: 'none',
        backgroundColor: 'var(--background-color-dark)',
        height: '100%'
      },
      homeActive: {
        width: 'auto',
        float: 'left',
        color: 'var(--reverse-color)',
        paddingLeft: 30,
        paddingRight: 30,
        minWidth: '200px',
        border: 0,
        outline: 'none',
        backgroundColor: 'var(--accent-color)',
        height: '100%'
      },
      child: {
        width: 'auto',
        float: 'left',
        color: 'var(--reverse-color)',
        paddingLeft: 30,
        paddingRight: 30,
        minWidth: '200px',
        border: 0,
        outline: 'none',
        backgroundColor: 'var(--background-color-dark)',
        height: '100%'
      },
      childActive: {
        width: 'auto',
        float: 'left',
        color: 'var(--reverse-color)',
        paddingLeft: 30,
        paddingRight: 30,
        minWidth: '200px',
        border: 0,
        outline: 'none',
        backgroundColor: 'var(--accent-color)',
        height: '100%'
      },
      childRight: {
        width: 'auto',
        float: 'left',
        paddingRight: 10
      }
    };
    return (
      <div style={styles.container}>
        <div style={styles.inner}>
          <button onMouseOver={()=>this.onHover(1)} onMouseDown={() => this.onPress(1)} onMouseUp={() => this.onPress(0)} onMouseOut={() => this.onPress(0)} style={this.state.pressed != 1  && this.state.hovered != 1 ? styles.home : styles.homeActive}>
            <Glyphicon glyph={"home"} style={{ fontSize: 15, paddingRight: 8, paddingTop: 3 }} />
            <span id="menu-text-root">Home</span>
          </button>

          <button onMouseOver={()=>this.onHover(2)} onMouseDown={() => this.onPress(2)} onMouseUp={() => this.onPress(0)} onMouseOut={() => this.onPress(0)} style={this.state.pressed != 2 && this.state.hovered != 2 ? styles.child : styles.childActive}>
            <Glyphicon glyph={"user"} style={{ fontSize: 15, paddingRight: 5, paddingTop: 3 }} />
            <span id="menu-text-root">User: {this.props.currentUser}</span>
          </button>

          <button onMouseOver={()=>this.onHover(3)} onMouseDown={() => this.onPress(3)} onMouseUp={() => this.onPress(0)} onMouseOut={() => this.onPress(0)} style={this.state.pressed != 3 && this.state.hovered  != 3 ? styles.child : styles.childActive}>
            <Glyphicon glyph={"folder-open"} style={{ fontSize: 15, paddingRight: 8, paddingTop: 3 }} />
            <span id="menu-text-root">Project: {this.props.projectName}</span>
          </button>

          <button onMouseOver={()=>this.onHover(4)} onMouseDown={() => this.onPress(4)} onMouseUp={() => this.onPress(0)} onMouseOut={() => this.onPress(0)} style={this.state.pressed != 4 && this.state.hovered != 4 ? styles.child : styles.childActive}>
            <Glyphicon glyph={"wrench"} style={{ fontSize: 15, paddingTop: 3, paddingRight: 5, float: 'left' }} />
            <div style={{ float: 'left' }}>
              <span id="menu-text-root">Tool: {this.props.currentCheckNamespace}</span>
            </div>
          </button>

        </div>
      </div>
    );
  }
}

StatusBar.propTypes = {
  actions: PropsTypes.object.isRequired,
  currentUser: PropsTypes.string.isRequired,
  projectName: PropsTypes.string.isRequired,
  currentCheckNamespace: PropsTypes.string.isRequired,
  homeScreenReducer: PropsTypes.object.isRequired
};



export default StatusBar;
