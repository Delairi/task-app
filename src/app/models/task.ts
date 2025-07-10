export interface Task {
    id: number;
    title: string;
    description?: string | null;
    category?: string | null;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}
