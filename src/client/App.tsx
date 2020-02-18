import React, { FC } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// import { Task } from "./models/task";
import HomePage from "./containers/HomePage/HomePage";
import RoomHome from "./containers/RoomHome/RoomHome";

const App: FC<any> = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:room[:playerName]" exact component={RoomHome} />
        {/* <Route path="/game" exact component={Game} /> */}
      </Switch>
    </div>
  );
};

export default withRouter(App);
