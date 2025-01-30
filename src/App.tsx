/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
// import React from 'react';
// import './App.scss';

// function getRandomName(): string {
//   const value = Date.now().toString().slice(-4);

//   return `Clock-${value}`;
// }

// export const App: React.FC = () => {
//   const today = new Date();
//   let clockName = 'Clock-0';

//   // This code starts a timer
//   const timerId = window.setInterval(() => {
//     clockName = getRandomName();
//   }, 3300);

//   // this code stops the timer
//   window.clearInterval(timerId);

//   return (
//     <div className="App">
//       <h1>React clock</h1>

//       <div className="Clock">
//         <strong className="Clock__name">{clockName}</strong>

//         {' time is '}

//         <span className="Clock__time">
//           {today.toUTCString().slice(-12, -4)}
//         </span>
//       </div>
//     </div>
//   );
// };
import React, { Component } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);
  return `Clock-${value}`;
}

interface ClockProps {
  name: string;
}

class Clock extends Component<ClockProps> {
  private timerId: number | null = null;

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.forceUpdate();
      const currentTime = new Date().toUTCString().slice(-12, -4);
      // eslint-disable-next-line no-console
      console.log('Current time:', currentTime);
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (prevProps.name !== this.props.name) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  render() {
    const { name } = this.props;
    const currentTime = new Date().toUTCString().slice(-12, -4);

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>
        {' time is '}
        <span className="Clock__time">{currentTime}</span>
      </div>
    );
  }
}


interface AppState {
  hasClock: boolean;
  clockName: string;
}

export class App extends Component<{}, AppState> {
  private nameChangeTimerId: number | null = null;

  state: AppState = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextMenu);
    document.addEventListener('click', this.handleClick);

    this.nameChangeTimerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextMenu);
    document.removeEventListener('click', this.handleClick);

    if (this.nameChangeTimerId) {
      clearInterval(this.nameChangeTimerId);
    }
  }

  handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleClick = () => {
    this.setState({ hasClock: true });
  };

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>
        {hasClock && <Clock name={clockName} />}
      </div>
    );
  }
}
