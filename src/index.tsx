import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 追加
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './components/FoundationStyles';
import TaskListContainer from './components/TaskList';
import { store } from './app/store'; // 追加

const container = document.getElementById('contents');

ReactDOM.render(
  <Provider store={store}>
    {/* テーマを適用する */}
    <ThemeProvider theme={theme}>
      {/* 全体のスタイルを適用する */}
      <GlobalStyle />
      <TaskListContainer />
    </ThemeProvider>
  </Provider>,
  container,
);
