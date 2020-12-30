import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ITask, ITaskList, IState } from './types';
import AddTask from './AddTask';
import { styled } from './FoundationStyles';
import TaskItem from './TaskItem';
import { selectTaskList } from './tasks/taskSlice';
import Loading from './Loading';

// #region styled
const MainContainer = styled.div`
  margin: 10px auto 0 auto;
  max-width: 600px;
  min-width: 300px;
  width: 80%;
`;

const Header = styled.h1`
  background-color: ${(p): string => p.theme.PRIMARY_3};
  color: ${(p): string => p.theme.FOREGROUND_REVERSE};
  font-size: 160%;
  padding: 1em;
  text-align: center;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;
// #endregion

const TaskListContainer: React.FC = () => {
  const taskList = useSelector(selectTaskList);

  // エラーメッセージ
  const errorMessage = useMemo(() => {
    if (!taskList.taskList.failedMessage) {
      return null;
    }
    <p>{taskList.taskList.failedMessage}</p>;
  }, [taskList.taskList.failedMessage]);

  return (
    <div>
      <Header>TODO</Header>
      <MainContainer>
        <AddTask />
        <TaskList>
          {taskList.taskList.tasks.map(task => (
            <TaskItem key={task.id} data={task} />
          ))}
        </TaskList>
      </MainContainer>
      <Loading shown={taskList.taskList.loading} />
    </div>
  );
};

export default TaskListContainer;
