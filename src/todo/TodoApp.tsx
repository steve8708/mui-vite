import * as React from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { AppTheme } from '../shared-theme/AppTheme';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

function TodoAppContent() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [filter, setFilter] = React.useState<FilterType>('all');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
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
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Todo App
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            size="medium"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTodo}
            startIcon={<AddIcon />}
            sx={{ minWidth: 120 }}
          >
            Add
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 3 }} justifyContent="center">
          <Chip
            label="All"
            onClick={() => setFilter('all')}
            color={filter === 'all' ? 'primary' : 'default'}
            variant={filter === 'all' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Active"
            onClick={() => setFilter('active')}
            color={filter === 'active' ? 'primary' : 'default'}
            variant={filter === 'active' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Completed"
            onClick={() => setFilter('completed')}
            color={filter === 'completed' ? 'primary' : 'default'}
            variant={filter === 'completed' ? 'filled' : 'outlined'}
          />
        </Stack>

        {filteredTodos.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              {filter === 'completed' && todos.length > 0
                ? 'No completed tasks yet'
                : filter === 'active' && todos.length > 0
                ? 'No active tasks'
                : 'No tasks yet. Add one above!'}
            </Typography>
          </Box>
        ) : (
          <List sx={{ bgcolor: 'background.paper' }}>
            {filteredTodos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  color="primary"
                />
                <ListItemText
                  primary={todo.text}
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTodo(todo.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {todos.length > 0 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {activeTodosCount} {activeTodosCount === 1 ? 'task' : 'tasks'} remaining
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default function TodoApp() {
  return (
    <AppTheme>
      <TodoAppContent />
    </AppTheme>
  );
}
