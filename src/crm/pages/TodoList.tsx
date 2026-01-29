import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

const priorityColors = {
  low: "success",
  medium: "warning",
  high: "error",
} as const;

export default function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([
    {
      id: 1,
      text: "Review Q4 sales report",
      completed: false,
      priority: "high",
      createdAt: new Date(),
    },
    {
      id: 2,
      text: "Follow up with new leads",
      completed: true,
      priority: "medium",
      createdAt: new Date(),
    },
    {
      id: 3,
      text: "Update customer database",
      completed: false,
      priority: "low",
      createdAt: new Date(),
    },
  ]);
  const [newTodoText, setNewTodoText] = React.useState("");
  const [newTodoPriority, setNewTodoPriority] = React.useState<
    "low" | "medium" | "high"
  >("medium");
  const [filter, setFilter] = React.useState<"all" | "active" | "completed">(
    "all"
  );

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
        priority: newTodoPriority,
        createdAt: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setNewTodoText("");
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Todo List
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Manage your tasks and stay organized
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Main Todo List */}
        <Paper
          elevation={0}
          sx={{
            flex: 2,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          {/* Add Todo Form */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a new task..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ flex: 1 }}
            />
            <Stack direction="row" spacing={1}>
              {(["low", "medium", "high"] as const).map((priority) => (
                <Chip
                  key={priority}
                  label={priority}
                  size="small"
                  color={
                    newTodoPriority === priority
                      ? priorityColors[priority]
                      : "default"
                  }
                  variant={newTodoPriority === priority ? "filled" : "outlined"}
                  onClick={() => setNewTodoPriority(priority)}
                  sx={{ textTransform: "capitalize", cursor: "pointer" }}
                />
              ))}
            </Stack>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={handleAddTodo}
              disabled={!newTodoText.trim()}
            >
              Add
            </Button>
          </Stack>

          {/* Filter Tabs */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {(["all", "active", "completed"] as const).map((f) => (
              <Chip
                key={f}
                label={
                  f === "all"
                    ? `All (${todos.length})`
                    : f === "active"
                      ? `Active (${activeCount})`
                      : `Completed (${completedCount})`
                }
                variant={filter === f ? "filled" : "outlined"}
                color={filter === f ? "primary" : "default"}
                onClick={() => setFilter(f)}
                sx={{ textTransform: "capitalize", cursor: "pointer" }}
              />
            ))}
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* Todo List */}
          {filteredTodos.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography color="text.secondary">
                {filter === "all"
                  ? "No tasks yet. Add one above!"
                  : filter === "active"
                    ? "No active tasks. Great job!"
                    : "No completed tasks yet."}
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {filteredTodos.map((todo, index) => (
                <React.Fragment key={todo.id}>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTodo(todo.id)}
                        size="small"
                      >
                        <DeleteRoundedIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      onClick={() => handleToggleTodo(todo.id)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={todo.completed}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={todo.text}
                        sx={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                          color: todo.completed
                            ? "text.secondary"
                            : "text.primary",
                        }}
                      />
                      <Chip
                        label={todo.priority}
                        size="small"
                        color={priorityColors[todo.priority]}
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          mr: 2,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < filteredTodos.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>

        {/* Stats Sidebar */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            height: "fit-content",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Overview
          </Typography>

          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Tasks
              </Typography>
              <Typography variant="h4">{todos.length}</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
              <Typography variant="h4" color="success.main">
                {completedCount}
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
              <Typography variant="h4" color="primary.main">
                {activeCount}
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Completion Rate
              </Typography>
              <Typography variant="h4">
                {todos.length > 0
                  ? Math.round((completedCount / todos.length) * 100)
                  : 0}
                %
              </Typography>
            </Box>
          </Stack>

          {completedCount > 0 && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setTodos(todos.filter((t) => !t.completed))}
            >
              Clear Completed
            </Button>
          )}
        </Paper>
      </Stack>
    </Box>
  );
}
