type Channel = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

type Message = {
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    username: string;
    userId: number;
}

type User = {
    id: number;
    username: string;
    created_at: Date;
    updated_at: Date;
}