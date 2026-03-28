import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock stores
const mockFetchTasks = jest.fn();
const mockSetFilterStatus = jest.fn();
const mockDeleteTask = jest.fn();

jest.mock('@/app/modules/Dashboard/stores/useTaskStore', () => ({
  useTaskStore: Object.assign(
    (selector?: (s: unknown) => unknown) => {
      const state = {
        tasks: [
          { id: 1, title: 'Task 1', description: 'Desc 1', status: 'todo', createdAt: '', updatedAt: '' },
          { id: 2, title: 'Task 2', description: 'Desc 2', status: 'in_progress', createdAt: '', updatedAt: '' },
          { id: 3, title: 'Task 3', description: 'Desc 3', status: 'done', createdAt: '', updatedAt: '' },
        ],
        filterStatus: 'all',
        setFilterStatus: mockSetFilterStatus,
        deleteTask: mockDeleteTask,
        fetchTasks: mockFetchTasks,
        createTask: jest.fn(),
        updateTask: jest.fn(),
      };
      return selector ? selector(state) : state;
    },
    { getState: () => ({ showDialog: jest.fn() }) }
  ),
}));

jest.mock('@/app/stores/useDialogStore', () => ({
  __esModule: true,
  default: Object.assign(
    () => ({ showDialog: jest.fn(), closeDialog: jest.fn() }),
    { getState: () => ({ showDialog: jest.fn() }) }
  ),
}));

jest.mock('@/app/stores/useLoaderStore', () => ({
  __esModule: true,
  default: Object.assign(
    () => ({ loading: false }),
    { getState: () => ({ start: jest.fn(), stop: jest.fn() }) }
  ),
}));

import Dashboard from '@/app/modules/Dashboard/screen/Dashboard';

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render "+ New Task" button', () => {
    render(<Dashboard />);
    expect(screen.getByText('+ New Task')).toBeInTheDocument();
  });

  it('should render filter buttons', () => {
    render(<Dashboard />);
    expect(screen.getByText('All (3)')).toBeInTheDocument();
    expect(screen.getByText('To Do (1)')).toBeInTheDocument();
    expect(screen.getByText('In Progress (1)')).toBeInTheDocument();
    expect(screen.getByText('Done (1)')).toBeInTheDocument();
  });

  it('should render tasks in table', () => {
    render(<Dashboard />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('should call fetchTasks on mount', () => {
    render(<Dashboard />);
    expect(mockFetchTasks).toHaveBeenCalled();
  });

  it('should call setFilterStatus("all") on mount', () => {
    render(<Dashboard />);
    expect(mockSetFilterStatus).toHaveBeenCalledWith('all');
  });

  it('should show task counts in filter buttons', () => {
    render(<Dashboard />);
    expect(screen.getByText('All (3)')).toBeInTheDocument();
    expect(screen.getByText('To Do (1)')).toBeInTheDocument();
    expect(screen.getByText('In Progress (1)')).toBeInTheDocument();
    expect(screen.getByText('Done (1)')).toBeInTheDocument();
  });
});
