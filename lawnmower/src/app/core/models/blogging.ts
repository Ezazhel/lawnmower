class Currency {
    amount: number = 0;
    gain: number = 0;
}

class Fan extends Currency {
    gainChance: number = 0;
}

export class Creativity extends Currency {}
export class Imagination extends Currency {}

export class Post {
    message: number = 0;
    video: number = 0;
    picture: number = 0;
    topic: number = 0;
}
export class Blogging {
    fans: Fan;
    creativity: Creativity = new Creativity();
    imagination: Imagination = new Imagination();
    adsRevenu: number = 0;
    post: Post = new Post();
}
