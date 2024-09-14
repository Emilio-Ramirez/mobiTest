export interface Task {
  id: number;
  title: string;
  description: string; // Changed from optional to required
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
