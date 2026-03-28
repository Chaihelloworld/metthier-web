import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock stores
const mockFetchTasks = jest.fn();
const mockSetFilterStatus = jest.fn();
const mockUpdateTaskStatus = jest.fn();

jest.mock('@/app/modules/TaskBoard/stores/useBoardStore', () => ({
  __esModule: true,
  default: Object.assign(
    (selector?: (s: unknown) => unknown) => {
      const state = {
        tasks: [
          { id: 1, title: 'Board Task 1', description: 'Desc', status: 'todo', createdAt: '', updatedAt: '' },
          { id: 2, title: 'Board Task 2', description: 'Desc', status: 'in_progress', createdAt: '', updatedAt: '' },
        ],
        filterStatus: 'all',
        setFilterStatus: mockSetFilterStatus,
        updateTaskStatus: mockUpdateTaskStatus,
        fetchTasks: mockFetchTasks,
      };
      return selector ? selector(state) : state;
    },
    { getState: () => ({ start: jest.fn(), stop: jest.fn() }) }
  ),
}));

jest.mock('@/app/stores/useLoaderStore', () => ({
  __esModule: true,
  default: Object.assign(
    () => ({ loading: false }),
    { getState: () => ({ start: jest.fn(), stop: jest.fn() }) }
  ),
}));

// Mock DnD Kit
jest.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DragOverlay: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PointerSensor: jest.fn(),
  useSensor: jest.fn(),
  useSensors: jest.fn().mockReturnValue([]),
  closestCorners: jest.fn(),
  useDroppable: jest.fn().mockReturnValue({ setNodeRef: jest.fn(), isOver: false }),
}));

jest.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  verticalListSortingStrategy: jest.fn(),
  useSortable: jest.fn().mockReturnValue({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

jest.mock('@dnd-kit/utilities', () => ({
  CSS: { Transform: { toString: jest.fn().mockReturnValue('') } },
}));

import TaskBoardScreen from '@/app/modules/TaskBoard/screen/TaskBoardScreen';

describe('TaskBoardScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render title', () => {
    render(<TaskBoardScreen />);
    expect(screen.getByText('Board')).toBeInTheDocument();
  });

  it('should render project name', () => {
    render(<TaskBoardScreen />);
    expect(screen.getByText('Metthier Project')).toBeInTheDocument();
  });

  it('should render filter buttons', () => {
    render(<TaskBoardScreen />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('should render board columns', () => {
    render(<TaskBoardScreen />);
    expect(screen.getByText('TO DO')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByText('DONE')).toBeInTheDocument();
  });

  it('should render task cards', () => {
    render(<TaskBoardScreen />);
    expect(screen.getByText('Board Task 1')).toBeInTheDocument();
    expect(screen.getByText('Board Task 2')).toBeInTheDocument();
  });

  it('should call fetchTasks on mount', () => {
    render(<TaskBoardScreen />);
    expect(mockFetchTasks).toHaveBeenCalled();
  });

  it('should show task ID on cards', () => {
    render(<TaskBoardScreen />);
    expect(screen.getByText('MTH-1')).toBeInTheDocument();
    expect(screen.getByText('MTH-2')).toBeInTheDocument();
  });
});
