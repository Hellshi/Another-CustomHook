import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const TransformTasks = useCallback((tasksObject) => {
    const loadedTasks = [];

    for (const taskKey in tasksObject) {
      loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const httpData = useHttp(
    {
      url: "https://help-467a6-default-rtdb.firebaseio.com//tasks.json",
    },
    TransformTasks
  );

  const { isLoading, error, SendRequests: fetchTasks } = httpData;

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
