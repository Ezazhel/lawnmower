export interface State {
    global: [];
    mowing: { [id: string]: boolean };
}

export const initialState: State = {
    global: null,
    mowing: {
        ['sharpen']: false,
        ['rich-grass']: false,
    },
};
