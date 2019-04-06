export interface Person {
    id: number;
    name: string;
    nick_name: string;
    age: number;
    skill: string;
    line: string;
    tel: string;
    image: string;
    detail: Text;

    next_id?: number;
    previos_id?: number;
}

export interface PersonPagination {
    current_page: number;
    per_page: number;
    total: number;
    data: Person[];
}
